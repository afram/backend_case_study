import { Router } from "express";
import prisma from "../lib/db";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/project/:projectId", authenticate, async (req, res) => {
  const { title, description, priority } = req.body;
  const user = (req as any).user;

  const requirement = await prisma.requirement.create({
    data: {
      title,
      description,
      priority,
      projectId: req.params.projectId as string,
      createdById: user.id,
    },
  });

  res.status(201).json(requirement);
});

router.get("/project/:projectId", async (req, res) => {
  const requirements = await prisma.requirement.findMany({
    where: { projectId: req.params.projectId as string },
  });

  res.json(requirements);
});

router.put("/:id", authenticate, async (req, res) => {
  const { title, description, priority, status } = req.body;

  const requirement = await prisma.requirement.update({
    where: { id: req.params.id as string },
    data: { title, description, priority, status },
  });

  res.json(requirement);
});

router.delete("/:id", authenticate, async (req, res) => {
  await prisma.requirement.delete({
    where: { id: req.params.id as string },
  });

  res.json({ message: "Requirement deleted" });
});

router.patch("/bulk-status", authenticate, async (req, res) => {
  const { ids, status } = req.body;

  for (const id of ids) {
    await prisma.requirement.update({
      where: { id },
      data: { status },
    });
  }

  res.json({ message: `Updated ${ids.length} requirements` });
});

export default router;
