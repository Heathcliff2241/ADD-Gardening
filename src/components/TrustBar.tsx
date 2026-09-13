import React from "react";
import { ShieldCheck, UserCheck, PoundSterling, MapPin, CalendarCheck } from "lucide-react";
import { ButterflyIcon } from "./BrandMotifs";

export const TrustBar: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <section className={`py-10 bg-[#FFFDF7] border-y border-[#1F4B34]/10 ${className}`} id="trust-bar">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-sm font-script text-[#1F4B34] text-xl font-semibold mb-1">
            <ButterflyIcon size={20} />
            <span>Honest, unpretentious trade values</span>
            <ButterflyIcon size={20} />
          </div>
          <h2 className="text-2xl sm:text-3xl text-[#1F4B34] font-display mb-2">
            Reliable, Friendly, Professional
          </h2>
          <p className="text-sm sm:text-base font-semibold text-[#C9A227]">
            Fully insured and DBS-checked, every visit
          </p>
          <p className="text-sm text-[#1F2A22]/80 mt-2 font-body max-w-xl mx-auto">
            We're committed to providing a safe, trustworthy and professional service you can rely on, whether it's a weekly lawn cut or a one-off pressure wash.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6 pt-2">
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#F6EFDD]/60 border border-[#C9A227]/20">
            <div className="w-10 h-10 rounded-full bg-[#1F4B34] text-[#C9A227] flex items-center justify-center mb-2.5 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-semibold text-xs sm:text-sm text-[#1F4B34]">Fully Insured</span>
            <span className="text-[11px] text-[#1F2A22]/70 mt-0.5">Complete peace of mind</span>
          </div>

          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#F6EFDD]/60 border border-[#C9A227]/20">
            <div className="w-10 h-10 rounded-full bg-[#1F4B34] text-[#C9A227] flex items-center justify-center mb-2.5 shadow-sm">
              <UserCheck className="w-5 h-5" />
            </div>
            <span className="font-semibold text-xs sm:text-sm text-[#1F4B34]">DBS-Checked</span>
            <span className="text-[11px] text-[#1F2A22]/70 mt-0.5">Vetted &amp; trustworthy</span>
          </div>

          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#F6EFDD]/60 border border-[#C9A227]/20">
            <div className="w-10 h-10 rounded-full bg-[#1F4B34] text-[#C9A227] flex items-center justify-center mb-2.5 shadow-sm">
              <PoundSterling className="w-5 h-5" />
            </div>
            <span className="font-semibold text-xs sm:text-sm text-[#1F4B34]">£21.50 Flat Rate</span>
            <span className="text-[11px] text-[#1F2A22]/70 mt-0.5">No hidden surprises</span>
          </div>

          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-[#F6EFDD]/60 border border-[#C9A227]/20">
            <div className="w-10 h-10 rounded-full bg-[#1F4B34] text-[#C9A227] flex items-center justify-center mb-2.5 shadow-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="font-semibold text-xs sm:text-sm text-[#1F4B34]">Local &amp; Mobile</span>
            <span className="text-[11px] text-[#1F2A22]/70 mt-0.5">Lowestoft &amp; Waveney</span>
          </div>

          <div className="col-span-2 md:col-span-1 flex flex-col items-center text-center p-4 rounded-xl bg-[#F6EFDD]/60 border border-[#C9A227]/20">
            <div className="w-10 h-10 rounded-full bg-[#1F4B34] text-[#C9A227] flex items-center justify-center mb-2.5 shadow-sm">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="font-semibold text-xs sm:text-sm text-[#1F4B34]">Year-Round Care</span>
            <span className="text-[11px] text-[#1F2A22]/70 mt-0.5">All 4 seasons covered</span>
          </div>
        </div>
      </div>
    </section>
  );
};
