import React, { useEffect } from "react";
import { ArrowRight, Phone, CheckCircle2, ShieldCheck, MapPin, Calendar, HelpCircle } from "lucide-react";
import { RobinIcon, ButterflyIcon } from "../components/BrandMotifs";
import { ServiceIcon } from "../components/ServiceIcons";
import { PricingCallout } from "../components/PricingCallout";
import { FAQAccordion } from "../components/FAQAccordion";
import { TrustBar } from "../components/TrustBar";
import { ServiceData, SERVICES, BUSINESS_INFO } from "../data/siteData";
import { siteImages } from "../assets/images";

interface ServiceDetailViewProps {
  service: ServiceData;
  onNavigate: (path: string) => void;
  onOpenChat: (prefill?: string) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  service,
  onNavigate,
  onOpenChat,
}) => {
  // Update document title and meta description dynamically for SEO
  useEffect(() => {
    document.title = service.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", service.metaDescription);
    }
  }, [service]);

  const imageSrc = (siteImages as any)[service.imageKey] || siteImages.lawn_care;
  const relatedServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-20" id={`service-detail-${service.slug}`}>
      {/* Breadcrumb row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <nav aria-label="Breadcrumb" className="text-xs text-[#1F2A22]/70 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate("/")}
            className="hover:text-[#1F4B34] underline"
          >
            Home
          </button>
          <span>/</span>
          <button
            type="button"
            onClick={() => onNavigate("/services")}
            className="hover:text-[#1F4B34] underline"
          >
            Services
          </button>
          <span>/</span>
          <span className="font-semibold text-[#1F4B34]">{service.shortName}</span>
        </nav>
      </div>

      {/* Hero Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="service-hero">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1F4B34] bg-[#FFFDF7] px-3.5 py-1.5 rounded-full border border-[#C9A227]/40 shadow-2xs">
              <ButterflyIcon size={16} />
              <span>{service.badgeLabel} &bull; £21.50/hour</span>
            </div>

            {/* H1 carries primary keyword + location */}
            <h1 className="text-3xl sm:text-5xl font-display text-[#1F4B34] tracking-tight leading-tight">
              {service.headline}
            </h1>

            <p className="text-lg sm:text-xl font-medium text-[#C9A227] font-body">
              {service.subheadline}
            </p>

            <p className="text-base sm:text-lg text-[#1F2A22]/85 font-body leading-relaxed max-w-2xl">
              {service.bodyCopy}
            </p>

            {/* Feature highlights checklist */}
            <div className="space-y-2.5 pt-2">
              {service.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-[#1F4B34]">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                  <span className="font-medium">{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                id="service-book-btn"
                onClick={() => onOpenChat(`Hi Robin, I would like to book or ask for a quote regarding ${service.name}.`)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#1F4B34] hover:bg-[#123424] text-[#FFFDF7] font-semibold text-sm shadow-sm transition cursor-pointer"
              >
                <RobinIcon size={20} className="text-[#C9A227]" />
                <span>{service.ctaText}</span>
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

          {/* Right Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-[#FFFDF7] bg-[#FFFDF7]">
              <img
                src={imageSrc}
                alt={service.imageAltText}
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover"
              />
              <div className="absolute top-4 left-4">
                <ServiceIcon type={service.iconType} size={64} className="border-2 border-[#FFFDF7] shadow-lg" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#1F4B34]/90 backdrop-blur-xs rounded-xl border border-[#C9A227]/40 text-[#FFFDF7] text-xs flex items-center justify-between">
                <span className="font-medium">One Team &bull; Fully Insured</span>
                <span className="font-semibold text-[#C9A227]">£21.50 / hr</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <TrustBar />

      {/* Service-Specific Details & Town Coverage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF7] rounded-2xl p-6 sm:p-10 border border-[#1F4B34]/15 shadow-sm space-y-6">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-display text-[#1F4B34]">
                How We Provide {service.shortName}
              </h2>
              <p className="text-sm sm:text-base text-[#1F2A22]/85 font-body leading-relaxed">
                Whether you need a regular weekly schedule or a one-off job, we come directly to your property with our own commercial tools, fuel, and safety gear. Because we work at a flat £21.50 per hour, you only pay for genuine working time with zero hidden charges.
              </p>
              <div className="p-4 rounded-xl bg-[#F6EFDD]/70 border border-[#C9A227]/30 text-xs text-[#1F2A22]/85 space-y-1">
                <span className="font-semibold text-[#1F4B34] block text-sm">Transparent Estimates</span>
                <span>For bigger jobs like extensive hedge cutting, entire fence treatments, or deep patio cleaning, we provide a clear estimate of hours beforehand so there are no surprises.</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-display text-[#1F4B34]">
                Available Across Local Towns
              </h3>
              <p className="text-sm text-[#1F2A22]/80 font-body">
                We provide {service.name.toLowerCase()} across:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {BUSINESS_INFO.coveredTowns.map((town) => (
                  <span
                    key={town}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F6EFDD] text-xs font-medium text-[#1F4B34] border border-[#1F4B34]/10"
                  >
                    <MapPin className="w-2.5 h-2.5 text-[#C9A227]" />
                    {town}
                  </span>
                ))}
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenChat(`Hi Robin, do you have availability for ${service.shortName} in my town?`)}
                  className="text-xs font-semibold text-[#1F4B34] hover:text-[#C9A227] underline inline-flex items-center gap-1"
                >
                  <RobinIcon size={14} />
                  Ask Robin about availability in your area
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service-Specific FAQ (if provided) */}
      {service.faq && service.faq.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion
            items={service.faq}
            title={`${service.shortName} Questions Answered`}
            subtitle="Straightforward answers from your local team"
          />
        </section>
      )}

      {/* Pricing Callout Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PricingCallout onOpenChat={onOpenChat} />
      </section>

      {/* Related Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-2xl sm:text-3xl font-display text-[#1F4B34]">
            Other Services You Can Combine
          </h3>
          <p className="text-sm text-[#1F2A22]/75 font-body mt-1">
            Book multiple jobs during the same visit to save time and hassle.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {relatedServices.map((rel) => {
            const relImage = (siteImages as any)[rel.imageKey] || siteImages.lawn_care;

            return (
              <div
                key={rel.slug}
                className="rounded-2xl bg-[#FFFDF7] border border-[#1F4B34]/15 overflow-hidden shadow-xs hover:shadow-md transition group flex flex-col justify-between"
              >
                <div className="h-36 overflow-hidden relative">
                  <img
                    src={relImage}
                    alt={rel.imageAltText}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                  <div className="absolute top-2 left-2">
                    <ServiceIcon type={rel.iconType} size={42} className="border border-[#FFFDF7]" />
                  </div>
                </div>

                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-display text-base text-[#1F4B34] group-hover:text-[#C9A227] transition">
                      {rel.name}
                    </h4>
                    <p className="text-xs text-[#1F2A22]/75 mt-1 line-clamp-2">
                      {rel.bodyCopy}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate(rel.url)}
                    className="mt-3 w-full py-2 rounded-lg bg-[#F6EFDD] hover:bg-[#C9A227]/25 text-[#1F4B34] text-xs font-semibold text-center transition cursor-pointer"
                  >
                    View Details &rarr;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
