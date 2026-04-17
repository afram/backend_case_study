import { Request, Response, NextFunction } from "express";
import prisma from "../lib/db";

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  const userId = req.headers["x-user-id"] as string;

  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  (req as any).user = user;
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;

  if (user.role !== "ADMIN") {
    return res.status(403).json({ error: "Forbidden" });
  }

  next();
}
