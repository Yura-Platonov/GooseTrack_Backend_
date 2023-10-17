import Reviews from "../models/reviews.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getReview = async (req, res, next) => {
  const allReviews = await Reviews.find();
  res.status(200).json(allReviews);
};

const getOwnReview = async (req, res, next) => {
  const username = req.user.username;
  const userReview = await Reviews.findOne({ name: username });
  if (!userReview) {
    throw HttpError(404, "Review not found for this user");
  }
  res.status(200).json(userReview);
};

const addReview = async (req, res) => {
  const { name, comment, stars } = req.body;
  const newReview = await Reviews.create({ name, comment, stars });
  res.status(201).json(newReview);
};

const editingReview = async (req, res) => {
  const username = req.user.username;
  const updatedComment = req.body.comment;
  const updatedStars = req.body.stars;
  const userReview = await Reviews.findOneAndUpdate(
    { name: username },
    { $set: { comment: updatedComment, stars: updatedStars } },
    { new: true }
  );
  if (!userReview) {
    throw new HttpError(404, "Review not found for this user");
  }
  res.status(200).json(userReview);
};

const deleteReview = async (req, res) => {
  const username = req.user.username;
  const userReview = await Reviews.findOneAndDelete({ name: username });
  if (!userReview) {
    throw new HttpError(404, "Review not found for this user");
  }
  res.status(204).end();
};

export default {
  getReview: ctrlWrapper(getReview),
  getOwnReview: ctrlWrapper(getOwnReview),
  addReview: ctrlWrapper(addReview),
  editingReview: ctrlWrapper(editingReview),
  deleteReview: ctrlWrapper(deleteReview),
};
