'use client';

import React, { createContext, useContext, useReducer } from 'react';
import { Product } from './products';
import { Bundle } from './bundles';

export type CartItem = {
  id: string;
  type: 'product' | 'bundle';
  quantity: number;
  product?: Product;
  bundle?: Bundle;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: { item: Product | Bundle; itemType: 'product' | 'bundle' } }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_CART' }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (item: Product | Bundle, type: 'product' | 'bundle') => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: () => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getSavingsTotal: () => number;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.item.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.item.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      
      const newItem: CartItem = {
        id: action.payload.item.id,
        type: action.payload.itemType,
        quantity: 1,
        ...(action.payload.itemType === 'product' 
          ? { product: action.payload.item as Product }
          : { bundle: action.payload.item as Bundle }
        ),
      };
      
      return {
        ...state,
        items: [...state.items, newItem],
      };
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };
    
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  const addToCart = (item: Product | Bundle, type: 'product' | 'bundle') => {
    dispatch({ type: 'ADD_ITEM', payload: { item, itemType: type } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      const price = item.type === 'product' ? item.product?.price || 0 : item.bundle?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getSavingsTotal = () => {
    return state.items.reduce((total, item) => {
      if (item.type === 'product' && item.product?.compareAtPrice) {
        return total + ((item.product.compareAtPrice - item.product.price) * item.quantity);
      } else if (item.type === 'bundle' && item.bundle) {
        return total + ((item.bundle.compareAtPrice - item.bundle.price) * item.quantity);
      }
      return total;
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      state,
      dispatch,
      addToCart,
      removeFromCart,
      updateQuantity,
      toggleCart,
      clearCart,
      getCartTotal,
      getCartCount,
      getSavingsTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}