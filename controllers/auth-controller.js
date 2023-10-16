import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";

import User from "../models/User.js";
import { HttpError, sendEmail } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import { nanoid } from "nanoid";
const { JWT_SECRET, BASE_URL, FRONTEND_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email, { s: "100", r: "x", d: "retro" });

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    // user: {
    //   email: newUser.email,
    //   subscription: newUser.subscription,
    //   avatarURL,
    // },
    message: "Verification letter was send to you email.",
  });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).redirect(`${FRONTEND_URL}/login`);
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpError(404, "User not found");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id } = user;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });

  res.json({
    token,
    user: {
      email,
    },
  });
};

const getCurrent = (req, res) => {
  const { _id, email, username, birthday, phone, skype, avatarURL } = req.user;

  res.json({
    id: _id,
    email,
    username,
    birthday,
    phone,
    skype,
    avatarURL,
  });
};

const updateUser = async (req, res) => {
  const { _id } = req.user;
  if (req.body.birthday) {
    const currentDate = new Date();
    const birthdayDate = new Date(req.body.birthday);
    if (birthdayDate >= currentDate) {
      throw HttpError(
        400,
        "Birthday must not match or be less than the current date"
      );
    }
  }

  if (req.file) {
    const avatarURL = req.file.path;
    await User.findByIdAndUpdate(_id, { avatarURL, ...req.body });
  }

  await User.findByIdAndUpdate(_id, { ...req.body });
  const user = await User.findById(_id);
  res.json({
    email: user.email,
    name: user.name,
    birthday: user.birthday,
    phone: user.phone,
    skype: user.skype,
    avatarURL: user.avatarURL,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({
    message: "Logout success",
  });
};
export default {
  register: ctrlWrapper(register),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  updateUser: ctrlWrapper(updateUser),
  logout: ctrlWrapper(logout),
};
