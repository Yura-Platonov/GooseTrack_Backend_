import express from "express";
import taskController from "../../controllers/task-controller.js";
import * as taskSchema from "../../models/task.js";

import { validateBody } from "../../decorators/index.js";

import authenticate from "../../middleware/authenticate.js";

const taskRouter = express.Router();

const taskValidate = validateBody(taskSchema.taskSchemaVal);

taskRouter.get("/", authenticate, taskController.getTask);
taskRouter.post("/", authenticate, taskValidate, taskController.addTask);
taskRouter.patch("/:taskId", authenticate, taskController.editTask);
taskRouter.delete("/:taskId", authenticate, taskController.deleteTask);

export default taskRouter;
