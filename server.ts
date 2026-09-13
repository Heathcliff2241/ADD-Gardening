import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";

dotenv.config();

interface LeadRecord {
  id: string;
  createdAt: string;
  fullName: string;
  contactMethod: string;
  town: string;
  services: string;
  jobDescription: string;
  preferredTime?: string;
  transcript: Array<{ sender: "user" | "robin"; text: string; timestamp: string }>;
  emailStatus: "sent" | "failed" | "not_configured";
}

const leadsStore: LeadRecord[] = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Healthcheck
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Lazy Gemini AI instance with telemetry header
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

  // Gmail / SMTP Configuration Helper
  interface SmtpConfig {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
    toEmail: string;
    fromHeader: string;
  }

  function getSmtpConfig(): SmtpConfig | null {
    const user = process.env.SMTP_USER || process.env.GMAIL_USER;
    const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

    if (!user || !pass) {
      return null;
    }

    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465", 10);
    const secure = process.env.SMTP_SECURE !== undefined
      ? process.env.SMTP_SECURE === "true"
      : port === 465;
    const toEmail = process.env.NOTIFICATION_EMAIL || "addgardens1@gmail.com";
    const fromHeader = `"ADD Gardening Quotes" <${user}>`;

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

  function createSmtpTransporter(config: SmtpConfig) {
    return nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });
  }

  const SYSTEM_INSTRUCTION = `You are Robin, the friendly, down-to-earth virtual assistant for ADD Gardening & Maintenance Services.
You are named after the friendly robin bird that appears on the company flyer perched on a garden fence.
You speak like a helpful, honest local neighbor who knows the trade business inside and out.
Tone rules:
- Warm, down-to-earth, plain, direct, approachable.
- No corporate buzzwords ("synergy", "streamline", "supercharge").
- No em dashes (—). Use commas, periods, or standard hyphens.
- Casual but credible.
- Never invent star ratings, reviews, or fake claims.

Business facts to strictly rely upon:
- Business: ADD Gardening & Maintenance Services (Mobile service, based in Oulton Broad, Lowestoft).
- Rate: Flat £21.50 per hour across all services. No hidden costs. Customers know the rate before start. Bigger jobs quoted by estimated hours upfront.
- Trust & Credentials: Fully insured and DBS-checked on every visit.
- Contact: Phone 07538 482844 (secondary: 07498 049003), Email addgardens1@gmail.com.
- Service Area: Mobile team covering Lowestoft, Oulton Broad, Pakefield, Hopton, Corton, Bungay, Poringland, Loddon, Beccles, Great Yarmouth, Oulton, Hempnall, Long Stratton, Harleston, and Gorleston. If asked about nearby villages between these towns, confirm we can usually travel there.
- 8 Core Services:
  1. Grass Cutting & Lawn Care: Regular mowing, striping, mulching, edge strimming, year-round care.
  2. Hedge Trimming & Pruning: Loppers to long-reach pole trimmers for hedges of any height, shrubs and tree pruning, full cleanup.
  3. Garden Tidying & General Maintenance: Seasonal maintenance, weeding, beds, border tidying, autumn leaf clearance.
  4. Planting & Flower/Veg Beds: Establishing flower beds, raised beds, veg plots, plant choice for coastal/Suffolk soil.
  5. Fence Painting: Wood treatment, staining, weatherproofing, extending fence lifespan without hassle.
  6. Pressure Washing: Paths, patios, driveways, moss and grime removal, brings stone back to fresh state.
  7. Pond Cleaning & Maintenance: Equipment and care for koi ponds and garden ponds, filter cleaning, water health.
  8. Flat-Pack Furniture Assembly: Sheds, garden seating, indoor wardrobes, desks, drawers, beds.

Robin's primary job:
1. Answer visitor questions freely and accurately based on the facts above.
2. Confirm whether their town is in the service area.
3. If they express interest in booking or getting a quote, guide them to collect:
   - Full name
   - Phone number or email
   - Town / area
   - Service(s) needed
   - Rough job size or description
   - Preferred day/time to be contacted
4. When all (or essential) details have been gathered, summarize the details and state the handoff confirmation:
   "Thanks, that's everything I need. The team will get back to you at [contact method] to confirm your quote."
5. At the end of your message, if quote details were provided or completed, append a hidden machine-readable tag:
   <<<QUOTE_DATA: {"name": "...", "contact": "...", "town": "...", "service": "...", "jobDescription": "...", "preferredTime": "...", "isComplete": true/false}>>>`;

  // Robin Chat Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages, currentLeadData } = req.body;
      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Messages array required" });
      }

      const ai = getAI();

      if (ai) {
        // Build conversation history for Gemini
        const formattedContents = messages.map((m: { sender: string; text: string }) => ({
          role: m.sender === "robin" ? "model" : "user",
          parts: [{ text: m.text }],
        }));

        // Append lead state reminder if available
        let systemInstructionWithContext = SYSTEM_INSTRUCTION;
        if (currentLeadData) {
          systemInstructionWithContext += `\n\nCurrent collected lead state so far: ${JSON.stringify(currentLeadData)}`;
        }

        let replyText = "";
        try {
          const response = await ai.models.generateContent({
            model: DEFAULT_GEMINI_MODEL,
            contents: formattedContents,
            config: {
              systemInstruction: systemInstructionWithContext,
              temperature: 0.7,
            },
          });
          replyText = response.text || "";
        } catch (modelErr: any) {
          console.warn(`[GEMINI] Model '${DEFAULT_GEMINI_MODEL}' call failed: ${modelErr?.message}. Attempting fallback...`);
          if (DEFAULT_GEMINI_MODEL !== "gemini-3.8-flash") {
            try {
              const fallbackResponse = await ai.models.generateContent({
                model: "gemini-3.8-flash",
                contents: formattedContents,
                config: {
                  systemInstruction: systemInstructionWithContext,
                  temperature: 0.7,
                },
              });
              replyText = fallbackResponse.text || "";
            } catch (fallbackErr: any) {
              console.error("[GEMINI] Fallback to gemini-3.8-flash also failed:", fallbackErr?.message);
              throw modelErr;
            }
          } else {
            throw modelErr;
          }
        }

        if (!replyText) {
          replyText = "Hello! Robin here from ADD Gardening. How can I help with your garden or home maintenance today?";
        }

        // Extract any machine-readable lead data
        let extractedLead = null;
        let cleanReply = replyText;
        const tagMatch = replyText.match(/<<<QUOTE_DATA:\s*({[\s\S]*?})>>>/);
        if (tagMatch) {
          try {
            extractedLead = JSON.parse(tagMatch[1]);
            cleanReply = replyText.replace(tagMatch[0], "").trim();
          } catch {
            // Ignore parse error
          }
        }

        return res.json({
          reply: cleanReply,
          extractedLead,
        });
      } else {
        // Fallback rule-based response engine when GEMINI_API_KEY is not configured
        const lastMsg = messages[messages.length - 1].text.toLowerCase();
        let fallbackReply = "";
        let extracted = currentLeadData || {};

        if (lastMsg.includes("price") || lastMsg.includes("cost") || lastMsg.includes("rate") || lastMsg.includes("how much")) {
          fallbackReply = "Our pricing is completely clear and upfront: a flat £21.50 per hour across all our services, with no hidden costs or surprise fees. For larger jobs, we give you an estimated number of hours before starting. Would you like a quote for a specific job?";
        } else if (lastMsg.includes("area") || lastMsg.includes("cover") || lastMsg.includes("town") || lastMsg.includes("where")) {
          fallbackReply = "We are mobile and based in Oulton Broad, Lowestoft. We cover Lowestoft, Oulton Broad, Pakefield, Hopton, Corton, Bungay, Poringland, Loddon, Beccles, Great Yarmouth, Oulton, Hempnall, Long Stratton, Harleston, and Gorleston. Which town are you in?";
        } else if (lastMsg.includes("quote") || lastMsg.includes("book") || lastMsg.includes("hire") || lastMsg.includes("help with")) {
          fallbackReply = "I'd be glad to help arrange that! To get your quote sorted for the team, what's your name and which town are you located in?";
        } else if (!extracted.name && messages.length <= 3) {
          fallbackReply = "Hello! I'm Robin, the assistant for ADD Gardening & Maintenance Services. We cover lawns, hedges, ponds, fences, pressure washing, and flat-pack assembly at £21.50/hr across Lowestoft and surrounding towns. What job can we help you with?";
        } else {
          fallbackReply = "Thanks for your message! We're fully insured, DBS-checked, and charge £21.50/hour. If you'd like us to confirm your job, could you share your name, town, and phone or email so the team can get back to you with a quote?";
        }

        return res.json({
          reply: fallbackReply,
          extractedLead: null,
        });
      }
    } catch (err: any) {
      console.error("Error in /api/chat:", err);
      return res.status(500).json({
        reply: "Sorry, I had a brief flutter there. Please feel free to give the team a direct call on 07538 482844 or email addgardens1@gmail.com!",
        error: err?.message,
      });
    }
  });

  // Save Lead & Send Email
  app.post("/api/quote", async (req, res) => {
    try {
      const { fullName, contactMethod, town, services, jobDescription, preferredTime, transcript } = req.body;

      if (!fullName || !contactMethod) {
        return res.status(400).json({ error: "Full name and contact method are required" });
      }

      const newLead: LeadRecord = {
        id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
        createdAt: new Date().toISOString(),
        fullName,
        contactMethod,
        town: town || "Not specified",
        services: services || "General inquiry",
        jobDescription: jobDescription || "Not provided",
        preferredTime: preferredTime || "Anytime",
        transcript: transcript || [],
        emailStatus: "not_configured",
      };

      // Nodemailer setup via Gmail SMTP
      const smtpConfig = getSmtpConfig();

      if (smtpConfig) {
        try {
          const transporter = createSmtpTransporter(smtpConfig);

          const transcriptFormatted = (transcript || [])
            .map((t: { sender: string; text: string; timestamp?: string }) => `[${t.sender === "robin" ? "Robin (AI)" : fullName}]: ${t.text}`)
            .join("\n");

          const mailOptions = {
            from: smtpConfig.fromHeader,
            to: smtpConfig.toEmail,
            replyTo: contactMethod.includes("@") ? contactMethod : undefined,
            subject: `New Quote Request: ${fullName} (${town || "Lowestoft area"}) - ADD Gardening`,
            text: `New Quote Request Received via ADD Gardening Website:
--------------------------------------------------
Customer Name: ${fullName}
Contact Method: ${contactMethod}
Town / Area: ${town}
Service Requested: ${services}
Job Description: ${jobDescription}
Preferred Contact Time: ${preferredTime || "Flexible"}
Received At: ${newLead.createdAt}

Full Conversation Transcript:
--------------------------------------------------
${transcriptFormatted || "Direct quote form submission."}
`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1F2A22; background-color: #FFFDF7; border: 1px solid #1F4B34; border-radius: 12px;">
                <div style="background-color: #1F4B34; color: #FFFDF7; padding: 18px 20px; border-radius: 8px 8px 0 0; margin: -24px -24px 20px -24px;">
                  <h2 style="margin: 0; font-size: 20px; color: #FFFDF7;">ADD Gardening &amp; Maintenance</h2>
                  <p style="margin: 4px 0 0 0; font-size: 13px; color: #C9A227; font-weight: 500;">New Quote Request &bull; &pound;21.50/hr Flat Rate</p>
                </div>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5DFD3; font-weight: bold; width: 140px; color: #1F4B34;">Customer Name:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5DFD3; font-size: 15px; font-weight: 600;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5DFD3; font-weight: bold; color: #1F4B34;">Contact Info:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5DFD3;"><strong>${contactMethod}</strong></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5DFD3; font-weight: bold; color: #1F4B34;">Town / Area:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5DFD3;">${town}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5DFD3; font-weight: bold; color: #1F4B34;">Service(s):</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5DFD3; color: #1F4B34; font-weight: 600;">${services}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5DFD3; font-weight: bold; color: #1F4B34;">Job Details:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5DFD3;">${jobDescription}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5DFD3; font-weight: bold; color: #1F4B34;">Preferred Contact:</td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #E5DFD3;">${preferredTime || "Flexible"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; font-weight: bold; color: #1F4B34;">Date &amp; Time:</td>
                    <td style="padding: 10px 0;">${new Date(newLead.createdAt).toLocaleString("en-GB", { timeZone: "Europe/London" })}</td>
                  </tr>
                </table>

                ${transcript && transcript.length > 0 ? `
                  <div style="margin-top: 20px; padding: 16px; background-color: #F6EFDD; border-radius: 8px; border-left: 4px solid #1F4B34;">
                    <h3 style="margin-top: 0; font-size: 14px; color: #1F4B34; font-weight: 600;">Robin AI Chat Transcript:</h3>
                    <div style="font-size: 13px; line-height: 1.6;">
                      ${transcript.map((t: { sender: string; text: string }) => `
                        <p style="margin: 6px 0;"><strong>${t.sender === "robin" ? "Robin (AI)" : fullName}:</strong> ${t.text}</p>
                      `).join("")}
                    </div>
                  </div>
                ` : ""}

                <div style="margin-top: 24px; text-align: center; font-size: 12px; color: #777; border-top: 1px solid #E5DFD3; padding-top: 14px;">
                  Sent via ADD Gardening &amp; Maintenance Website &bull; Mobile service across Lowestoft &amp; Waveney
                </div>
              </div>
            `,
          };

          await transporter.sendMail(mailOptions);
          newLead.emailStatus = "sent";
          console.log(`[EMAIL SENT] Notification email delivered via Gmail SMTP to ${smtpConfig.toEmail} for lead ${fullName}`);
        } catch (emailErr: any) {
          console.error("[EMAIL ERROR] Failed to send email via Gmail SMTP:", emailErr?.message || emailErr);
          newLead.emailStatus = "failed";
        }
      } else {
        console.log(`[LEAD RECORDED] Gmail SMTP credentials not configured (SMTP_USER/SMTP_PASS). Stored lead in memory: ${fullName} (${contactMethod})`);
      }

      leadsStore.unshift(newLead);

      return res.json({
        success: true,
        message: "Thanks, that's everything I need. The team will get back to you to confirm your quote.",
        leadId: newLead.id,
        emailStatus: newLead.emailStatus,
      });
    } catch (err: any) {
      console.error("Error in /api/quote:", err);
      return res.status(500).json({ error: "Failed to process quote request", details: err?.message });
    }
  });

  // Admin Leads endpoint
  app.get("/api/admin/leads", (req, res) => {
    const adminCode = req.headers["x-admin-code"] || req.query.code || req.query.key;
    const expectedCode = process.env.ADMIN_ACCESS_CODE || "addgardens2026";

    if (adminCode !== expectedCode) {
      return res.status(401).json({ error: "Unauthorized. Enter the correct admin code." });
    }

    return res.json({
      leads: leadsStore,
      totalCount: leadsStore.length,
    });
  });

  // Admin SMTP Status endpoint
  app.get("/api/admin/smtp-status", (req, res) => {
    const adminCode = req.headers["x-admin-code"] || req.query.code || req.query.key;
    const expectedCode = process.env.ADMIN_ACCESS_CODE || "addgardens2026";

    if (adminCode !== expectedCode) {
      return res.status(401).json({ error: "Unauthorized. Enter the correct admin code." });
    }

    const smtpConfig = getSmtpConfig();
    const user = process.env.SMTP_USER || process.env.GMAIL_USER;
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "465", 10);
    const toEmail = process.env.NOTIFICATION_EMAIL || "addgardens1@gmail.com";
    const geminiModel = DEFAULT_GEMINI_MODEL;

    return res.json({
      configured: Boolean(smtpConfig),
      host,
      port,
      secure: smtpConfig ? smtpConfig.secure : (port === 465),
      maskedUser: user ? user.replace(/^(.{2})(.*)(@.*)$/, "$1***$3") : null,
      toEmail,
      geminiModel,
      geminiKeySet: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Admin SMTP Test & Connection Diagnostic endpoint
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
          instructions: "1. Turn on 2-Step Verification on your Google Account. 2. Go to https://myaccount.google.com/apppasswords. 3. Generate a 16-character App Password. 4. Set SMTP_USER and SMTP_PASS.",
        },
      });
    }

    try {
      const transporter = createSmtpTransporter(smtpConfig);
      // Verify handshake and credentials
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

  // Vite middleware in dev / static in prod
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ADD Gardening Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
