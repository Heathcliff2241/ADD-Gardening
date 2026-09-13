import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { RobinIcon, ButterflyIcon } from "../components/BrandMotifs";
import { FAQAccordion } from "../components/FAQAccordion";
import { CONTACT_PAGE, BUSINESS_INFO } from "../data/siteData";
import { siteImages } from "../assets/images";

interface ContactViewProps {
  onOpenChat: (prefill?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenChat }) => {
  const [fullName, setFullName] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [town, setTown] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState("Lawn Care & Grass Cutting");
  const [jobDescription, setJobDescription] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Get a Quote | ADD Gardening & Maintenance Services";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Get a quote from ADD Gardening & Maintenance Services in Lowestoft. Chat with Robin or call 07538 482844 today.");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !contactMethod.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          contactMethod,
          town,
          services: serviceNeeded,
          jobDescription,
          preferredTime,
          transcript: [
            {
              sender: "user",
              text: `Submitted directly via Contact page quote form. Town: ${town}, Service: ${serviceNeeded}, Description: ${jobDescription}`,
            },
          ],
        }),
      });

      if (res.ok) {
        setSubmittedStatus("success");
      } else {
        setSubmittedStatus("error");
      }
    } catch {
      setSubmittedStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 sm:space-y-20" id="contact-page">
      {/* Hero */}
      <section className="pt-6 sm:pt-10 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A227] bg-[#1F4B34] px-4 py-1.5 rounded-full">
            <RobinIcon size={16} />
            <span>{CONTACT_PAGE.subheadline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-display text-[#1F4B34] tracking-tight leading-tight">
            {CONTACT_PAGE.headline}
          </h1>

          <p className="text-base sm:text-lg text-[#1F2A22]/85 font-body leading-relaxed">
            {CONTACT_PAGE.bodyCopy}
          </p>
        </div>
      </section>

      {/* Main interactive grid: Chat trigger card + Direct Quote form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Ask Robin Hero Card */}
          <div className="lg:col-span-5 bg-[#1F4B34] text-[#FFFDF7] rounded-2xl p-6 sm:p-8 border-2 border-[#C9A227]/40 shadow-xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#C9A227] bg-[#123424] shrink-0 shadow-md">
                <img
                  src={siteImages.robin_mascot}
                  alt="Robin the chat assistant illustration for ADD Gardening and Maintenance Services"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-[#C9A227] font-semibold block">
                  Interactive AI Assistant
                </span>
                <h2 className="text-2xl font-display text-[#FFFDF7]">
                  Ask Robin
                </h2>
                <span className="text-xs text-[#F6EFDD]/80">
                  Instant questions &bull; Area checks &bull; Quotes
                </span>
              </div>
            </div>

            <p className="text-sm text-[#F6EFDD]/90 leading-relaxed font-body">
              Robin can immediately check whether we cover your town, explain how we approach tall hedges or pressure washing, and gather your job requirements so Dave can provide your confirmed quote.
            </p>

            <div className="p-4 rounded-xl bg-[#123424]/80 border border-[#C9A227]/30 text-xs space-y-2">
              <div className="text-[#C9A227] font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227]" />
                <span>What Robin will ask for:</span>
              </div>
              <ul className="space-y-1 text-[#F6EFDD]/80 list-disc list-inside">
                <li>Your name and best contact method</li>
                <li>Your town or village</li>
                <li>Which service(s) you need</li>
                <li>A rough sense of the job size</li>
              </ul>
            </div>

            <button
              type="button"
              id="contact-start-chat-btn"
              onClick={() => onOpenChat("Hi Robin, I'd like to get a quote for some maintenance work.")}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#C9A227] hover:bg-[#d8af2c] text-[#123424] font-semibold text-sm shadow-md transition cursor-pointer"
            >
              <RobinIcon size={20} />
              <span>{CONTACT_PAGE.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Direct Phone & Email Fallback */}
            <div className="pt-4 border-t border-[#C9A227]/20 space-y-3">
              <span className="text-xs text-[#F6EFDD]/70 block">
                Prefer to phone or email directly?
              </span>
              <a
                href={`tel:${BUSINESS_INFO.primaryPhone}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#123424]/60 hover:bg-[#123424] border border-[#C9A227]/20 transition text-sm"
              >
                <Phone className="w-4 h-4 text-[#C9A227]" />
                <div>
                  <span className="text-[11px] text-[#C9A227] block">Primary Phone</span>
                  <span className="font-semibold text-[#FFFDF7]">{BUSINESS_INFO.primaryPhone}</span>
                </div>
              </a>

              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#123424]/60 hover:bg-[#123424] border border-[#C9A227]/20 transition text-sm"
              >
                <Mail className="w-4 h-4 text-[#C9A227]" />
                <div>
                  <span className="text-[11px] text-[#C9A227] block">Email</span>
                  <span className="font-semibold text-[#FFFDF7]">{BUSINESS_INFO.email}</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Quote Request Form */}
          <div className="lg:col-span-7 bg-[#FFFDF7] rounded-2xl p-6 sm:p-10 border border-[#1F4B34]/15 shadow-sm">
            <div className="mb-6 pb-4 border-b border-[#1F4B34]/10">
              <h2 className="text-2xl font-display text-[#1F4B34]">
                Online Quote Request Form
              </h2>
              <p className="text-xs sm:text-sm text-[#1F2A22]/75 font-body mt-1">
                Fill this out directly if you prefer not to chat. We review all inquiries promptly.
              </p>
            </div>

            {submittedStatus === "success" ? (
              <div className="p-6 rounded-2xl bg-[#1F4B34]/10 border border-[#1F4B34]/30 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#1F4B34] text-[#C9A227] flex items-center justify-center mx-auto shadow">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl text-[#1F4B34]">Quote Request Received!</h3>
                <p className="text-sm text-[#1F2A22]/85 font-body max-w-md mx-auto">
                  Thanks, that's everything I need. The team will get back to you at <strong>{contactMethod}</strong> to confirm your quote.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedStatus(null);
                      setFullName("");
                      setContactMethod("");
                      setJobDescription("");
                    }}
                    className="text-xs font-semibold text-[#1F4B34] underline"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F4B34] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Margaret Bennett"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6EFDD]/30 border border-[#1F4B34]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4B34]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1F4B34] mb-1">
                      Phone Number or Email *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactMethod}
                      onChange={(e) => setContactMethod(e.target.value)}
                      placeholder="e.g. 07538 123456 or name@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6EFDD]/30 border border-[#1F4B34]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4B34]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1F4B34] mb-1">
                      Town or Village
                    </label>
                    <input
                      type="text"
                      value={town}
                      onChange={(e) => setTown(e.target.value)}
                      placeholder="e.g. Lowestoft, Beccles, Bungay..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6EFDD]/30 border border-[#1F4B34]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4B34]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1F4B34] mb-1">
                      Service Needed
                    </label>
                    <select
                      value={serviceNeeded}
                      onChange={(e) => setServiceNeeded(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6EFDD]/30 border border-[#1F4B34]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4B34]"
                    >
                      <option value="Lawn Care & Grass Cutting">Lawn Care &amp; Grass Cutting</option>
                      <option value="Hedge Trimming & Pruning">Hedge Trimming &amp; Pruning</option>
                      <option value="Garden Tidying & General Maintenance">Garden Tidying &amp; General Maintenance</option>
                      <option value="Planting & Flower/Veg Beds">Planting &amp; Flower/Veg Beds</option>
                      <option value="Fence Painting">Fence Painting</option>
                      <option value="Pressure Washing">Pressure Washing</option>
                      <option value="Pond Cleaning & Maintenance">Pond Cleaning &amp; Maintenance</option>
                      <option value="Flat-Pack Furniture Assembly">Flat-Pack Furniture Assembly</option>
                      <option value="Multiple Combined Services">Multiple Combined Services</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F4B34] mb-1">
                    Rough Job Size or Description
                  </label>
                  <textarea
                    rows={3}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="e.g. Overgrown hedge along the driveway, approximately 20 meters long and 2.5 meters tall."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6EFDD]/30 border border-[#1F4B34]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4B34]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1F4B34] mb-1">
                    Preferred Day / Time to be Contacted
                  </label>
                  <input
                    type="text"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    placeholder="e.g. Weekdays after 4pm, or any morning"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F6EFDD]/30 border border-[#1F4B34]/20 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4B34]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    id="submit-contact-form-btn"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#1F4B34] hover:bg-[#123424] text-[#FFFDF7] font-semibold text-sm shadow transition cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-[#C9A227]" />
                    <span>{isSubmitting ? "Sending Request..." : "Submit Quote Request"}</span>
                  </button>
                  <span className="text-xs text-[#1F2A22]/60 block mt-2">
                    Standard £21.50/hour rate applies. No hidden fees.
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <FAQAccordion
          items={CONTACT_PAGE.faq}
          title="Quote Process Questions"
          subtitle="How we receive your details and get in touch"
        />
      </section>
    </div>
  );
};
