import React from "react";
import { ArrowRight, Phone, CheckCircle2, ShieldCheck, Clock, MapPin, Sparkles } from "lucide-react";
import { RobinIcon, ButterflyIcon } from "../components/BrandMotifs";
import { ServiceIcon } from "../components/ServiceIcons";
import { PricingCallout } from "../components/PricingCallout";
import { TrustBar } from "../components/TrustBar";
import { FAQAccordion } from "../components/FAQAccordion";
import { AreasMapWidget } from "../components/AreasMapWidget";
import { HOME_PAGE, SERVICES, BUSINESS_INFO } from "../data/siteData";
import { siteImages } from "../assets/images";

interface HomeViewProps {
  onNavigate: (path: string) => void;
  onOpenChat: (prefill?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenChat }) => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 sm:pt-10 pb-8 sm:pb-12 overflow-hidden" id="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              {/* Handwritten script tagline accent matching flyer */}
              <div className="inline-flex items-center gap-2 text-base sm:text-lg font-script font-semibold text-[#1F4B34] bg-[#FFFDF7] px-4 py-1.5 rounded-full border border-[#C9A227]/40 shadow-xs">
                <ButterflyIcon size={20} />
                <span>{HOME_PAGE.hero.subheadline}</span>
              </div>

              {/* Primary H1 */}
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-display text-[#1F4B34] tracking-tight leading-[1.15]">
                {HOME_PAGE.hero.headline}
              </h1>

              {/* Body Copy */}
              <p className="text-base sm:text-lg text-[#1F2A22]/85 leading-relaxed font-body max-w-2xl">
                {HOME_PAGE.hero.bodyCopy}
              </p>

              {/* Key trust bullets */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs sm:text-sm text-[#1F4B34] font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
                  <span>£21.50 Flat Rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
                  <span>Fully Insured &amp; DBS</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0" />
                  <span>Year-Round Service</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  id="hero-ask-robin-cta"
                  onClick={() => onOpenChat("Hi Robin, I'd like to get a quote for my garden.")}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#1F4B34] hover:bg-[#123424] text-[#FFFDF7] font-semibold text-base shadow-md transition duration-150 cursor-pointer"
                >
                  <RobinIcon size={22} className="text-[#C9A227]" />
                  <span>{HOME_PAGE.hero.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#C9A227]" />
                </button>

                <a
                  id="hero-call-cta"
                  href={`tel:${BUSINESS_INFO.primaryPhone}`}
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#FFFDF7] hover:bg-[#F6EFDD] border-2 border-[#1F4B34]/25 text-[#1F4B34] font-semibold text-base shadow-2xs transition duration-150"
                >
                  <Phone className="w-4 h-4 text-[#C9A227]" />
                  <span>Call {BUSINESS_INFO.primaryPhone}</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image Card with Countryside Morning Light */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FFFDF7] bg-[#FFFDF7] group">
                <img
                  src={siteImages.home_hero}
                  alt="Neatly mowed lawn and trimmed hedge maintained by ADD Gardening in Lowestoft"
                  className="w-full h-80 sm:h-96 lg:h-[430px] object-cover transition duration-300 group-hover:scale-102"
                />

                {/* Floating badge matching flyer style */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-[#1F4B34]/92 backdrop-blur-xs rounded-xl border border-[#C9A227]/40 text-[#FFFDF7] flex items-center justify-between shadow-lg">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#C9A227] font-semibold block">
                      One Local Team &bull; No Agency Middlemen
                    </span>
                    <span className="text-sm font-semibold text-[#FFFDF7]">
                      Lowestoft, Beccles, Bungay &amp; Surrounds
                    </span>
                  </div>
                  <div className="text-right pl-3 border-l border-[#C9A227]/30">
                    <span className="text-lg font-display text-[#C9A227] block leading-none">
                      £21.50
                    </span>
                    <span className="text-[10px] text-[#F6EFDD]/70">per hour</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <TrustBar />

      {/* 3. SERVICES PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="services-preview">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1F4B34]/10 text-[#1F4B34] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A227]" />
            Eight Dedicated Trade Silos
          </div>
          <h2 className="text-3xl sm:text-4xl font-display text-[#1F4B34]">
            {HOME_PAGE.servicesPreview.headline}
          </h2>
          <p className="text-base sm:text-lg text-[#1F2A22]/85 font-body leading-relaxed">
            {HOME_PAGE.servicesPreview.bodyCopy}
          </p>
        </div>

        {/* 8 Service Cards Grid with circular illustrated badges */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => {
            const imageSrc = (siteImages as any)[service.imageKey] || siteImages.lawn_care;

            return (
              <div
                key={service.slug}
                id={`service-card-${service.slug}`}
                className="rounded-2xl bg-[#FFFDF7] border border-[#1F4B34]/15 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                {/* Image header with circular badge overlapping */}
                <div className="relative h-44 overflow-hidden bg-[#1F4B34]/10">
                  <img
                    src={imageSrc}
                    alt={service.imageAltText}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#1F4B34]/85 text-[#C9A227] text-[11px] font-semibold backdrop-blur-xs border border-[#C9A227]/30">
                    {service.badgeLabel}
                  </div>
                  {/* Overlapping circular illustrated icon */}
                  <div className="absolute -bottom-4 left-5">
                    <ServiceIcon type={service.iconType} size={54} className="border-2 border-[#FFFDF7]" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 pt-7 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-display text-[#1F4B34] leading-snug group-hover:text-[#C9A227] transition">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1F2A22]/75 font-body mt-2 leading-relaxed line-clamp-3">
                      {service.bodyCopy}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#1F4B34]/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#1F4B34]">£21.50 / hour</span>
                      <span className="text-[#1F2A22]/60">Fully Insured</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onNavigate(service.url)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-[#F6EFDD] hover:bg-[#C9A227]/25 text-[#1F4B34] text-xs font-semibold text-center transition cursor-pointer"
                      >
                        Read Details &rarr;
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenChat(`Hi Robin, I'd like a quote for ${service.name}.`)}
                        className="p-2.5 rounded-xl bg-[#1F4B34] hover:bg-[#123424] text-[#C9A227] transition cursor-pointer"
                        title="Book via Robin"
                      >
                        <RobinIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* See All Services CTA bar */}
        <div className="text-center pt-10">
          <button
            type="button"
            onClick={() => onNavigate("/services")}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#1F4B34] hover:bg-[#123424] text-[#FFFDF7] font-semibold text-sm shadow transition cursor-pointer"
          >
            <span>{HOME_PAGE.servicesPreview.ctaText}</span>
            <ArrowRight className="w-4 h-4 text-[#C9A227]" />
          </button>
        </div>
      </section>

      {/* 4. FULL-WIDTH PHOTO BAND: Tools & Care */}
      <section className="relative py-16 bg-[#1F4B34] text-[#FFFDF7] overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src={siteImages.services_tools}
            alt="Gardening tools backdrop"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A227]">
            The Single Number for All Outside Jobs
          </span>
          <h2 className="text-2xl sm:text-4xl font-display text-[#FFFDF7]">
            Why juggle separate contractors when one trusted local team does it all?
          </h2>
          <p className="text-base sm:text-lg text-[#F6EFDD]/90 font-body max-w-2xl mx-auto leading-relaxed">
            Most homeowners end up hiring four different people: one for mowing, another for tall hedges, someone else with a pressure washer, and a handyman for the flat-pack shed. ADD Gardening is the single contact for everything outside your home.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onOpenChat("Hi Robin, can you tell me more about having one team handle multiple jobs?")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C9A227] hover:bg-[#d8af2c] text-[#123424] font-semibold text-sm shadow transition cursor-pointer"
            >
              <RobinIcon size={18} />
              <span>Ask Robin About Your Jobs</span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. SIGNATURE PRICING CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PricingCallout onOpenChat={onOpenChat} />
      </section>

      {/* 6. AREAS COVERED MAP & CHECKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="areas-section">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1F4B34]/10 text-[#1F4B34] text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
            Mobile Team &bull; Based in Oulton Broad
          </div>
          <h2 className="text-3xl sm:text-4xl font-display text-[#1F4B34]">
            Areas We Cover
          </h2>
          <p className="text-base text-[#1F2A22]/80 font-body">
            Operating throughout Lowestoft, Beccles, Bungay, Great Yarmouth and the surrounding villages.
          </p>
        </div>

        <AreasMapWidget onOpenChat={onOpenChat} />
      </section>

      {/* 7. FAQ BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <FAQAccordion
          items={HOME_PAGE.faq}
          title="Common Questions About Our Services"
          subtitle="Everything you need to know about booking, rates, and coverage"
        />
      </section>
    </div>
  );
};
