import express from "express";
import logger from "morgan";
import cors from "cors";
import "dotenv/config";
import swagger from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };

import authRouter from "./routes/api/auth-router.js";
import reviewsRouter from "./routes/api/reviews-router.js";
import taskRouter from "./routes/api/task-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRouter);
app.use("/api/reviews", reviewsRouter);
app.use("/api-docs", swagger.serve, swagger.setup(swaggerDocument));
app.use("/api/task", taskRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
