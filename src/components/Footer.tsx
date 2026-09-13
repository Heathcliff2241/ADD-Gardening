import React from "react";
import { Phone, Mail, MapPin, ShieldCheck, Clock, ExternalLink, Lock } from "lucide-react";
import { RobinIcon, ButterflyIcon } from "./BrandMotifs";
import { BUSINESS_INFO, SERVICES } from "../data/siteData";

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenChat: (prefill?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenChat }) => {
  return (
    <footer className="bg-[#123424] text-[#F6EFDD] pt-14 pb-10 border-t-2 border-[#C9A227]/40" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#FFFDF7]/15">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#1F4B34] border border-[#C9A227]/50 flex items-center justify-center text-[#C9A227] shrink-0">
                <RobinIcon size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-display text-[#FFFDF7] leading-none">
                  ADD Gardening
                </h3>
                <span className="text-xs uppercase tracking-wider text-[#C9A227] font-semibold block mt-1">
                  &amp; Maintenance Services
                </span>
              </div>
            </div>

            <p className="text-sm text-[#F6EFDD]/85 leading-relaxed font-body">
              Mobile garden and home maintenance team based in Oulton Broad, Lowestoft. One dependable local team for lawns, hedges, ponds, fences, pressure washing, and flat-pack assembly at one transparent hourly rate.
            </p>

            <div className="p-3.5 rounded-xl bg-[#1F4B34]/60 border border-[#C9A227]/30 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-[#C9A227] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Fully Insured &amp; DBS-Checked</span>
              </div>
              <p className="text-[#F6EFDD]/75">
                We're committed to providing a safe, trustworthy service you can rely on, whether you're home or away.
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-base font-display text-[#C9A227] tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[#F6EFDD]/80">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/")}
                  className="hover:text-[#C9A227] transition cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/services")}
                  className="hover:text-[#C9A227] transition cursor-pointer"
                >
                  All Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/areas-we-cover")}
                  className="hover:text-[#C9A227] transition cursor-pointer"
                >
                  Areas We Cover
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/pricing")}
                  className="hover:text-[#C9A227] transition cursor-pointer"
                >
                  Pricing (£21.50/hr)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/about")}
                  className="hover:text-[#C9A227] transition cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/contact")}
                  className="hover:text-[#C9A227] transition cursor-pointer"
                >
                  Contact &amp; Quotes
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate("/privacy")}
                  className="hover:text-[#C9A227] transition cursor-pointer text-xs opacity-75"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Silo service links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-base font-display text-[#C9A227] tracking-wide">
              Individual Services
            </h4>
            <ul className="space-y-1.5 text-xs text-[#F6EFDD]/80">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <button
                    type="button"
                    onClick={() => onNavigate(s.url)}
                    className="hover:text-[#C9A227] transition cursor-pointer text-left py-0.5"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & NAP */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base font-display text-[#C9A227] tracking-wide">
              Get in Touch
            </h4>

            <div className="space-y-3 text-sm">
              <a
                id="footer-call-primary"
                href={`tel:${BUSINESS_INFO.primaryPhone}`}
                className="flex items-start gap-3 p-3 rounded-xl bg-[#1F4B34]/60 hover:bg-[#1F4B34] border border-[#C9A227]/30 transition group"
              >
                <Phone className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#C9A227] font-semibold">
                    Primary Phone (Click to Call)
                  </span>
                  <span className="font-semibold text-[#FFFDF7] group-hover:text-[#C9A227] text-base">
                    {BUSINESS_INFO.primaryPhone}
                  </span>
                </div>
              </a>

              <a
                href={`tel:${BUSINESS_INFO.secondaryPhone}`}
                className="flex items-center gap-3 text-xs text-[#F6EFDD]/80 hover:text-[#C9A227] pl-1"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9A227]/70" />
                <span>Secondary: {BUSINESS_INFO.secondaryPhone}</span>
              </a>

              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-3 text-xs text-[#F6EFDD]/80 hover:text-[#C9A227] pl-1"
              >
                <Mail className="w-3.5 h-3.5 text-[#C9A227]/70" />
                <span>{BUSINESS_INFO.email}</span>
              </a>

              <div className="flex items-start gap-3 text-xs text-[#F6EFDD]/70 pl-1">
                <MapPin className="w-3.5 h-3.5 text-[#C9A227]/70 shrink-0 mt-0.5" />
                <span>Mobile service based in Oulton Broad, Lowestoft, Suffolk (no public premises address)</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                id="footer-ask-robin-btn"
                onClick={() => onOpenChat()}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#C9A227] hover:bg-[#d8af2c] text-[#123424] font-semibold text-xs shadow-sm transition cursor-pointer"
              >
                <RobinIcon size={18} />
                <span>Ask Robin for an Instant Quote</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F6EFDD]/60">
          <div>
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-[#C9A227]">
              <ButterflyIcon size={14} />
              <span>We care for your garden and home so you can enjoy it.</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigate("/admin")}
              title="Business owner portal"
              className="inline-flex items-center gap-1 text-[#F6EFDD]/40 hover:text-[#C9A227] transition"
            >
              <Lock className="w-3 h-3" />
              <span>Owner Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
