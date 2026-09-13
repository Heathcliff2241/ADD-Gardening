import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  title = "Frequently Asked Questions",
  subtitle = "Honest answers to common queries",
  className = "",
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`} id="faq-section">
      <div className="text-center mb-6">
        <h3 className="text-2xl sm:text-3xl text-[#1F4B34] font-display">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm sm:text-base text-[#1F2A22]/75 font-body mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-xl bg-[#FFFDF7] border border-[#1F4B34]/15 overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                id={`faq-button-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left font-medium text-base sm:text-lg text-[#1F4B34] hover:bg-[#F6EFDD]/40 transition cursor-pointer"
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#C9A227] shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-sm sm:text-base text-[#1F2A22]/85 font-body leading-relaxed border-t border-[#1F4B34]/10"
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
