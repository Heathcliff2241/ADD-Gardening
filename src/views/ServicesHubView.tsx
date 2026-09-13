import React from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Phone } from "lucide-react";
import { RobinIcon } from "../components/BrandMotifs";
import { ServiceIcon } from "../components/ServiceIcons";
import { PricingCallout } from "../components/PricingCallout";
import { TrustBar } from "../components/TrustBar";
import { SERVICES, SERVICES_HUB_PAGE, BUSINESS_INFO } from "../data/siteData";
import { siteImages } from "../assets/images";

interface ServicesHubViewProps {
  onNavigate: (path: string) => void;
  onOpenChat: (prefill?: string) => void;
}

export const ServicesHubView: React.FC<ServicesHubViewProps> = ({
  onNavigate,
  onOpenChat,
}) => {
  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Hero section with tool banner */}
      <section className="relative pt-6 sm:pt-10 pb-8 sm:pb-12" id="services-hub-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#C9A227] bg-[#1F4B34] px-4 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4" />
                <span>{SERVICES_HUB_PAGE.subheadline}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-display text-[#1F4B34] tracking-tight leading-tight">
                {SERVICES_HUB_PAGE.headline}
              </h1>

              <p className="text-base sm:text-lg text-[#1F2A22]/85 font-body leading-relaxed max-w-2xl">
                {SERVICES_HUB_PAGE.bodyCopy}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenChat("Hi Robin, I'd like to ask about having some maintenance work done.")}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#1F4B34] hover:bg-[#123424] text-[#FFFDF7] font-semibold text-sm shadow transition cursor-pointer"
                >
                  <RobinIcon size={20} className="text-[#C9A227]" />
                  <span>{SERVICES_HUB_PAGE.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#C9A227]" />
                </button>

                <a
                  href={`tel:${BUSINESS_INFO.primaryPhone}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFFDF7] hover:bg-[#F6EFDD] border border-[#1F4B34]/25 text-[#1F4B34] font-semibold text-sm transition"
                >
                  <Phone className="w-4 h-4 text-[#C9A227]" />
                  <span>Call {BUSINESS_INFO.primaryPhone}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-[#FFFDF7] bg-[#FFFDF7]">
                <img
                  src={siteImages.services_tools}
                  alt="Gardening and maintenance tools used by ADD Gardening Services"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <TrustBar />

      {/* All 8 Service Silos Detailed Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="all-silos">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-display text-[#1F4B34]">
            Our 8 Specialist Services
          </h2>
          <p className="text-base text-[#1F2A22]/80 font-body">
            Each service is backed by professional equipment, full insurance, and our flat £21.50/hr rate. Click any service for full details, equipment info, and local coverage.
          </p>
        </div>

        <div className="space-y-8">
          {SERVICES.map((service, index) => {
            const imageSrc = (siteImages as any)[service.imageKey] || siteImages.lawn_care;
            const isReversed = index % 2 === 1;

            return (
              <div
                key={service.slug}
                id={`service-silo-${service.slug}`}
                className="bg-[#FFFDF7] rounded-2xl border border-[#1F4B34]/15 overflow-hidden shadow-sm hover:shadow-md transition duration-200"
              >
                <div className={`grid md:grid-cols-12 gap-6 lg:gap-8 items-center ${isReversed ? "md:flex-row-reverse" : ""}`}>
                  {/* Image side */}
                  <div className={`md:col-span-5 h-64 md:h-full relative overflow-hidden bg-[#1F4B34]/5 ${isReversed ? "md:order-2" : ""}`}>
                    <img
                      src={imageSrc}
                      alt={service.imageAltText}
                      className="w-full h-full object-cover min-h-[260px] md:min-h-[320px]"
                    />
                    <div className="absolute top-4 left-4">
                      <ServiceIcon type={service.iconType} size={60} className="border-2 border-[#FFFDF7] shadow-md" />
                    </div>
                    <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-[#1F4B34]/90 text-[#C9A227] text-xs font-semibold backdrop-blur-xs">
                      {service.badgeLabel}
                    </div>
                  </div>

                  {/* Text side */}
                  <div className={`md:col-span-7 p-6 sm:p-8 space-y-4 ${isReversed ? "md:order-1" : ""}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A227] bg-[#1F4B34] px-3 py-1 rounded-full">
                        £21.50 / hour flat rate
                      </span>
                      <span className="text-xs text-[#1F2A22]/60">DBS-Checked &bull; Insured</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display text-[#1F4B34]">
                      {service.name}
                    </h3>

                    <p className="text-sm sm:text-base text-[#1F2A22]/85 font-body leading-relaxed">
                      {service.bodyCopy}
                    </p>

                    <div className="grid sm:grid-cols-2 gap-2 pt-2">
                      {service.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#1F4B34]">
                          <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onNavigate(service.url)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1F4B34] hover:bg-[#123424] text-[#FFFDF7] text-xs sm:text-sm font-semibold transition cursor-pointer shadow-xs"
                      >
                        <span>Read Full Guide &amp; FAQs</span>
                        <ArrowRight className="w-4 h-4 text-[#C9A227]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenChat(`Hi Robin, I would like to book or get a quote for ${service.name}.`)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F6EFDD] hover:bg-[#C9A227]/25 text-[#1F4B34] text-xs sm:text-sm font-semibold transition cursor-pointer"
                      >
                        <RobinIcon size={18} />
                        <span>Book with Robin</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <PricingCallout onOpenChat={onOpenChat} />
      </section>
    </div>
  );
};
