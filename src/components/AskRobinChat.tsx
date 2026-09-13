import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, Sparkles, CheckCircle2, Phone, Calendar, RotateCcw, HelpCircle, MapPin } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { RobinIcon } from "./BrandMotifs";
import { BUSINESS_INFO } from "../data/siteData";

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
  isExtractedConfirmation?: boolean;
}

export interface QuoteInquiry {
  id?: string;
  fullName: string;
  contactMethod: string;
  town?: string;
  services?: string;
  jobDescription?: string;
  preferredTime?: string;
  status?: string;
  dateCreated?: string;
}

export interface AskRobinChatProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  openInitially?: boolean;
  initialMessagePrefill?: string;
  clearPrefill?: () => void;
  onQuoteCreated?: (quote: QuoteInquiry) => void;
  onBookingCreated?: (quote: QuoteInquiry) => void;
}

const DEFAULT_WELCOME: ChatMessage = {
  id: "welcome-1",
  role: "model",
  text: "Hello! I am Robin, your virtual assistant for ADD Gardening & Maintenance Services. We provide professional garden care and property maintenance across Lowestoft and surrounding towns at our transparent flat rate of £21.50 per hour.\n\nHow can I help you today? Would you like pricing details, coverage information, or a quick quote for your garden?",
  timestamp: "Just now",
};

const SUGGESTED_QUESTIONS = [
  { label: "Pricing & £21.50 Rate", text: "What are your rates and are there any hidden fees or callout charges?" },
  { label: "Coverage Areas", text: "Which towns and villages do you cover around Lowestoft and Waveney?" },
  { label: "Services Offered", text: "What gardening and maintenance services do you offer?" },
  { label: "Request a Quote", text: "I would like to request a quote for my garden." },
];

