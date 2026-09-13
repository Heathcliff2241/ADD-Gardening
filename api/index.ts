import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(express.json());

export interface LeadRecord {
  id: string;
  createdAt: string;
  fullName: string;
  contactMethod: string;
  town?: string;
  services: string;
  jobDescription?: string;
  preferredTime?: string;
  transcript?: any[];
  emailStatus: "sent" | "failed" | "not_configured";
}

export const leadsStore: LeadRecord[] = [];

// Lazy Gemini AI instance
const DEFAULT_GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// SMTP configuration helper for Gmail & custom hosts
export function getSmtpConfig() {
  const user = process.env.SMTP_USER || process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const toEmail = process.env.NOTIFICATION_EMAIL || process.env.BUSINESS_EMAIL || "addgardens1@gmail.com";
  const fromHeader = process.env.SMTP_FROM || `"ADD Gardening & Maintenance" <${user || "addgardens1@gmail.com"}>`;

  if (!user || !pass) {
    return null;
  }

  return {
    host,
    port,
    secure,
    user,
    pass,
    toEmail,
    fromHeader,
  };
}

export function createSmtpTransporter(cfg: NonNullable<ReturnType<typeof getSmtpConfig>>) {
  return nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: {
      user: cfg.user,
      pass: cfg.pass,
    },
  });
}

const ROBIN_SYSTEM_INSTRUCTION = `You are Robin, the virtual receptionist and booking assistant for "ADD Gardening & Maintenance Services".
Based in Oulton Broad, Lowestoft, covering Lowestoft, Beccles, Bungay, Great Yarmouth, Hopton, Corton, Pakefield, Kessingland, Loddon, and surrounding Waveney villages.
Business phone: 07538 482844. Email: addgardens1@gmail.com.

CORE POLICIES & VALUES:
- Flat rate: A completely transparent flat rate of £21.50 per hour across all services with no hidden fees or surprise costs.
- Services offered: Lawn mowing and edge trimming, hedge cutting and shaping, garden clearances and tidying, green waste removal, planting and border care, fence painting and preservative application, patio and driveway pressure washing, garden pond clearing/maintenance, and flat-pack furniture assembly.
- Standards: Fully insured (£5M public liability), DBS checked, punctual, tidy, and trusted by hundreds of local homeowners.
- Tone: Friendly, grounded, British, helpful, warm, and professional.
- CRITICAL RULE: NEVER use any emojis or emoticons in your text. Only use clean, professional punctuation.

YOUR INTERACTION GOAL:
1. Greet the customer warmly and answer any questions regarding pricing (£21.50/hr), coverage areas, or services.
2. Inquire what job they need help with.
3. Once they explain their needs, gently ask for:
   - Their name
   - Best phone number or email address
   - Town or village
   - Rough job size or preferred day/time
4. When you have collected the essential contact details (name and contact method) and their job request, provide a warm summary:
   "Thanks, that is everything I need. The team will contact you shortly at [contact] to confirm your quote and schedule."
5. At the very end of your response, append the hidden machine-readable tag on its own line:
[QUOTE_DATA: {"fullName":"Customer Name","contactMethod":"Phone or Email","town":"Town","services":"Service Name","jobDescription":"Description of work","preferredTime":"Preferred timing"}]`;

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "ADD Gardening & Maintenance Services API",
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    geminiModel: DEFAULT_GEMINI_MODEL,
    smtpConfigured: Boolean(getSmtpConfig()),
    timestamp: new Date().toISOString(),
  });
});

