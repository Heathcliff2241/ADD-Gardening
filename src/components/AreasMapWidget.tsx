import React, { useState } from "react";
import { MapPin, CheckCircle, Search, HelpCircle, PhoneCall } from "lucide-react";
import { BUSINESS_INFO } from "../data/siteData";
import { siteImages } from "../assets/images";

interface AreasMapWidgetProps {
  onOpenChat?: (prefill?: string) => void;
  className?: string;
}

export const AreasMapWidget: React.FC<AreasMapWidgetProps> = ({ onOpenChat, className = "" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkResult, setCheckResult] = useState<{ checked: boolean; match: boolean; townName?: string }>({
    checked: false,
    match: false,
  });

  const handleCheckArea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const query = searchQuery.trim().toLowerCase();
    const found = BUSINESS_INFO.coveredTowns.find((t) => t.toLowerCase().includes(query) || query.includes(t.toLowerCase()));

    if (found) {
      setCheckResult({ checked: true, match: true, townName: found });
    } else {
      setCheckResult({ checked: true, match: false });
    }
  };

  return (
    <div className={`space-y-8 ${className}`} id="areas-map-widget">
      {/* Search interactive box */}
      <div className="bg-[#FFFDF7] rounded-2xl p-6 sm:p-8 border border-[#1F4B34]/15 shadow-sm">
        <div className="max-w-xl mx-auto text-center space-y-3 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F4B34]/10 text-[#1F4B34] text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#C9A227]" />
            Coverage Verification
          </div>
          <h3 className="text-xl sm:text-2xl font-display text-[#1F4B34]">
            Check If We Cover Your Town
          </h3>
          <p className="text-sm text-[#1F2A22]/80 font-body">
            We are mobile and based in Oulton Broad, Lowestoft. Enter your town or village below:
          </p>
        </div>

        <form onSubmit={handleCheckArea} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#1F4B34]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              id="town-search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (checkResult.checked) setCheckResult({ checked: false, match: false });
              }}
              placeholder="e.g. Beccles, Bungay, Hopton..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#F6EFDD]/40 border border-[#1F4B34]/20 text-sm text-[#1F2A22] placeholder:text-[#1F2A22]/40 focus:outline-none focus:ring-2 focus:ring-[#1F4B34]"
            />
          </div>
          <button
            type="submit"
            id="check-area-btn"
            className="px-6 py-3 rounded-xl bg-[#1F4B34] hover:bg-[#123424] text-[#FFFDF7] text-sm font-semibold transition cursor-pointer shadow-sm"
          >
            Check Coverage
          </button>
        </form>

        {checkResult.checked && (
          <div className="mt-5 max-w-md mx-auto p-4 rounded-xl transition-all">
            {checkResult.match ? (
              <div className="p-3 rounded-lg bg-[#1F4B34]/10 border border-[#1F4B34]/30 flex items-start gap-3 text-sm text-[#1F4B34]">
                <CheckCircle className="w-5 h-5 text-[#1F4B34] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Yes, we regularly cover {checkResult.townName}!</span>
                  <span>Our standard £21.50/hour rate applies with zero hidden callout fees.</span>
                  <div className="mt-2.5">
                    <button
                      type="button"
                      onClick={() => onOpenChat && onOpenChat(`Hi Robin, I'm in ${checkResult.townName} and need a quote.`)}
                      className="text-xs font-semibold bg-[#1F4B34] text-[#FFFDF7] px-3.5 py-1.5 rounded-lg hover:bg-[#123424] transition inline-flex items-center gap-1.5"
                    >
                      Book job in {checkResult.townName}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-[#C9A227]/15 border border-[#C9A227]/40 flex items-start gap-3 text-sm text-[#1F2A22]">
                <HelpCircle className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block">Town not explicitly listed?</span>
                  <span>We often cover nearby hamlets and villages between our main towns. Ask Robin or give us a quick ring to verify.</span>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenChat && onOpenChat(`Hi Robin, do you cover ${searchQuery}?`)}
                      className="text-xs font-semibold bg-[#1F4B34] text-[#FFFDF7] px-3 py-1.5 rounded-lg hover:bg-[#123424] transition"
                    >
                      Ask Robin
                    </button>
                    <a
                      href={`tel:${BUSINESS_INFO.primaryPhone}`}
                      className="text-xs font-semibold bg-[#FFFDF7] border border-[#1F4B34]/30 text-[#1F4B34] px-3 py-1.5 rounded-lg hover:bg-[#F6EFDD] transition inline-flex items-center gap-1"
                    >
                      <PhoneCall className="w-3 h-3" />
                      {BUSINESS_INFO.primaryPhone}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Visual map band + town pills */}
      <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#FFFDF7] rounded-2xl p-6 sm:p-8 border border-[#1F4B34]/15 shadow-sm">
        <div className="lg:col-span-6 rounded-xl overflow-hidden border-2 border-[#1F4B34]/15 shadow-xs relative group">
          <img
            src={siteImages.service_area_map}
            alt="Map of towns covered by ADD Gardening and Maintenance Services near Lowestoft"
            className="w-full h-auto object-cover max-h-[380px]"
          />
          <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-[#1F4B34]/90 backdrop-blur-xs rounded-lg text-xs text-[#FFFDF7] flex items-center justify-between">
            <span className="font-medium">Mobile Service &bull; Based in Oulton Broad</span>
            <span className="text-[#C9A227] font-semibold">Suffolk / Norfolk Border</span>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <h4 className="text-xl sm:text-2xl font-display text-[#1F4B34]">
            All Covered Towns &amp; Villages
          </h4>
          <p className="text-sm text-[#1F2A22]/80 font-body">
            Because we are a mobile team without a showroom or storefront, we come directly to your home across every town below:
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {BUSINESS_INFO.coveredTowns.map((town) => (
              <button
                key={town}
                type="button"
                onClick={() => onOpenChat && onOpenChat(`Hi Robin, do you have availability for work in ${town}?`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F6EFDD] hover:bg-[#C9A227]/20 border border-[#1F4B34]/15 text-xs sm:text-sm font-medium text-[#1F4B34] transition cursor-pointer"
              >
                <MapPin className="w-3 h-3 text-[#C9A227]" />
                <span>{town}</span>
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1F4B34]/10 text-xs text-[#1F2A22]/70">
            Click any town to check availability with Robin, or ask about neighboring villages.
          </div>
        </div>
      </div>
    </div>
  );
};
