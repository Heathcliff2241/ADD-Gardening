import React, { useState } from "react";
import { Phone, Menu, X, ChevronDown, ShieldCheck, MapPin, Sparkles } from "lucide-react";
import { RobinIcon, ButterflyIcon } from "./BrandMotifs";
import { BUSINESS_INFO, SERVICES } from "../data/siteData";

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenChat: (prefill?: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPath,
  onNavigate,
  onOpenChat,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Services", path: "/services", hasDropdown: true },
    { label: "Areas We Cover", path: "/areas-we-cover" },
    { label: "Pricing", path: "/pricing" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#1F4B34]/15 shadow-xs">
      {/* Top micro-bar: DBS checked + Mobile area + Direct Call */}
      <div className="bg-[#1F4B34] text-[#F6EFDD] text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-[11px] sm:text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A227]" />
              Fully Insured &bull; DBS-Checked Local Team
            </span>
            <span className="hidden md:inline-block text-[#C9A227]">•</span>
            <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-[#F6EFDD]/80">
              <MapPin className="w-3 h-3 text-[#C9A227]" />
              Covering Lowestoft, Beccles, Bungay &amp; Great Yarmouth
            </span>
          </div>

          <div className="flex items-center gap-3 font-medium">
            <span className="hidden sm:inline-block text-[11px] font-semibold text-[#C9A227]">
              Flat £21.50 / hr
            </span>
            <a
              id="header-top-phone"
              href={`tel:${BUSINESS_INFO.primaryPhone}`}
              className="inline-flex items-center gap-1.5 text-xs text-[#FFFDF7] hover:text-[#C9A227] transition font-semibold"
            >
              <Phone className="w-3 h-3 text-[#C9A227]" />
              <span>{BUSINESS_INFO.primaryPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & brand identity */}
          <button
            type="button"
            onClick={() => handleLinkClick("/")}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-[#1F4B34] text-[#FFFDF7] flex items-center justify-center shadow-md border border-[#C9A227]/40 relative overflow-hidden transition group-hover:bg-[#123424]">
              {/* Monogram / Robin Badge */}
              <RobinIcon size={28} className="text-[#C9A227]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-display text-[#1F4B34] tracking-tight">
                  ADD Gardening
                </span>
                <ButterflyIcon size={16} className="text-[#C9A227]" />
              </div>
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#1F2A22]/70 block font-body">
                &amp; Maintenance Services
              </span>
            </div>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentPath === item.path || (item.path === "/services" && currentPath.startsWith("/services"));

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.path}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => handleLinkClick("/services")}
                      className={`px-3.5 py-2 rounded-lg text-sm font-medium transition cursor-pointer inline-flex items-center gap-1 ${
                        isActive
                          ? "text-[#1F4B34] bg-[#F6EFDD] font-semibold"
                          : "text-[#1F2A22]/85 hover:text-[#1F4B34] hover:bg-[#F6EFDD]/60"
                      }`}
                    >
                      <span>Services</span>
                      <ChevronDown className="w-4 h-4 text-[#C9A227]" />
                    </button>

                    {/* Services Dropdown */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 bg-[#FFFDF7] rounded-xl shadow-xl border border-[#1F4B34]/15 py-2 px-1 grid grid-cols-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <button
                          type="button"
                          onClick={() => handleLinkClick("/services")}
                          className="w-full text-left px-3 py-2 text-xs font-bold text-[#1F4B34] bg-[#F6EFDD]/50 rounded-lg mb-1 flex items-center justify-between"
                        >
                          <span>All Services Overview</span>
                          <span className="text-[10px] text-[#C9A227]">View Hub &rarr;</span>
                        </button>

                        {SERVICES.map((s) => (
                          <button
                            key={s.slug}
                            type="button"
                            onClick={() => handleLinkClick(s.url)}
                            className="w-full text-left px-3 py-2 text-xs font-medium text-[#1F2A22] hover:bg-[#F6EFDD] hover:text-[#1F4B34] rounded-lg transition flex items-center justify-between group"
                          >
                            <span>{s.name}</span>
                            <span className="text-[10px] text-[#1F2A22]/50 group-hover:text-[#C9A227]">&pound;21.50/hr</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleLinkClick(item.path)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                    isActive
                      ? "text-[#1F4B34] bg-[#F6EFDD] font-semibold"
                      : "text-[#1F2A22]/85 hover:text-[#1F4B34] hover:bg-[#F6EFDD]/60"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              id="header-ask-robin-btn"
              onClick={() => onOpenChat()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F6EFDD] hover:bg-[#C9A227]/20 border border-[#1F4B34]/20 text-xs font-semibold text-[#1F4B34] transition cursor-pointer shadow-2xs"
            >
              <RobinIcon size={18} />
              <span>Ask Robin</span>
            </button>

            <a
              id="header-primary-call-btn"
              href={`tel:${BUSINESS_INFO.primaryPhone}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1F4B34] hover:bg-[#123424] text-[#FFFDF7] text-xs font-semibold transition cursor-pointer shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Call 07538 482844</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              id="mobile-chat-quick-btn"
              onClick={() => onOpenChat()}
              className="p-2 rounded-lg bg-[#F6EFDD] text-[#1F4B34] border border-[#1F4B34]/20"
              aria-label="Ask Robin"
            >
              <RobinIcon size={20} />
            </button>

            <button
              type="button"
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-[#1F4B34] hover:bg-[#F6EFDD] transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF7] border-b border-[#1F4B34]/20 px-4 py-6 shadow-xl animate-in fade-in slide-in-from-top-3 duration-150">
          <div className="space-y-1 pb-4 border-b border-[#1F4B34]/10">
            {navItems.map((item) => (
              <div key={item.path}>
                <button
                  type="button"
                  onClick={() => handleLinkClick(item.path)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium ${
                    currentPath === item.path
                      ? "bg-[#F6EFDD] text-[#1F4B34] font-semibold"
                      : "text-[#1F2A22] hover:bg-[#F6EFDD]/60"
                  }`}
                >
                  {item.label}
                </button>

                {item.hasDropdown && (
                  <div className="pl-6 pr-2 py-1 space-y-1">
                    {SERVICES.map((s) => (
                      <button
                        key={s.slug}
                        type="button"
                        onClick={() => handleLinkClick(s.url)}
                        className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-medium flex items-center justify-between ${
                          currentPath === s.url
                            ? "bg-[#C9A227]/20 text-[#1F4B34] font-semibold"
                            : "text-[#1F2A22]/70 hover:text-[#1F4B34]"
                        }`}
                      >
                        <span>{s.name}</span>
                        <span className="text-[10px] text-[#C9A227] font-semibold">&pound;21.50/hr</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 space-y-3">
            <a
              href={`tel:${BUSINESS_INFO.primaryPhone}`}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1F4B34] text-[#FFFDF7] font-semibold text-sm shadow-sm"
            >
              <Phone className="w-4 h-4 text-[#C9A227]" />
              <span>Call Dave on {BUSINESS_INFO.primaryPhone}</span>
            </a>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#C9A227] text-[#123424] font-semibold text-sm shadow-sm"
            >
              <RobinIcon size={20} />
              <span>Ask Robin for a Quote</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
