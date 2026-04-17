import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create users
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Alice Admin",
      password: "admin123",
      role: "ADMIN",
    },
  });

  const member1 = await prisma.user.create({
    data: {
      email: "bob@example.com",
      name: "Bob Builder",
      password: "password123",
      role: "MEMBER",
    },
  });

  const member2 = await prisma.user.create({
    data: {
      email: "carol@example.com",
      name: "Carol Coder",
      password: "password123",
      role: "MEMBER",
    },
  });

  // Create projects
  const project1 = await prisma.project.create({
    data: {
      name: "E-Commerce Platform",
      description: "Build a new e-commerce platform with modern features",
      status: "ACTIVE",
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: "Internal Dashboard",
      description: "Admin dashboard for internal operations",
      status: "ACTIVE",
    },
  });

  // Add members to projects
  await prisma.projectMember.createMany({
    data: [
      { userId: admin.id, projectId: project1.id },
      { userId: member1.id, projectId: project1.id },
      { userId: member2.id, projectId: project1.id },
      { userId: admin.id, projectId: project2.id },
      { userId: member1.id, projectId: project2.id },
    ],
  });

  // Create requirements for project 1
  await prisma.requirement.createMany({
    data: [
      {
        title: "User registration and login",
        description: "Users should be able to register and log in with email and password",
        priority: "HIGH",
        status: "APPROVED",
        projectId: project1.id,
        createdById: admin.id,
      },
      {
        title: "Product catalog",
        description: "Display products with filtering and search",
        priority: "HIGH",
        status: "APPROVED",
        projectId: project1.id,
        createdById: member1.id,
      },
      {
        title: "Shopping cart",
        description: "Add/remove items, update quantities",
        priority: "MEDIUM",
        status: "DRAFT",
        projectId: project1.id,
        createdById: member2.id,
      },
      {
        title: "Payment integration",
        priority: "CRITICAL",
        status: "DRAFT",
        projectId: project1.id,
        createdById: admin.id,
      },
    ],
  });

  // Create requirements for project 2
  await prisma.requirement.createMany({
    data: [
      {
        title: "User management page",
        description: "CRUD operations for managing users",
        priority: "HIGH",
        status: "APPROVED",
        projectId: project2.id,
        createdById: admin.id,
      },
      {
        title: "Analytics dashboard",
        description: "Charts and graphs showing key metrics",
        priority: "MEDIUM",
        status: "DRAFT",
        projectId: project2.id,
        createdById: member1.id,
      },
    ],
  });

  console.log("Seed data created successfully");
  console.log(`Admin user ID: ${admin.id} (use as x-user-id header)`);
  console.log(`Member user ID: ${member1.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
