import React from "react";
import { CheckCircle2, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { BUSINESS_INFO } from "../data/siteData";

interface PricingCalloutProps {
  onOpenChat?: (prefill?: string) => void;
  className?: string;
  showDetails?: boolean;
}

export const PricingCallout: React.FC<PricingCalloutProps> = ({
  onOpenChat,
  className = "",
  showDetails = true,
}) => {
  return (
    <div
      id="pricing-callout"
      className={`rounded-2xl bg-[#1F4B34] text-[#FFFDF7] p-8 md:p-10 shadow-lg border-2 border-[#C9A227]/40 relative overflow-hidden ${className}`}
    >
      {/* Subtle decorative background watermark */}
      <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none text-[#C9A227]">
        <svg width="240" height="240" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" fill="none" />
          <text x="50" y="58" fontSize="24" fontFamily="serif" textAnchor="middle">ADD</text>
        </svg>
      </div>

      <div className="relative z-10 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#123424] text-[#C9A227] text-xs font-semibold uppercase tracking-wider border border-[#C9A227]/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            Transparent Local Trade Rate
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#FFFDF7] font-display leading-tight">
            Clear &amp; Transparent Pricing
          </h2>

          <p className="text-base sm:text-lg text-[#F6EFDD]/90 leading-relaxed font-body">
            No hidden costs, just honest pricing. You'll know the rate before we start, and you'll never be surprised by the invoice.
          </p>

          {showDetails && (
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-[#F6EFDD]/85">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>Same rate across all 8 services</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#F6EFDD]/85">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>Fully insured &amp; DBS-checked</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#F6EFDD]/85">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>Estimated hours agreed upfront</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#F6EFDD]/85">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>No callout fee in service towns</span>
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-5 flex flex-col items-center justify-center text-center p-6 bg-[#123424]/90 rounded-xl border border-[#C9A227]/40 shadow-inner">
          <span className="text-xs uppercase tracking-widest text-[#F6EFDD]/70 font-semibold mb-1">
            Standard Hourly Rate
          </span>
          <div className="text-4xl sm:text-5xl font-display text-[#C9A227] tracking-tight my-1">
            £21.50
          </div>
          <span className="text-sm font-medium text-[#F6EFDD]/80 mb-6 flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#C9A227]" />
            per hour &bull; no hidden fees
          </span>

          <button
            id="pricing-get-quote-btn"
            onClick={() => onOpenChat ? onOpenChat("Hi Robin, I would like to get a quote for some work at £21.50/hr.") : (window.location.href = "/contact")}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#C9A227] hover:bg-[#d8af2c] text-[#123424] font-semibold text-base shadow transition duration-150 cursor-pointer"
          >
            <span>Get a Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <span className="text-xs text-[#F6EFDD]/60 mt-3">
            Or call Dave directly on <a href={`tel:${BUSINESS_INFO.primaryPhone}`} className="underline hover:text-[#C9A227]">{BUSINESS_INFO.primaryPhone}</a>
          </span>
        </div>
      </div>
    </div>
  );
};
