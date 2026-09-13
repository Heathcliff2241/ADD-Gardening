import type { Request, Response } from "express";
import app, { handleQuoteRequest } from "./index.ts";

export default function handler(req: Request, res: Response) {
  if (handleQuoteRequest) {
    return handleQuoteRequest(req, res);
  }
  return app(req, res);
}
