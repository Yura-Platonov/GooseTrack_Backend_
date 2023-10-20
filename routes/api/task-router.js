import express from "express";
import taskController from "../../controllers/task-controller.js";
import * as taskSchema from "../../models/task.js";

import { validateBody } from "../../decorators/index.js";

import authenticate from "../../middleware/authenticate.js";

const taskRouter = express.Router();

const taskValidate = validateBody(taskSchema.taskSchemaVal);
const editValidate = validateBody(taskSchema.editSchemaVal);

taskRouter.get("/", authenticate, taskController.getTask);
taskRouter.post("/", authenticate, taskValidate, taskController.addTask);
taskRouter.patch(
  "/:taskId",
  authenticate,
  editValidate,
  taskController.editTask
);
taskRouter.delete("/:taskId", authenticate, taskController.deleteTask);

export default taskRouter;