// Chat endpoint (supports both { message, history } and { messages, currentLeadData })
app.post("/api/chat", async (req, res) => {
  try {
    let userMessage = "";
    let formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    // Support payload format 1: { message, history }
    if (typeof req.body?.message === "string") {
      userMessage = req.body.message.trim();
      if (Array.isArray(req.body.history)) {
        formattedContents = req.body.history.map((item: any) => {
          const role = item.role === "assistant" || item.role === "model" || item.sender === "robin" ? "model" : "user";
          let text = "";
          if (typeof item.text === "string") text = item.text;
          else if (Array.isArray(item.parts) && item.parts[0]?.text) text = item.parts[0].text;
          else if (typeof item.content === "string") text = item.content;
          return {
            role,
            parts: [{ text }],
          };
        });
      }
      formattedContents.push({
        role: "user",
        parts: [{ text: userMessage }],
      });
    }
    // Support payload format 2: { messages: [{ sender, text }] }
    else if (Array.isArray(req.body?.messages) && req.body.messages.length > 0) {
      const msgs = req.body.messages;
      formattedContents = msgs.map((m: { sender: string; text: string }) => ({
        role: m.sender === "robin" || m.sender === "model" ? "model" : "user",
        parts: [{ text: m.text }],
      }));
      userMessage = msgs[msgs.length - 1].text;
    } else {
      return res.status(400).json({ error: "Invalid request. Provide 'message' or 'messages' array." });
    }

    const ai = getAI();

    if (ai) {
      let replyText = "";
      const modelsToTry = [DEFAULT_GEMINI_MODEL, "gemini-3.6-flash", "gemini-3.5-flash", "gemini-3.8-flash"];

      for (const modelName of modelsToTry) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: formattedContents,
            config: {
              systemInstruction: ROBIN_SYSTEM_INSTRUCTION,
              temperature: 0.7,
            },
          });
          replyText = response.text || "";
          if (replyText) break;
        } catch (modelErr: any) {
          console.warn(`[GEMINI] Model '${modelName}' call failed: ${modelErr?.message}. Retrying next model...`);
        }
      }

      if (!replyText) {
        replyText = "Hello! Robin here from ADD Gardening & Maintenance Services. How can I help with your garden or home maintenance today?";
      }

      // Extract machine-readable lead data from either tag style
      let extractedLead: any = null;
      let cleanReply = replyText;

      const quoteMatch = replyText.match(/\[QUOTE_DATA:\s*({[\s\S]*?})\]/) || replyText.match(/<<<QUOTE_DATA:\s*({[\s\S]*?})>>>/);
      const bookingMatch = replyText.match(/\[BOOKING_DATA:\s*({[\s\S]*?})\]/);

      if (quoteMatch) {
        try {
          extractedLead = JSON.parse(quoteMatch[1]);
          cleanReply = replyText.replace(quoteMatch[0], "").trim();
        } catch {
          // Ignore JSON parse error
        }
      } else if (bookingMatch) {
        try {
          const bData = JSON.parse(bookingMatch[1]);
          extractedLead = {
            fullName: bData.customerName || bData.fullName || "",
            contactMethod: bData.customerEmail || bData.phone || "",
            services: bData.service || "General Maintenance",
            jobDescription: bData.notes || bData.breed || "",
            preferredTime: bData.time || "",
            town: bData.town || "Lowestoft area",
          };
          cleanReply = replyText.replace(bookingMatch[0], "").trim();
        } catch {
          // Ignore JSON parse error
        }
      }

      // Return both text and reply for full frontend compatibility
      return res.json({
        text: cleanReply,
        reply: cleanReply,
        extractedLead,
      });
    } else {
      // Graceful fallback if GEMINI_API_KEY is not configured
      const lower = userMessage.toLowerCase();
      let fallbackText = "";

      if (lower.includes("rate") || lower.includes("price") || lower.includes("cost") || lower.includes("how much") || lower.includes("hourly")) {
        fallbackText = "Our pricing is completely clear and upfront: a flat £21.50 per hour across all our services, with no hidden costs or callout fees. For larger jobs, we give you an estimated number of hours before starting. Would you like to request a quote for a specific job?";
      } else if (lower.includes("area") || lower.includes("cover") || lower.includes("location") || lower.includes("town") || lower.includes("where")) {
        fallbackText = "We are mobile and based in Oulton Broad, Lowestoft. We cover Lowestoft, Oulton Broad, Pakefield, Hopton, Corton, Bungay, Poringland, Loddon, Beccles, Great Yarmouth, Oulton, Hempnall, Long Stratton, Harleston, and Gorleston. Which town are you in?";
      } else if (lower.includes("quote") || lower.includes("book") || lower.includes("hire") || lower.includes("contact")) {
        fallbackText = "I would be glad to help arrange that. To get your quote sorted for the team, what is your name, town, and the best phone number or email to reach you on?";
      } else {
        fallbackText = "Hello! I am Robin, the assistant for ADD Gardening & Maintenance Services. We cover lawns, hedges, ponds, fences, pressure washing, and flat-pack assembly at £21.50/hr across Lowestoft and surrounding towns. What job can we help you with today?";
      }

      return res.json({
        text: fallbackText,
        reply: fallbackText,
        extractedLead: null,
      });
    }
  } catch (err: any) {
    console.error("Error in /api/chat:", err);
    return res.status(500).json({
      text: "Sorry, I had a brief connection issue. Please feel free to give our team a call on 07538 482844 or email addgardens1@gmail.com.",
      reply: "Sorry, I had a brief connection issue. Please feel free to give our team a call on 07538 482844 or email addgardens1@gmail.com.",
      error: err?.message,
    });
  }
});

