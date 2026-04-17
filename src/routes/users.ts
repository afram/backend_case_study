import { Router } from "express";
import prisma from "../lib/db";
import { authenticate, requireAdmin } from "../middleware/auth";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { email, name, password, role } = req.body;

    const user = await prisma.user.create({
      data: { email, name, password, role },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id as string },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id as string },
    });

    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
