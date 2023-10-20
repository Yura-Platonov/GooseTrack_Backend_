import express from "express";
import reviewController from "../../controllers/review-controller.js";

import * as reviewsSchemas from "../../models/reviews.js"

import { validateBody } from "../../decorators/index.js";

import authenticate from "../../middleware/authenticate.js";

const reviewsRouter = express.Router();

const reviewsAddValidate = validateBody(reviewsSchemas.reviewsAddCommentSchema)
const reviewsUpdateValidate = validateBody(
  reviewsSchemas.reviewsUpdateCommentSchema
);


reviewsRouter.get('/', reviewController.getReview)
reviewsRouter.get('/own', authenticate, reviewController.getOwnReview)
reviewsRouter.post('/own', authenticate,reviewsAddValidate, reviewController.addReview)
reviewsRouter.patch("/own", authenticate, reviewsUpdateValidate, reviewController.editingReview);
reviewsRouter.delete("/own", authenticate, reviewController.deleteReview);

export default reviewsRouter;