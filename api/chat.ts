import type { Request, Response } from "express";
import app, { handleChatRequest } from "./index.ts";

export default function handler(req: Request, res: Response) {
  if (handleChatRequest) {
    return handleChatRequest(req, res);
  }
  return app(req, res);
}