// Quote and booking submission helper
async function handleQuoteSubmission(req: express.Request, res: express.Response) {
  try {
    const fullName = req.body?.fullName || req.body?.customerName || "Customer";
    const contactMethod = req.body?.contactMethod || req.body?.phone || req.body?.customerEmail || "Not provided";
    const town = req.body?.town || "Lowestoft area";
    const services = req.body?.services || req.body?.service || "Gardening & Maintenance";
    const jobDescription = req.body?.jobDescription || req.body?.notes || "No description provided";
    const preferredTime = req.body?.preferredTime || req.body?.time || "Flexible";
    const transcript = req.body?.transcript || [];

    const newLead: LeadRecord = {
      id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      createdAt: new Date().toISOString(),
      fullName,
      contactMethod,
      town,
      services,
      jobDescription,
      preferredTime,
      transcript,
      emailStatus: "not_configured",
    };

    let emailSent = false;
    const smtp = getSmtpConfig();

    if (smtp) {
      try {
        const transporter = createSmtpTransporter(smtp);

        const transcriptHtml = Array.isArray(transcript) && transcript.length > 0
          ? `<div style="margin-top: 15px; padding: 12px; background: #f9f9f9; border-radius: 8px; font-size: 13px;">
              <strong>Robin Chat Summary:</strong><br/>
              ${transcript.map((m: any) => `<strong>${m.sender || m.role}:</strong> ${m.text}`).join("<br/>")}
            </div>`
          : "";

        const emailHtml = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1F2A22; max-width: 600px; border: 1px solid #1F4B34; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #1F4B34; color: #FFFDF7; padding: 20px 24px;">
              <h2 style="margin: 0; font-size: 22px; color: #C9A227;">New Quote Inquiry Received</h2>
              <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">ADD Gardening & Maintenance Services</p>
            </div>
            <div style="padding: 24px; background-color: #FFFDF7;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 140px; color: #1F4B34;">Customer Name:</td><td>${fullName}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1F4B34;">Contact Info:</td><td><a href="tel:${contactMethod}" style="color: #1F4B34; font-weight: bold;">${contactMethod}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1F4B34;">Town / Village:</td><td>${town}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1F4B34;">Service:</td><td>${services}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1F4B34;">Rate:</td><td>£21.50 / hour flat rate</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1F4B34;">Job Details:</td><td>${jobDescription}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #1F4B34;">Preferred Timing:</td><td>${preferredTime}</td></tr>
              </table>
              ${transcriptHtml}
            </div>
            <div style="background-color: #F6EFDD; padding: 14px 24px; font-size: 12px; color: #1F2A22;">
              Sent via ADD Gardening &bull; Mobile service covering Lowestoft & surrounding Waveney villages.
            </div>
          </div>
        `;

        await transporter.sendMail({
          from: smtp.fromHeader,
          to: smtp.toEmail,
          subject: `New Quote Request: ${fullName} (${town}) - ADD Gardening`,
          text: `New Quote Request from ${fullName}\nContact: ${contactMethod}\nTown: ${town}\nService: ${services}\nDetails: ${jobDescription}\nTiming: ${preferredTime}`,
          html: emailHtml,
        });

        // If contact method is an email address, send confirmation to customer
        if (contactMethod.includes("@")) {
          try {
            await transporter.sendMail({
              from: smtp.fromHeader,
              to: contactMethod,
              subject: "We received your quote request - ADD Gardening & Maintenance Services",
              html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1F2A22; max-width: 580px; padding: 24px; border: 1px solid #1F4B34; border-radius: 12px; background-color: #FFFDF7;">
                  <h2 style="color: #1F4B34; margin-top: 0;">Thank you, ${fullName}!</h2>
                  <p>We have received your quote inquiry for <strong>${services}</strong> in <strong>${town}</strong>.</p>
                  <p>Our standard flat rate is <strong>£21.50 per hour</strong> with no hidden callout charges.</p>
                  <p>Our team will review your details and contact you shortly at <strong>${contactMethod}</strong> to confirm your job details and schedule a suitable time.</p>
                  <hr style="border: 0; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
                  <p style="font-size: 13px; color: #666; margin-bottom: 0;">
                    Need immediate assistance? Call us directly on <strong>07538 482844</strong> or email <strong>addgardens1@gmail.com</strong>.<br/>
                    ADD Gardening & Maintenance Services &bull; Lowestoft & Waveney
                  </p>
                </div>
              `,
            });
          } catch (custErr) {
            console.warn("Could not deliver customer confirmation email:", custErr);
          }
        }

        emailSent = true;
        newLead.emailStatus = "sent";
      } catch (mailErr: any) {
        console.error("Nodemailer SMTP sending error:", mailErr);
        newLead.emailStatus = "failed";
      }
    }

    leadsStore.unshift(newLead);

    return res.status(201).json({
      success: true,
      leadId: newLead.id,
      emailSent,
      lead: newLead,
      message: "Quote request saved successfully.",
    });
  } catch (err: any) {
    console.error("Error in quote submission:", err);
    return res.status(500).json({ error: "Failed to submit quote request.", details: err?.message });
  }
}

