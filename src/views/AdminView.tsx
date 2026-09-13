import React, { useState, useEffect } from "react";
import { Lock, RefreshCw, MessageSquare, Phone, Mail, MapPin, Calendar, Clock, ChevronDown, Download, Check } from "lucide-react";
import { RobinIcon } from "../components/BrandMotifs";
import { BUSINESS_INFO } from "../data/siteData";

interface LeadRecord {
  id: string;
  timestamp: string;
  fullName: string;
  contactMethod: string;
  town?: string;
  services?: string;
  jobDescription?: string;
  preferredTime?: string;
  transcript?: Array<{ sender: string; text: string; timestamp?: string }>;
}

export const AdminView: React.FC = () => {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedLeadId, setExpandedLeadId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchLeads = async (keyToUse: string) => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`/api/admin/leads?key=${encodeURIComponent(keyToUse)}`);
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Invalid admin password. Please try again.");
        }
        throw new Error("Failed to load leads from server.");
      }
      const data = await res.json();
      setLeads(data.leads || []);
      setIsAuthenticated(true);
      sessionStorage.setItem("add_admin_key", keyToUse);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred");
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("add_admin_key");
    if (saved) {
      setAdminKey(saved);
      fetchLeads(saved);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim()) return;
    fetchLeads(adminKey.trim());
  };

  const handleCopy = (lead: LeadRecord) => {
    const text = `Customer: ${lead.fullName}\nContact: ${lead.contactMethod}\nTown: ${lead.town || "N/A"}\nService: ${lead.services || "N/A"}\nDetails: ${lead.jobDescription || "N/A"}`;
    navigator.clipboard.writeText(text);
    setCopiedId(lead.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCsv = () => {
    if (leads.length === 0) return;
    const headers = ["ID", "Date", "Customer Name", "Contact", "Town", "Service", "Description", "Preferred Time"];
    const rows = leads.map((l) => [
      l.id,
      new Date(l.timestamp).toLocaleString(),
      `"${(l.fullName || "").replace(/"/g, '""')}"`,
      `"${(l.contactMethod || "").replace(/"/g, '""')}"`,
      `"${(l.town || "").replace(/"/g, '""')}"`,
      `"${(l.services || "").replace(/"/g, '""')}"`,
      `"${(l.jobDescription || "").replace(/"/g, '""')}"`,
      `"${(l.preferredTime || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `add-gardening-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8" id="admin-portal">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#1F4B34]/15">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C9A227] font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Owner Portal &bull; Private</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display text-[#1F4B34] mt-1">
            Quote Leads &amp; Robin Transcripts
          </h1>
          <p className="text-xs sm:text-sm text-[#1F2A22]/70">
            View visitor quote requests and chat conversations logged on the server.
          </p>
        </div>

        {isAuthenticated && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fetchLeads(adminKey)}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#F6EFDD] text-[#1F4B34] text-xs font-semibold hover:bg-[#C9A227]/25 transition"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={handleExportCsv}
              disabled={leads.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#1F4B34] text-[#FFFDF7] text-xs font-semibold hover:bg-[#123424] transition disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Export CSV</span>
            </button>
          </div>
        )}
      </div>

      {!isAuthenticated ? (
        /* Login Card */
        <div className="max-w-md mx-auto bg-[#FFFDF7] rounded-2xl p-8 border border-[#1F4B34]/20 shadow-md text-center space-y-5">
          <div className="w-12 h-12 rounded-full bg-[#1F4B34] text-[#C9A227] flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h2 className="text-xl font-display text-[#1F4B34]">Enter Owner Passcode</h2>
            <p className="text-xs text-[#1F2A22]/70 mt-1">
              Enter your admin key (configured in <code>.env</code> or default <code>addgardens2026</code>).
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Admin password..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#F6EFDD]/40 border border-[#1F4B34]/20 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#1F4B34]"
            />

            {errorMsg && (
              <p className="text-xs text-red-600 bg-red-50 p-2 rounded-lg">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-[#1F4B34] hover:bg-[#123424] text-[#FFFDF7] text-sm font-semibold transition cursor-pointer shadow-xs"
            >
              {isLoading ? "Authenticating..." : "Unlock Leads"}
            </button>
          </form>
        </div>
      ) : (
        /* Leads list */
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-[#1F2A22]/70 px-1">
            <span>Total logged inquiries: <strong>{leads.length}</strong></span>
            <span>Gmail alerts configured for: <strong>{BUSINESS_INFO.email}</strong></span>
          </div>

          {leads.length === 0 ? (
            <div className="bg-[#FFFDF7] rounded-2xl p-12 text-center border border-[#1F4B34]/15 space-y-3">
              <RobinIcon size={36} className="text-[#C9A227] mx-auto opacity-70" />
              <h3 className="font-display text-lg text-[#1F4B34]">No quote requests logged yet</h3>
              <p className="text-xs text-[#1F2A22]/70 max-w-sm mx-auto">
                When visitors chat with Robin or submit the contact form, quotes and full transcripts will appear here in real time.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {leads.map((lead) => {
                const isExpanded = expandedLeadId === lead.id;
                const isCopied = copiedId === lead.id;

                return (
                  <div
                    key={lead.id}
                    className="bg-[#FFFDF7] rounded-xl border border-[#1F4B34]/15 shadow-xs overflow-hidden transition"
                  >
                    <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-base font-display text-[#1F4B34]">
                            {lead.fullName || "Anonymous Visitor"}
                          </h3>
                          <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#1F4B34]/10 text-[#1F4B34] font-medium">
                            {lead.town || "Town not specified"}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#C9A227]/20 text-[#1F4B34] font-semibold">
                            {lead.services || "General Inquiry"}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#1F2A22]/75">
                          <span className="font-medium text-[#1F4B34]">{lead.contactMethod}</span>
                          <span>&bull;</span>
                          <span>{new Date(lead.timestamp).toLocaleString()}</span>
                          {lead.preferredTime && (
                            <>
                              <span>&bull;</span>
                              <span>Prefers: {lead.preferredTime}</span>
                            </>
                          )}
                        </div>

                        {lead.jobDescription && (
                          <p className="text-xs text-[#1F2A22]/85 pt-1 font-body">
                            <strong>Job:</strong> {lead.jobDescription}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                        <button
                          type="button"
                          onClick={() => handleCopy(lead)}
                          className="px-3 py-1.5 rounded-lg border border-[#1F4B34]/20 text-xs text-[#1F4B34] hover:bg-[#F6EFDD] transition flex items-center gap-1"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                          <span>{isCopied ? "Copied" : "Copy Details"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setExpandedLeadId(isExpanded ? null : lead.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#1F4B34] text-[#FFFDF7] text-xs font-medium hover:bg-[#123424] transition flex items-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-[#C9A227]" />
                          <span>{isExpanded ? "Hide Chat" : "View Chat"}</span>
                          <ChevronDown className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                    </div>

                    {/* Chat transcript expansion */}
                    {isExpanded && (
                      <div className="p-4 bg-[#F6EFDD]/30 border-t border-[#1F4B34]/10 space-y-2 text-xs">
                        <span className="font-semibold text-[#1F4B34] block">Full Conversation Transcript:</span>
                        {lead.transcript && lead.transcript.length > 0 ? (
                          <div className="space-y-2 max-h-72 overflow-y-auto p-2 bg-white rounded-lg border border-[#1F4B34]/10">
                            {lead.transcript.map((t, idx) => (
                              <div
                                key={idx}
                                className={`p-2 rounded-lg ${
                                  t.sender === "robin"
                                    ? "bg-[#F6EFDD]/50 text-[#1F2A22]"
                                    : "bg-[#1F4B34]/10 text-[#1F4B34]"
                                }`}
                              >
                                <span className="font-bold uppercase tracking-wider text-[10px] block opacity-70">
                                  {t.sender === "robin" ? "Robin (AI Assistant)" : "Visitor"}
                                </span>
                                <p className="mt-0.5 whitespace-pre-wrap">{t.text}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[#1F2A22]/60 italic">No chat messages logged for this direct submission.</p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
