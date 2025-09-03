// This file generates placeholder SVG images for products
export function generatePlaceholderSVG(title: string, category: string): string {
  const colors = {
    Sleep: '#1e3a8a',
    Recovery: '#dc2626',
    Beauty: '#db2777',
    Lighting: '#f59e0b',
    EMF: '#10b981',
    Glasses: '#6366f1',
  };

  const color = colors[category as keyof typeof colors] || '#6b7280';
  
  return `<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color};stop-opacity:0.2" />
        <stop offset="100%" style="stop-color:${color};stop-opacity:0.4" />
      </linearGradient>
    </defs>
    <rect width="800" height="800" fill="url(#grad)"/>
    <rect x="200" y="200" width="400" height="400" rx="20" fill="${color}" opacity="0.3"/>
    <text x="400" y="400" font-family="system-ui, sans-serif" font-size="32" font-weight="600" text-anchor="middle" fill="${color}">${title.substring(0, 20)}</text>
    <text x="400" y="440" font-family="system-ui, sans-serif" font-size="20" text-anchor="middle" fill="${color}" opacity="0.8">${category}</text>
  </svg>`;
}

export function createPlaceholderImage(title: string, category: string): string {
  const svg = generatePlaceholderSVG(title, category);
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
}