// Map both /api/quote and /api/book
app.post("/api/quote", handleQuoteSubmission);
app.post("/api/book", handleQuoteSubmission);

// Admin endpoints
app.get("/api/admin/leads", (req, res) => {
  const adminKey = req.headers["x-admin-code"] || req.query.key || req.query.code;
  const expectedKey = process.env.ADMIN_ACCESS_CODE || "addgardens2026";

  if (adminKey !== expectedKey) {
    return res.status(401).json({ error: "Unauthorized. Enter the correct admin access code." });
  }

  return res.json({
    count: leadsStore.length,
    leads: leadsStore,
  });
});

app.get("/api/admin/smtp-status", (req, res) => {
  const adminKey = req.headers["x-admin-code"] || req.query.key || req.query.code;
  const expectedKey = process.env.ADMIN_ACCESS_CODE || "addgardens2026";

  if (adminKey !== expectedKey) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  const cfg = getSmtpConfig();
  return res.json({
    configured: Boolean(cfg),
    host: cfg?.host || null,
    port: cfg?.port || null,
    secure: cfg?.secure || null,
    recipientEmail: cfg?.toEmail || "addgardens1@gmail.com",
    senderUser: cfg?.user ? `${cfg.user.substring(0, 3)}***@***` : null,
  });
});

