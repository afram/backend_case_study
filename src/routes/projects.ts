import { Router } from "express";
import prisma from "../lib/db";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/", authenticate, async (req, res) => {
  try {
    const { name, description } = req.body;
    const user = (req as any).user;

    const project = await prisma.project.create({
      data: { name, description },
    });

    await prisma.projectMember.create({
      data: { userId: user.id, projectId: project.id },
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
});

router.get("/", async (req, res) => {
  const projects = await prisma.project.findMany();

  const result = [];
  for (const project of projects) {
    const memberCount = await prisma.projectMember.count({
      where: { projectId: project.id },
    });
    result.push({ ...project, memberCount });
  }

  res.json(result);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id as string;
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      members: { include: { user: true } },
      requirements: true,
    },
  });

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.json(project);
});

router.put("/:id", authenticate, async (req, res) => {
  const id = req.params.id as string;
  const { name, description, status } = req.body;

  const project = await prisma.project.update({
    where: { id },
    data: { name, description, status },
  });

  res.json(project);
});

router.delete("/:id", authenticate, async (req, res) => {
  const id = req.params.id as string;
  try {
    await prisma.project.delete({
      where: { id },
    });

    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

router.post("/:id/members", authenticate, async (req, res) => {
  const { userId } = req.body;

  const member = await prisma.projectMember.create({
    data: {
      userId: userId,
      projectId: req.params.id as string,
    },
  });

  res.status(201).json(member);
});

router.delete("/:id/members/:userId", authenticate, async (req, res) => {
  await prisma.projectMember.deleteMany({
    where: {
      projectId: req.params.id as string,
      userId: req.params.userId as string,
    },
  });

  res.json({ message: "Member removed" });
});

export default router;
