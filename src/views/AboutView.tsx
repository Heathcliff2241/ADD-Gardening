import React, { useEffect } from "react";
import { ShieldCheck, UserCheck, Phone, ArrowRight, Heart, Award, MapPin } from "lucide-react";
import { RobinIcon, ButterflyIcon } from "../components/BrandMotifs";
import { TrustBar } from "../components/TrustBar";
import { PricingCallout } from "../components/PricingCallout";
import { ABOUT_PAGE, BUSINESS_INFO } from "../data/siteData";
import { siteImages } from "../assets/images";

interface AboutViewProps {
  onNavigate: (path: string) => void;
  onOpenChat: (prefill?: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenChat }) => {
  useEffect(() => {
    document.title = "About ADD Gardening & Maintenance Services, Lowestoft";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Meet the fully insured, DBS-checked local team behind ADD Gardening & Maintenance Services in Lowestoft and the Waveney area.");
    }
  }, []);

  return (
    <div className="space-y-16 sm:space-y-20" id="about-page">
      {/* Hero */}
      <section className="pt-6 sm:pt-10 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A227] bg-[#1F4B34] px-4 py-1.5 rounded-full">
              <Heart className="w-3.5 h-3.5" />
              <span>{ABOUT_PAGE.subheadline}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display text-[#1F4B34] tracking-tight leading-tight">
              {ABOUT_PAGE.headline}
            </h1>

            <p className="text-base sm:text-lg text-[#1F2A22]/85 font-body leading-relaxed max-w-2xl">
              {ABOUT_PAGE.bodyCopy}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onOpenChat("Hi Robin, tell me more about ADD Gardening and the team.")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#1F4B34] hover:bg-[#123424] text-[#FFFDF7] text-sm font-semibold shadow transition cursor-pointer"
              >
                <RobinIcon size={18} className="text-[#C9A227]" />
                <span>{ABOUT_PAGE.ctaText}</span>
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

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-[#FFFDF7] bg-[#FFFDF7]">
              <img
                src={siteImages.services_tools}
                alt="ADD Gardening and Maintenance Services team equipment in Lowestoft"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="p-4 bg-[#1F4B34] text-[#FFFDF7] text-xs flex items-center justify-between">
                <span>Equipment &amp; tools ready for every job</span>
                <span className="text-[#C9A227] font-semibold">Oulton Broad, Lowestoft</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <TrustBar />

      {/* The Brand Story: Why ADD Gardening Exists */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF7] rounded-2xl p-6 sm:p-10 border border-[#1F4B34]/15 shadow-sm space-y-8">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-xl font-script text-[#1F4B34] font-semibold">
              <ButterflyIcon size={20} />
              <span>Our Brand Philosophy</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display text-[#1F4B34]">
              One Dependable Local Team Instead of Four Separate Strangers
            </h2>

            <p className="text-sm sm:text-base text-[#1F2A22]/85 font-body leading-relaxed">
              Most homeowners in Lowestoft and Waveney tackle outside maintenance the hard way: one phone number for someone to mow the grass, another number for someone with long ladders to tackle a tall hedge, a third tradesperson with a pressure washer, and a fourth if a garden shed or wardrobe needs assembling.
            </p>

            <p className="text-sm sm:text-base text-[#1F2A22]/85 font-body leading-relaxed">
              Or worse, they use national marketplace apps like Checkatrade or Rated People where you get an anonymous dispatch each time. ADD Gardening was founded on the opposite principle: <strong>the same trusted, fully vetted local team every single time</strong>.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#F6EFDD]/60 border border-[#C9A227]/20 space-y-2">
                <span className="font-semibold text-[#1F4B34] block text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                  Fully Insured &amp; DBS-Checked
                </span>
                <p className="text-xs text-[#1F2A22]/80 leading-relaxed">
                  We don't hide our credentials in fine print. Every homeowner deserves complete confidence that whoever is on their property is insured and vetted.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F6EFDD]/60 border border-[#C9A227]/20 space-y-2">
                <span className="font-semibold text-[#1F4B34] block text-sm flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#C9A227]" />
                  One Transparent £21.50/Hour
                </span>
                <p className="text-xs text-[#1F2A22]/80 leading-relaxed">
                  No hidden callout fees, no sudden invoice inflation. You know the exact rate before we unload a single piece of equipment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <PricingCallout onOpenChat={onOpenChat} />
      </section>
    </div>
  );
};