export const AskRobinChat: React.FC<AskRobinChatProps> = ({
  isOpen: controlledIsOpen,
  onClose,
  onOpen,
  openInitially = false,
  initialMessagePrefill,
  clearPrefill,
  onQuoteCreated,
  onBookingCreated,
}) => {
  // Support both controlled mode (App.tsx) and internal toggle
  const [internalIsOpen, setInternalIsOpen] = useState(openInitially);
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleOpen = () => {
    if (onOpen) onOpen();
    else setInternalIsOpen(true);
  };

  const handleClose = () => {
    if (onClose) onClose();
    else setInternalIsOpen(false);
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem("add_robin_chat_history");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore parse error
    }
    return [DEFAULT_WELCOME];
  });

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem("add_robin_chat_history", JSON.stringify(messages));
    } catch {
      // Storage full or unavailable
    }
    scrollToBottom();
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        scrollToBottom();
      }, 150);
    }
  }, [isOpen]);

  // Handle external prefill message trigger (e.g. from service pages)
  useEffect(() => {
    if (initialMessagePrefill && isOpen) {
      handleSendMessage(initialMessagePrefill);
      if (clearPrefill) clearPrefill();
    }
  }, [initialMessagePrefill, isOpen]);

  const handleClearChat = () => {
    if (window.confirm("Restart conversation with Robin?")) {
      setMessages([DEFAULT_WELCOME]);
      localStorage.removeItem("add_robin_chat_history");
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Map existing history for backend
      const history = messages.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      let responseText = data.text || data.reply || "";

      // Check for machine readable lead extraction
      let quoteData: QuoteInquiry | null = null;
      const quoteMatch = responseText.match(/\[QUOTE_DATA:\s*({[\s\S]*?})\]/) || responseText.match(/<<<QUOTE_DATA:\s*({[\s\S]*?})>>>/);
      const bookingMatch = responseText.match(/\[BOOKING_DATA:\s*({[\s\S]*?})\]/);

      if (quoteMatch) {
        try {
          const parsed = JSON.parse(quoteMatch[1]);
          quoteData = {
            id: `quote-${Date.now()}`,
            fullName: parsed.fullName || parsed.customerName || "Customer",
            contactMethod: parsed.contactMethod || parsed.phone || parsed.customerEmail || "",
            town: parsed.town || "Lowestoft area",
            services: parsed.services || parsed.service || "Gardening & Maintenance",
            jobDescription: parsed.jobDescription || parsed.notes || "",
            preferredTime: parsed.preferredTime || parsed.time || "Flexible",
            dateCreated: new Date().toISOString(),
          };
          responseText = responseText.replace(quoteMatch[0], "").trim();
        } catch (e) {
          console.error("Failed to parse quote JSON:", e);
        }
      } else if (bookingMatch) {
        try {
          const b = JSON.parse(bookingMatch[1]);
          quoteData = {
            id: `quote-${Date.now()}`,
            fullName: b.customerName || b.fullName || "Customer",
            contactMethod: b.customerEmail || b.phone || "",
            town: b.town || "Lowestoft area",
            services: b.service || "Gardening & Maintenance",
            jobDescription: b.notes || "",
            preferredTime: b.time || "Flexible",
            dateCreated: new Date().toISOString(),
          };
          responseText = responseText.replace(bookingMatch[0], "").trim();
        } catch (e) {
          console.error("Failed to parse booking JSON:", e);
        }
      }

      // Append assistant's message
      const botMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: "model",
        text: responseText || "Thank you for reaching out! How else can I assist with your garden or home maintenance?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      const nextMessages = [...messages, userMessage, botMessage];

      // If a quote was confirmed, submit it and display confirmation card
      if (quoteData && quoteData.fullName && quoteData.contactMethod) {
        try {
          // Save in localStorage
          const savedQuotes = JSON.parse(localStorage.getItem("add_quotes") || "[]");
          savedQuotes.push(quoteData);
          localStorage.setItem("add_quotes", JSON.stringify(savedQuotes));

          // Post to server to send Gmail SMTP notification
          fetch("/api/quote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...quoteData,
              transcript: nextMessages.map((m) => ({ sender: m.role === "user" ? "user" : "robin", text: m.text })),
            }),
          }).catch((err) => console.warn("Quote email dispatch note:", err));

          if (onQuoteCreated) onQuoteCreated(quoteData);
          if (onBookingCreated) onBookingCreated(quoteData);

          // Append dedicated confirmation message
          const confirmationMsg: ChatMessage = {
            id: `confirm-${Date.now()}`,
            role: "model",
            text: `**Quote Request Confirmed!**\n\n**Name:** ${quoteData.fullName}\n**Contact:** ${quoteData.contactMethod}\n${quoteData.town ? `**Town:** ${quoteData.town}\n` : ""}**Service:** ${quoteData.services}\n${quoteData.jobDescription ? `**Details:** ${quoteData.jobDescription}\n` : ""}**Timing:** ${quoteData.preferredTime || "Flexible"}\n\nThe team has received your details and will call or message you shortly at **${quoteData.contactMethod}** to confirm! Thank you for contacting ADD Gardening.`,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isExtractedConfirmation: true,
          };
          nextMessages.push(confirmationMsg);
        } catch (quoteErr) {
          console.error("Quote save error:", quoteErr);
        }
      }

      setMessages(nextMessages);
    } catch (err: any) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "model",
          text: "I am having a brief connection flutter, but you can always reach our team directly at 07538 482844 or addgardens1@gmail.com. We charge £21.50 per hour across Lowestoft and surrounding areas.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to render markdown bold text
  const renderMessageContent = (content: string) => {
    const parts = content.split(/(\*\*.*?\*\*)/g);
    return (
      <div className="space-y-1.5 leading-relaxed">
        {content.split("\n\n").map((paragraph, pIdx) => {
          const pParts = paragraph.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={pIdx}>
              {pParts.map((part, idx) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <strong key={idx} className="font-semibold text-[#1F4B34]">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return part;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpen}
          id="open-robin-chat-btn"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 bg-[#1F4B34] text-[#FFFDF7] px-4 py-3.5 rounded-full shadow-xl border-2 border-[#C9A227] hover:bg-[#123424] transition-colors group cursor-pointer"
          aria-label="Ask Robin Assistant"
        >
          <div className="relative">
            <RobinIcon size={24} className="text-[#C9A227]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C9A227] rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C9A227] rounded-full" />
          </div>
          <div className="text-left pr-1 hidden sm:block">
            <div className="text-xs font-semibold leading-none flex items-center gap-1.5">
              <span>Ask Robin</span>
              <span className="text-[10px] bg-[#C9A227] text-[#1F4B34] font-bold px-1.5 py-0.5 rounded-full">
                £21.50/hr
              </span>
            </div>
            <div className="text-[11px] text-[#F6EFDD]/80 mt-1">Instant Quotes & Rates</div>
          </div>
        </motion.button>
      )}

      {/* Main Chat Dialog Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50 w-[95vw] sm:w-[420px] max-w-lg h-[600px] max-h-[85vh] bg-[#FFFDF7] rounded-2xl shadow-2xl border-2 border-[#1F4B34]/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1F4B34] text-[#FFFDF7] px-4 py-3.5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#123424] border border-[#C9A227] flex items-center justify-center relative">
                  <RobinIcon size={20} className="text-[#C9A227]" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#123424] rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-base leading-none text-[#FFFDF7]">
                      Robin &bull; Virtual Assistant
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-[#C9A227] font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> ADD Gardening &bull; £21.50/hr
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleClearChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-1.5 text-[#F6EFDD]/70 hover:text-[#FFFDF7] hover:bg-[#123424] rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handleClose}
                  title="Close chat"
                  aria-label="Close chat"
                  id="close-robin-chat-btn"
                  className="p-1.5 text-[#F6EFDD]/70 hover:text-[#FFFDF7] hover:bg-[#123424] rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Coverage & Direct Contact Banner */}
            <div className="bg-[#F6EFDD] px-3.5 py-1.5 border-b border-[#1F4B34]/10 flex items-center justify-between text-[11px] text-[#1F2A22]/80">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#1F4B34]" /> Lowestoft & Waveney
              </span>
              <a
                href={`tel:${BUSINESS_INFO.primaryPhone}`}
                className="font-semibold text-[#1F4B34] hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" /> {BUSINESS_INFO.primaryPhone}
              </a>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FFFDF7]">
              {messages.map((m) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                        isUser
                          ? "bg-[#1F4B34] text-[#FFFDF7] rounded-br-none"
                          : m.isExtractedConfirmation
                          ? "bg-emerald-50 border-2 border-emerald-600/30 text-emerald-950 rounded-bl-none"
                          : "bg-[#F6EFDD]/60 border border-[#1F4B34]/15 text-[#1F2A22] rounded-bl-none"
                      }`}
                    >
                      {m.isExtractedConfirmation && (
                        <div className="flex items-center gap-1.5 text-emerald-700 font-bold mb-2 pb-1.5 border-b border-emerald-600/20">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Quote Request Received</span>
                        </div>
                      )}
                      {renderMessageContent(m.text)}
                    </div>
                    <span className="text-[10px] text-[#1F2A22]/40 mt-1 px-1">
                      {m.timestamp}
                    </span>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-2 text-[#1F4B34] text-xs p-2 bg-[#F6EFDD]/40 rounded-xl max-w-[120px] border border-[#1F4B34]/10">
                  <RobinIcon size={14} className="text-[#C9A227] animate-bounce" />
                  <span className="animate-pulse font-medium">Robin thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick suggested chips */}
            {messages.length <= 3 && !isLoading && (
              <div className="p-2.5 bg-[#FFFDF7] border-t border-[#1F4B34]/10 overflow-x-auto flex gap-1.5 no-scrollbar">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q.text)}
                    className="whitespace-nowrap px-2.5 py-1 text-xs rounded-full bg-[#F6EFDD] text-[#1F4B34] hover:bg-[#C9A227]/20 border border-[#1F4B34]/15 transition-colors cursor-pointer flex-shrink-0"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#FFFDF7] border-t border-[#1F4B34]/15 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about rates, lawns, or request a quote..."
                disabled={isLoading}
                className="flex-1 bg-[#F6EFDD]/30 border border-[#1F4B34]/20 rounded-xl px-3.5 py-2.5 text-sm text-[#1F2A22] placeholder-[#1F2A22]/50 focus:outline-none focus:ring-2 focus:ring-[#1F4B34] focus:bg-[#FFFDF7]"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                aria-label="Send message"
                id="send-robin-message-btn"
                className="bg-[#1F4B34] text-[#FFFDF7] p-2.5 rounded-xl hover:bg-[#123424] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center justify-center"
              >
                <Send className="w-4 h-4 text-[#C9A227]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Also export default and alias AskSage to ensure full compatibility
export const AskSage = AskRobinChat;
export default AskRobinChat;
