import React, { useEffect } from "react";
import { MapPin, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { RobinIcon, ButterflyIcon } from "../components/BrandMotifs";
import { AreasMapWidget } from "../components/AreasMapWidget";
import { FAQAccordion } from "../components/FAQAccordion";
import { PricingCallout } from "../components/PricingCallout";
import { TrustBar } from "../components/TrustBar";
import { AREAS_PAGE, BUSINESS_INFO } from "../data/siteData";

interface AreasViewProps {
  onNavigate: (path: string) => void;
  onOpenChat: (prefill?: string) => void;
}

export const AreasView: React.FC<AreasViewProps> = ({ onNavigate, onOpenChat }) => {
  useEffect(() => {
    document.title = "Areas We Cover | ADD Gardening & Maintenance Services";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "ADD Gardening covers Lowestoft, Beccles, Bungay, Great Yarmouth and surrounding towns. See the full list of areas we serve.");
    }
  }, []);

  return (
    <div className="space-y-16 sm:space-y-20" id="areas-we-cover-page">
      {/* Hero */}
      <section className="pt-6 sm:pt-10 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A227] bg-[#1F4B34] px-4 py-1.5 rounded-full">
            <MapPin className="w-3.5 h-3.5" />
            <span>{AREAS_PAGE.subheadline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display text-[#1F4B34] tracking-tight leading-tight">
            {AREAS_PAGE.headline}
          </h1>

          <p className="text-base sm:text-lg text-[#1F2A22]/85 font-body leading-relaxed">
            {AREAS_PAGE.bodyCopy}
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => onOpenChat("Hi Robin, do you cover my address?")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1F4B34] hover:bg-[#123424] text-[#FFFDF7] text-sm font-semibold shadow transition cursor-pointer"
            >
              <RobinIcon size={18} className="text-[#C9A227]" />
              <span>{AREAS_PAGE.ctaText}</span>
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

      {/* Trust bar */}
      <TrustBar />

      {/* Interactive Map & Town Checker */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AreasMapWidget onOpenChat={onOpenChat} />
      </section>

      {/* Mobile Trade Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF7] rounded-2xl p-6 sm:p-10 border border-[#1F4B34]/15 shadow-sm space-y-6">
          <div className="max-w-3xl mx-auto text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-display text-[#1F4B34]">
              How Our Mobile Service Works
            </h2>
            <p className="text-sm sm:text-base text-[#1F2A22]/80 font-body">
              No store trips, no equipment hauling, and no hidden mileage surcharges.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-xl bg-[#F6EFDD]/60 border border-[#C9A227]/20 space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#1F4B34] text-[#C9A227] flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h3 className="font-display text-lg text-[#1F4B34]">We Bring the Equipment</h3>
              <p className="text-xs sm:text-sm text-[#1F2A22]/80 leading-relaxed font-body">
                We arrive with professional lawn mowers, long-reach hedge cutters, pressure washers, and tools ready to go.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F6EFDD]/60 border border-[#C9A227]/20 space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#1F4B34] text-[#C9A227] flex items-center justify-center font-bold text-xs">
                2
              </span>
              <h3 className="font-display text-lg text-[#1F4B34]">Transparent £21.50/hr</h3>
              <p className="text-xs sm:text-sm text-[#1F2A22]/80 leading-relaxed font-body">
                You only pay our flat rate for genuine work on your property, with no callout fee within our designated towns.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#F6EFDD]/60 border border-[#C9A227]/20 space-y-2">
              <span className="w-7 h-7 rounded-full bg-[#1F4B34] text-[#C9A227] flex items-center justify-center font-bold text-xs">
                3
              </span>
              <h3 className="font-display text-lg text-[#1F4B34]">Insured &amp; Vetted</h3>
              <p className="text-xs sm:text-sm text-[#1F2A22]/80 leading-relaxed font-body">
                Every visit is carried out by our fully insured, DBS-checked local team, so you have complete confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQAccordion
          items={AREAS_PAGE.faq}
          title="Area Coverage FAQs"
          subtitle="Clear guidelines for towns across Suffolk and Norfolk"
        />
      </section>

      {/* Pricing Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <PricingCallout onOpenChat={onOpenChat} />
      </section>
    </div>
  );
};
