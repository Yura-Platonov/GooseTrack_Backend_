import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";
import Joi from "joi";

const reviewsSchema = new Schema({
  avatarURL: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
});

reviewsSchema.post("save", handleSaveError);

reviewsSchema.pre("findOneAndUpdate", runValidateAtUpdate);

reviewsSchema.post("findOneAndUpdate", handleSaveError);

export const reviewsAddCommentSchema = Joi.object({
  name: Joi.string().required(),
  comment: Joi.string().required(),
  stars: Joi.number().required(),
  avatarURL: Joi.string(),
});

export const reviewsUpdateCommentSchema = Joi.object({
  name: Joi.string(),
  comment: Joi.string(),
  stars: Joi.number(),
  avatarURL: Joi.string(),
});

const Reviews = model("reviews", reviewsSchema);

export default Reviews;
