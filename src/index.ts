import express from "express";
import userRoutes from "./routes/users";
import projectRoutes from "./routes/projects";
import requirementRoutes from "./routes/requirements";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/requirements", requirementRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
