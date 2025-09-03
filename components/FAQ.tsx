'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: "What makes BON CHARGE products different?",
    answer: "All BON CHARGE products are backed by scientific research and testing. We use premium materials and cutting-edge technology to deliver measurable health benefits. Our blue light glasses block 100% of harmful wavelengths, our red light devices use medical-grade LEDs, and all products meet the highest quality standards."
  },
  {
    question: "Do you offer a money-back guarantee?",
    answer: "Yes! We offer a 30-day money-back guarantee on all products. If you're not completely satisfied with your purchase, simply return it within 30 days for a full refund. We also provide a 1-year warranty on all electronic devices."
  },
  {
    question: "How long does shipping take?",
    answer: "We offer free shipping on orders over $150. Standard shipping typically takes 3-5 business days within the US. Express shipping (1-2 business days) is available for an additional fee. International shipping times vary by location."
  },
  {
    question: "Which blue light glasses should I choose?",
    answer: "We offer two main types: Daytime computer glasses filter 40% of blue light while maintaining color accuracy, perfect for work. Night-time glasses block 100% of blue and green light (400-550nm) and should be worn 2-3 hours before bed for optimal sleep."
  },
  {
    question: "Are your products suitable for children?",
    answer: "Many of our products are family-friendly! Our blue light glasses come in kids' sizes, and products like EMF shielding blankets and blue-free lamps are safe for the whole family. Always check product descriptions for age recommendations."
  },
  {
    question: "Can I customize bundles?",
    answer: "While our curated bundles offer the best value, we're happy to help you create a custom package. Contact our customer service team, and they'll work with you to build a bundle that meets your specific wellness goals."
  },
  {
    question: "How do I use red light therapy devices?",
    answer: "Position the device 6-12 inches from the target area and use for 10-20 minutes daily. Start with shorter sessions and gradually increase. Our devices come with detailed instructions and usage guidelines for various health goals."
  },
  {
    question: "What's your return policy?",
    answer: "We accept returns within 30 days of purchase for a full refund. Items must be in original condition with all accessories. We provide prepaid return labels for US orders. Opened electronic items may be subject to a restocking fee."
  }
];

export default function FAQ() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600">
          Everything you need to know about our wellness products
        </p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-white rounded-lg border border-gray-200 px-6"
          >
            <AccordionTrigger className="text-left hover:no-underline py-4">
              <span className="font-semibold text-gray-900">{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 text-center p-6 bg-teal-50 rounded-xl">
        <h3 className="font-semibold text-lg mb-2">Still have questions?</h3>
        <p className="text-gray-600 mb-4">
          Our wellness experts are here to help you find the perfect products for your health goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:support@boncharge.com"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            support@boncharge.com
          </a>
          <span className="hidden sm:block text-gray-400">|</span>
          <a
            href="tel:1-800-BONCHARGE"
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            1-800-BONCHARGE
          </a>
        </div>
      </div>
    </section>
  );
}