app.post("/api/admin/smtp-test", async (req, res) => {
  const adminCode = req.headers["x-admin-code"] || req.query.code || req.query.key || req.body?.adminCode;
  const expectedCode = process.env.ADMIN_ACCESS_CODE || "addgardens2026";

  if (adminCode !== expectedCode) {
    return res.status(401).json({ error: "Unauthorized. Enter the correct admin code." });
  }

  const smtpConfig = getSmtpConfig();
  if (!smtpConfig) {
    return res.status(400).json({
      success: false,
      configured: false,
      message: "Gmail SMTP is not configured yet. Set SMTP_USER and SMTP_PASS (or GMAIL_USER and GMAIL_APP_PASSWORD) in your environment secrets.",
      guide: {
        host: "smtp.gmail.com",
        port: 465,
        userNeeded: !Boolean(process.env.SMTP_USER || process.env.GMAIL_USER),
        passNeeded: !Boolean(process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD),
        instructions: "1. Turn on 2-Step Verification on your Google Account. 2. Go to https://myaccount.google.com/apppasswords. 3. Generate a 16-character App Password. 4. Set SMTP_USER and SMTP_PASS in Settings.",
      },
    });
  }

  try {
    const transporter = createSmtpTransporter(smtpConfig);
    await transporter.verify();

    const testRecipient = req.body?.recipient || smtpConfig.toEmail;
    const sendResult = await transporter.sendMail({
      from: smtpConfig.fromHeader,
      to: testRecipient,
      subject: "ADD Gardening: Gmail SMTP Connection Verified",
      text: `Success! Your Gmail SMTP connection (smtp.gmail.com:${smtpConfig.port}) via Nodemailer is functioning correctly.\n\nSent at: ${new Date().toISOString()}`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; color: #1F2A22; max-width: 500px; border: 2px solid #1F4B34; border-radius: 10px; background-color: #FFFDF7;">
          <h2 style="color: #1F4B34; margin-top: 0;">ADD Gardening &bull; SMTP Verified!</h2>
          <p>This confirms that your <strong>Gmail SMTP connection</strong> via Nodemailer is active and authenticated.</p>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 16px 0;">
            <tr><td style="padding: 4px 0; font-weight: bold;">Host:</td><td>${smtpConfig.host}</td></tr>
            <tr><td style="padding: 4px 0; font-weight: bold;">Port:</td><td>${smtpConfig.port} (${smtpConfig.secure ? 'SSL' : 'TLS'})</td></tr>
            <tr><td style="padding: 4px 0; font-weight: bold;">From:</td><td>${smtpConfig.user}</td></tr>
            <tr><td style="padding: 4px 0; font-weight: bold;">To:</td><td>${testRecipient}</td></tr>
          </table>
          <p style="color: #666; font-size: 12px; margin-bottom: 0;">Sent via the ADD Gardening Owner Portal diagnostic tool.</p>
        </div>
      `,
    });

    return res.json({
      success: true,
      configured: true,
      message: `Successfully connected to Gmail SMTP (${smtpConfig.host}:${smtpConfig.port}) and delivered test message to ${testRecipient}!`,
      messageId: sendResult.messageId,
    });
  } catch (err: any) {
    console.error("[SMTP DIAGNOSTIC ERROR]", err);
    return res.status(500).json({
      success: false,
      configured: true,
      error: err?.message || "Unknown SMTP error",
      code: err?.code,
      tip: err?.code === "EAUTH"
        ? "Authentication failed: Ensure you are using a 16-character Google App Password (not your standard Gmail login password). Requires 2-Step Verification enabled at myaccount.google.com/apppasswords."
        : "Connection failed. Please check host, port, or internet firewall.",
    });
  }
});

export default app;
