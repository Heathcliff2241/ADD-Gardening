import type { Request, Response } from "express";
import app, { handleHealthRequest } from "./index.ts";

export default function handler(req: Request, res: Response) {
  if (handleHealthRequest) {
    return handleHealthRequest(req, res);
  }
  return app(req, res);
}
