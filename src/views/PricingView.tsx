import React, { useEffect } from "react";
import { CheckCircle2, Clock, Phone, ArrowRight, ShieldCheck, PoundSterling, HelpCircle } from "lucide-react";
import { RobinIcon, ButterflyIcon } from "../components/BrandMotifs";
import { PricingCallout } from "../components/PricingCallout";
import { FAQAccordion } from "../components/FAQAccordion";
import { TrustBar } from "../components/TrustBar";
import { PRICING_PAGE, SERVICES, BUSINESS_INFO } from "../data/siteData";

interface PricingViewProps {
  onNavigate: (path: string) => void;
  onOpenChat: (prefill?: string) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onNavigate, onOpenChat }) => {
  useEffect(() => {
    document.title = "Pricing | ADD Gardening & Maintenance Services";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "£21.50 per hour, no hidden costs. See how ADD Gardening prices lawn care, hedge trimming, pressure washing and more across Lowestoft.");
    }
  }, []);

  return (
    <div className="space-y-16 sm:space-y-20" id="pricing-page">
      {/* Hero */}
      <section className="pt-6 sm:pt-10 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A227] bg-[#1F4B34] px-4 py-1.5 rounded-full">
            <PoundSterling className="w-3.5 h-3.5" />
            <span>{PRICING_PAGE.subheadline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display text-[#1F4B34] tracking-tight leading-tight">
            {PRICING_PAGE.headline}
          </h1>

          <p className="text-base sm:text-lg text-[#1F2A22]/85 font-body leading-relaxed">
            {PRICING_PAGE.bodyCopy}
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenChat("Hi Robin, could you give me a quote based on estimated hours for a job?")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1F4B34] hover:bg-[#123424] text-[#FFFDF7] text-sm font-semibold shadow transition cursor-pointer"
            >
              <RobinIcon size={18} className="text-[#C9A227]" />
              <span>{PRICING_PAGE.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-[#C9A227]" />
            </button>

            <a
              href={`tel:${BUSINESS_INFO.primaryPhone}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFFDF7] hover:bg-[#F6EFDD] border border-[#1F4B34]/25 text-[#1F4B34] text-sm font-semibold transition"
            >
              <Phone className="w-4 h-4 text-[#C9A227]" />
              <span>Call {BUSINESS_INFO.primaryPhone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Signature Pricing Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PricingCallout onOpenChat={onOpenChat} />
      </section>

      {/* Trust bar */}
      <TrustBar />

      {/* Transparent Breakdown Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF7] rounded-2xl p-6 sm:p-10 border border-[#1F4B34]/15 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-display text-[#1F4B34]">
              What&apos;s Included at £21.50 per Hour
            </h2>
            <p className="text-sm sm:text-base text-[#1F2A22]/80 font-body">
              Everything is upfront. No callout charge, no mysterious fuel levies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-[#F6EFDD]/60 border border-[#1F4B34]/10 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#1F4B34] text-[#C9A227] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg text-[#1F4B34]">Full Insurance &amp; DBS</h3>
              <p className="text-xs sm:text-sm text-[#1F2A22]/80 font-body leading-relaxed">
                Public liability insurance and vetted DBS checks are built into our rate.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F6EFDD]/60 border border-[#1F4B34]/10 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#1F4B34] text-[#C9A227] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg text-[#1F4B34]">Estimated Hours Upfront</h3>
              <p className="text-xs sm:text-sm text-[#1F2A22]/80 font-body leading-relaxed">
                For larger projects, we agree on estimated hours before setting to work.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F6EFDD]/60 border border-[#1F4B34]/10 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#1F4B34] text-[#C9A227] flex items-center justify-center font-bold">
                <PoundSterling className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg text-[#1F4B34]">No Callout Fees</h3>
              <p className="text-xs sm:text-sm text-[#1F2A22]/80 font-body leading-relaxed">
                Within Lowestoft, Beccles, Bungay, Great Yarmouth and our named town list, travel is included.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F6EFDD]/60 border border-[#1F4B34]/10 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#1F4B34] text-[#C9A227] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg text-[#1F4B34]">Commercial Equipment</h3>
              <p className="text-xs sm:text-sm text-[#1F2A22]/80 font-body leading-relaxed">
                Mowers, long-reach trimmers, pressure washers, and safety equipment are all provided.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Rate Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF7] rounded-2xl p-6 sm:p-10 border border-[#1F4B34]/15 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1F4B34]/10">
            <div>
              <h2 className="text-xl sm:text-2xl font-display text-[#1F4B34]">
                Rate Across All 8 Services
              </h2>
              <p className="text-xs sm:text-sm text-[#1F2A22]/75 font-body">
                The exact same honest £21.50 per hour applies to every job we take on:
              </p>
            </div>
            <div className="px-4 py-2 rounded-xl bg-[#1F4B34] text-[#C9A227] font-display text-lg">
              £21.50 / hour
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {SERVICES.map((s) => (
              <div
                key={s.slug}
                className="p-3.5 rounded-xl bg-[#F6EFDD]/40 border border-[#1F4B34]/10 flex flex-col justify-between"
              >
                <div>
                  <span className="font-semibold text-xs sm:text-sm text-[#1F4B34] block">
                    {s.name}
                  </span>
                  <span className="text-[11px] text-[#1F2A22]/70 mt-1 block">
                    {s.badgeLabel}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(s.url)}
                  className="text-xs text-[#C9A227] hover:underline font-semibold mt-3 text-left"
                >
                  View service details &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <FAQAccordion
          items={PRICING_PAGE.faq}
          title="Pricing Questions"
          subtitle="Everything is transparent and agreed before work starts"
        />
      </section>
    </div>
  );
};
