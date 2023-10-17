import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";
import Joi from "joi";

const reviewsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    }
})

reviewsSchema.post("save", handleSaveError);

reviewsSchema.pre("findOneAndUpdate", runValidateAtUpdate);

reviewsSchema.post("findOneAndUpdate", handleSaveError);

export const reviewsAddCommentSchema = Joi.object({
    name: Joi.string().required(),
    comment: Joi.string().required(),
    stars: Joi.number().required(),
})

const Reviews = model('reviews', reviewsSchema)

export default Reviews