import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";
import Joi from "joi";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 250,
  },
  start: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^\d{2}:\d{2}$/.test(value),
      message: "Формат має бути 09:00",
    },
  },
  end: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const timeFormat = /^\d{2}:\d{2}$/;
        return timeFormat.test(value) && value > this.start;
      },
      message: "Формат має бути 09:30 та більше за start часом",
    },
  },
  priority: {
    type: String,
    required: true,
    enum: ["low", "medium", "high"],
  },
  date: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^\d{4}-\d{2}-\d{2}$/.test(value),
      message: "Формат має бути YYYY-MM-DD",
    },
  },
  category: {
    type: String,
    required: true,
    enum: ["to-do", "in-progress", "done"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

taskSchema.post("save", handleSaveError);

taskSchema.pre("findOneAndUpdate", runValidateAtUpdate);

taskSchema.post("findOneAndUpdate", handleSaveError);

export const taskSchemaVal = Joi.object({
  title: Joi.string().max(250).required(),
  start: Joi.string()
    .regex(/^\d{2}:\d{2}$/)
    .required(),
  end: Joi.string()
    .regex(/^\d{2}:\d{2}$/)
    .required(),
  priority: Joi.string().valid("low", "medium", "high").required(),
  date: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  category: Joi.string().valid("to-do", "in-progress", "done").required(),
});

const Task = model("task", taskSchema);
export default Task;
