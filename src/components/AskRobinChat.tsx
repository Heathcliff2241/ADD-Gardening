import React, { useState, useEffect, useRef } from "react";
import { X, Send, Phone, MessageSquare, Sparkles, CheckCircle2, RotateCcw, AlertCircle, ChevronDown, User, MapPin, Wrench } from "lucide-react";
import { RobinIcon, ButterflyIcon } from "./BrandMotifs";
import { siteImages } from "../assets/images";
import { BUSINESS_INFO } from "../data/siteData";

export interface ChatMessage {
  id: string;
  sender: "user" | "robin";
  text: string;
  timestamp: string;
  isExtractedConfirmation?: boolean;
}

export interface QuoteLeadState {
  fullName: string;
  contactMethod: string;
  town: string;
  services: string;
  jobDescription: string;
  preferredTime: string;
  isComplete: boolean;
}

interface AskRobinChatProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  initialMessagePrefill?: string;
  clearPrefill?: () => void;
}

const INITIAL_GREETING = "Hello! I'm Robin, your virtual assistant for ADD Gardening & Maintenance Services. Whether you need a quick quote for lawn mowing, tall hedge trimming, patio pressure washing, or flat-pack assembly at our flat £21.50/hr rate, how can I help you today?";

export const AskRobinChat: React.FC<AskRobinChatProps> = ({
  isOpen,
  onClose,
  onOpen,
  initialMessagePrefill,
  clearPrefill,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init-1",
      sender: "robin",
      text: INITIAL_GREETING,
      timestamp: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showQuoteFormSummary, setShowQuoteFormSummary] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  // Extracted lead fields
  const [leadData, setLeadData] = useState<QuoteLeadState>({
    fullName: "",
    contactMethod: "",
    town: "",
    services: "",
    jobDescription: "",
    preferredTime: "",
    isComplete: false,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
      inputRef.current?.focus();
    }
  }, [isOpen, messages]);

  // Handle external prefill message trigger (e.g. from service pages)
  useEffect(() => {
    if (initialMessagePrefill && isOpen) {
      handleSendMessage(initialMessagePrefill);
      if (clearPrefill) clearPrefill();
    }
  }, [initialMessagePrefill, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ sender: m.sender, text: m.text })),
          currentLeadData: leadData,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const robinReply = data.reply || "Thanks for your message! The team will be happy to help. What's the best phone or email to reach you on?";

      const robinMsg: ChatMessage = {
        id: `robin-${Date.now()}`,
        sender: "robin",
        text: robinReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, robinMsg]);

      // If backend extracted lead fields, update state
      if (data.extractedLead) {
        setLeadData((prev) => {
          const updated = {
            fullName: data.extractedLead.name || prev.fullName,
            contactMethod: data.extractedLead.contact || prev.contactMethod,
            town: data.extractedLead.town || prev.town,
            services: data.extractedLead.service || prev.services,
            jobDescription: data.extractedLead.jobDescription || prev.jobDescription,
            preferredTime: data.extractedLead.preferredTime || prev.preferredTime,
            isComplete: !!data.extractedLead.isComplete,
          };
          if (updated.fullName && updated.contactMethod && (updated.isComplete || data.extractedLead.isComplete)) {
            triggerLeadFinalization(updated, [...newMessages, robinMsg]);
          }
          return updated;
        });
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `robin-err-${Date.now()}`,
          sender: "robin",
          text: "I'm having a brief connection flutter, but you can always reach our team directly at 07538 482844 or addgardens1@gmail.com. Would you like to leave your details in the quick quote form below?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerLeadFinalization = async (data: QuoteLeadState, currentTranscript: ChatMessage[]) => {
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          contactMethod: data.contactMethod,
          town: data.town,
          services: data.services,
          jobDescription: data.jobDescription,
          preferredTime: data.preferredTime,
          transcript: currentTranscript.map((m) => ({
            sender: m.sender,
            text: m.text,
            timestamp: m.timestamp,
          })),
        }),
      });

      if (res.ok) {
        const result = await res.json();
        setSubmittedLeadId(result.leadId);
      }
    } catch (e) {
      console.error("Lead submission error:", e);
    }
  };

  const handleManualQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.fullName || !leadData.contactMethod) return;

    setIsLoading(true);
    await triggerLeadFinalization(leadData, messages);
    setIsLoading(false);

    const confirmationText = `Thanks, that's everything I need. The team will get back to you at ${leadData.contactMethod} to confirm your quote.`;
    setMessages((prev) => [
      ...prev,
      {
        id: `robin-confirm-${Date.now()}`,
        sender: "robin",
        text: confirmationText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setShowQuoteFormSummary(false);
  };

  return (
    <>
      {/* Docked Floating Widget Button (Signature element on every page) */}
      {!isOpen && (
        <aside
          aria-label="Ask Robin Assistant"
          className="fixed bottom-5 right-5 z-50 flex items-center group cursor-pointer"
          onClick={onOpen}
        >
          <div className="hidden sm:flex items-center gap-2 mr-3 px-4 py-2 rounded-full bg-[#123424] text-[#F6EFDD] text-xs font-semibold shadow-lg border border-[#C9A227]/40 transition transform group-hover:scale-105">
            <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse" />
            <span>Ask Robin for a Quote</span>
          </div>

          <div
            id="ask-robin-bubble"
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1F4B34] border-2 border-[#C9A227] shadow-xl flex items-center justify-center text-[#F6EFDD] relative transition-transform duration-200 group-hover:scale-105 overflow-hidden"
          >
            <img
              src={siteImages.robin_mascot}
              alt="Ask Robin assistant"
              className="w-full h-full object-cover"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C9A227] border-2 border-[#123424] flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#123424]" />
            </div>
          </div>
        </aside>
      )}

      {/* Floating Chat Modal / Drawer */}
      {isOpen && (
        <aside
          aria-label="Robin Assistant Chat Window"
          id="ask-robin-modal"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[600px] max-h-[90vh] bg-[#FFFDF7] rounded-2xl shadow-2xl border-2 border-[#C9A227]/40 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-[#1F4B34] text-[#FFFDF7] px-4 py-3.5 flex items-center justify-between border-b border-[#C9A227]/30 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#C9A227] overflow-hidden bg-[#123424] shrink-0">
                <img
                  src={siteImages.robin_mascot}
                  alt="Robin the assistant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-lg text-[#FFFDF7] leading-none">
                    Ask Robin
                  </h3>
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#123424] text-[#C9A227] px-2 py-0.5 rounded-full border border-[#C9A227]/30">
                    Quote Assistant
                  </span>
                </div>
                <p className="text-xs text-[#F6EFDD]/80 font-body mt-0.5">
                  ADD Gardening &bull; £21.50/hr flat rate
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                id="toggle-quote-form-btn"
                onClick={() => setShowQuoteFormSummary(!showQuoteFormSummary)}
                title="Direct quote details"
                className="p-1.5 rounded-lg text-[#F6EFDD]/80 hover:text-[#C9A227] hover:bg-[#123424]/50 transition"
              >
                <Wrench className="w-4 h-4" />
              </button>
              <button
                type="button"
                id="close-robin-chat-btn"
                onClick={onClose}
                className="p-1.5 rounded-lg text-[#F6EFDD]/80 hover:text-[#FFFDF7] hover:bg-[#123424] transition cursor-pointer"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subheader status bar */}
          <div className="bg-[#123424] px-4 py-1.5 flex items-center justify-between text-[11px] text-[#F6EFDD]/75 shrink-0 border-b border-[#C9A227]/20">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Fully Insured &bull; DBS-Checked
            </span>
            <a
              href={`tel:${BUSINESS_INFO.primaryPhone}`}
              className="text-[#C9A227] hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              {BUSINESS_INFO.primaryPhone}
            </a>
          </div>

          {/* Quick quote summary toggle view (if active) */}
          {showQuoteFormSummary ? (
            <div className="flex-1 p-4 overflow-y-auto bg-[#F6EFDD]/30 text-xs">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1F4B34]/15">
                <span className="font-semibold text-[#1F4B34] text-sm">Quote Details Collected</span>
                <button
                  type="button"
                  onClick={() => setShowQuoteFormSummary(false)}
                  className="text-xs text-[#C9A227] underline"
                >
                  Return to Chat
                </button>
              </div>

              <form onSubmit={handleManualQuoteSubmit} className="space-y-3">
                <div>
                  <label className="block text-[#1F4B34] font-semibold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={leadData.fullName}
                    onChange={(e) => setLeadData({ ...leadData, fullName: e.target.value })}
                    placeholder="e.g. Margaret Bennett"
                    className="w-full p-2 rounded-lg bg-white border border-[#1F4B34]/20 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[#1F4B34] font-semibold mb-1">Phone or Email</label>
                  <input
                    type="text"
                    required
                    value={leadData.contactMethod}
                    onChange={(e) => setLeadData({ ...leadData, contactMethod: e.target.value })}
                    placeholder="e.g. 07123 456789 or margaret@example.com"
                    className="w-full p-2 rounded-lg bg-white border border-[#1F4B34]/20 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[#1F4B34] font-semibold mb-1">Your Town</label>
                  <input
                    type="text"
                    value={leadData.town}
                    onChange={(e) => setLeadData({ ...leadData, town: e.target.value })}
                    placeholder="e.g. Beccles, Lowestoft, Bungay..."
                    className="w-full p-2 rounded-lg bg-white border border-[#1F4B34]/20 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[#1F4B34] font-semibold mb-1">Service Needed</label>
                  <select
                    value={leadData.services}
                    onChange={(e) => setLeadData({ ...leadData, services: e.target.value })}
                    className="w-full p-2 rounded-lg bg-white border border-[#1F4B34]/20 text-xs"
                  >
                    <option value="">Select a service...</option>
                    <option value="Lawn Care & Grass Cutting">Lawn Care &amp; Grass Cutting</option>
                    <option value="Hedge Trimming & Pruning">Hedge Trimming &amp; Pruning</option>
                    <option value="Garden Tidying & General Maintenance">Garden Tidying &amp; General Maintenance</option>
                    <option value="Planting & Flower/Veg Beds">Planting &amp; Flower/Veg Beds</option>
                    <option value="Fence Painting">Fence Painting</option>
                    <option value="Pressure Washing">Pressure Washing</option>
                    <option value="Pond Cleaning & Maintenance">Pond Cleaning &amp; Maintenance</option>
                    <option value="Flat-Pack Furniture Assembly">Flat-Pack Furniture Assembly</option>
                    <option value="Multiple Jobs">Multiple Jobs Combined</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#1F4B34] font-semibold mb-1">Rough Job Description</label>
                  <textarea
                    rows={2}
                    value={leadData.jobDescription}
                    onChange={(e) => setLeadData({ ...leadData, jobDescription: e.target.value })}
                    placeholder="e.g. Tall boundary hedge needs cutting back and clearing."
                    className="w-full p-2 rounded-lg bg-white border border-[#1F4B34]/20 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[#1F4B34] font-semibold mb-1">Preferred Time to Contact</label>
                  <input
                    type="text"
                    value={leadData.preferredTime}
                    onChange={(e) => setLeadData({ ...leadData, preferredTime: e.target.value })}
                    placeholder="e.g. Tomorrow morning, weekday evenings"
                    className="w-full p-2 rounded-lg bg-white border border-[#1F4B34]/20 text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-xl bg-[#1F4B34] text-[#FFFDF7] font-semibold text-xs hover:bg-[#123424] transition shadow-xs"
                >
                  {isLoading ? "Submitting quote request..." : "Confirm & Send Quote Request"}
                </button>
              </form>
            </div>
          ) : (
            /* Chat message stream */
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F6EFDD]/30">
              {messages.map((m) => {
                const isRobin = m.sender === "robin";
                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${isRobin ? "justify-start" : "justify-end"}`}
                  >
                    {isRobin && (
                      <div className="w-7 h-7 rounded-full bg-[#1F4B34] text-[#C9A227] flex items-center justify-center shrink-0 mt-1 border border-[#C9A227]/50 shadow-xs">
                        <RobinIcon size={16} />
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed shadow-xs ${
                        isRobin
                          ? "bg-[#FFFDF7] text-[#1F2A22] border border-[#1F4B34]/15 rounded-tl-xs"
                          : "bg-[#1F4B34] text-[#FFFDF7] rounded-tr-xs"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{m.text}</p>
                      <div
                        className={`text-[10px] mt-1 text-right ${
                          isRobin ? "text-[#1F2A22]/50" : "text-[#F6EFDD]/60"
                        }`}
                      >
                        {m.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-2 text-xs text-[#1F4B34] italic p-2 bg-white/70 rounded-xl w-max">
                  <RobinIcon size={16} className="animate-bounce" />
                  <span>Robin is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Quick inquiry pills */}
          {!showQuoteFormSummary && (
            <div className="px-3 py-2 bg-[#FFFDF7] border-t border-[#1F4B34]/10 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              <button
                type="button"
                onClick={() => handleSendMessage("What areas do you cover?")}
                className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-[#F6EFDD] hover:bg-[#C9A227]/20 text-[#1F4B34] border border-[#1F4B34]/15 transition"
              >
                Areas covered?
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage("How does the £21.50/hour rate work?")}
                className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-[#F6EFDD] hover:bg-[#C9A227]/20 text-[#1F4B34] border border-[#1F4B34]/15 transition"
              >
                Hourly pricing
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage("I need a quote for hedge trimming.")}
                className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-[#F6EFDD] hover:bg-[#C9A227]/20 text-[#1F4B34] border border-[#1F4B34]/15 transition"
              >
                Hedge trimming quote
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage("Can you assemble flat-pack furniture?")}
                className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-[#F6EFDD] hover:bg-[#C9A227]/20 text-[#1F4B34] border border-[#1F4B34]/15 transition"
              >
                Flat-pack assembly
              </button>
            </div>
          )}

          {/* Input form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#FFFDF7] border-t border-[#1F4B34]/15 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              id="chat-input-field"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Robin a question or request a quote..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#F6EFDD]/50 border border-[#1F4B34]/20 text-xs sm:text-sm text-[#1F2A22] placeholder:text-[#1F2A22]/50 focus:outline-none focus:ring-2 focus:ring-[#1F4B34]"
            />
            <button
              type="submit"
              id="chat-send-btn"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-xl bg-[#1F4B34] text-[#FFFDF7] hover:bg-[#123424] disabled:opacity-40 transition cursor-pointer shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </aside>
      )}
    </>
  );
};
