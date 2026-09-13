import React, { useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { BUSINESS_INFO } from "../data/siteData";

export const PrivacyView: React.FC = () => {
  useEffect(() => {
    document.title = "Privacy Policy | ADD Gardening & Maintenance Services";
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8" id="privacy-policy">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F4B34]/10 text-[#1F4B34] text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C9A227]" />
          Data Protection &amp; GDPR
        </div>
        <h1 className="text-3xl sm:text-4xl font-display text-[#1F4B34]">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#1F2A22]/70">
          Last updated: September 2026
        </p>
      </div>

      <div className="bg-[#FFFDF7] rounded-2xl p-6 sm:p-10 border border-[#1F4B34]/15 shadow-sm space-y-6 text-sm text-[#1F2A22]/85 leading-relaxed font-body">
        <section className="space-y-2">
          <h2 className="text-xl font-display text-[#1F4B34]">1. Who We Are</h2>
          <p>
            ADD Gardening &amp; Maintenance Services is an independent mobile gardening and property maintenance service based in Oulton Broad, Lowestoft, Suffolk. We can be contacted by telephone on <strong>{BUSINESS_INFO.primaryPhone}</strong> or by email at <strong>{BUSINESS_INFO.email}</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-display text-[#1F4B34]">2. Information We Collect</h2>
          <p>
            When you request a quote via our website, telephone, or our interactive assistant Robin, we collect only the necessary details to provide you with an accurate quote and fulfill our service. This typically includes:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Your name</li>
            <li>Your contact telephone number and/or email address</li>
            <li>Your approximate location or town (to verify we cover your area)</li>
            <li>The services requested and a rough job description</li>
            <li>Your preferred time to be contacted</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-display text-[#1F4B34]">3. How We Use Your Data</h2>
          <p>
            Your information is used strictly to communicate with you regarding your quote request, coordinate visits, and perform gardening and maintenance services. We do <strong>not</strong> sell, rent, or share your personal data with third-party marketing companies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-display text-[#1F4B34]">4. Data Retention and Security</h2>
          <p>
            Quote inquiries and customer details are stored securely. Transcripts from chat conversations are used solely to accurately log your service requirements. You may request deletion or correction of your details at any time by emailing <strong>{BUSINESS_INFO.email}</strong>.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-display text-[#1F4B34]">5. Cookies and Analytics</h2>
          <p>
            Our website uses minimal, strictly functional cookies essential for site navigation and interactive quote assistance. We do not use intrusive tracking or invasive profiling.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-display text-[#1F4B34]">6. Contacting Us</h2>
          <p>
            If you have any questions about this Privacy Policy or your data, please contact Dave at ADD Gardening &amp; Maintenance Services on {BUSINESS_INFO.primaryPhone} or email {BUSINESS_INFO.email}.
          </p>
        </section>
      </div>
    </div>
  );
};
