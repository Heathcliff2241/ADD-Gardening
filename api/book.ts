import type { Request, Response } from "express";
import app, { handleBookingRequest } from "./index.ts";

export default function handler(req: Request, res: Response) {
  if (handleBookingRequest) {
    return handleBookingRequest(req, res);
  }
  return app(req, res);
}
