import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";

import User from "../models/User.js";
import { HttpError, sendEmail } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";
import emailVerify from "../views/emailVerify.js";
import { nanoid } from "nanoid";
const { JWT_SECRET, BASE_URL, FRONTEND_URL } = process.env;

const register = async (req, res) => {
  const { email, password, username } = req.body;
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

  const urlVerify = `${BASE_URL}/api/auth/verify/${verificationToken}`;

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: emailVerify(urlVerify, email, username),
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
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
  const username = user.username;
  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const urlVerify = `${BASE_URL}/api/auth/verify/${user.verificationToken}`;

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: emailVerify(urlVerify, email, username),
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
      id: user._id,
      email: user.email,
      theme: user.theme,
      username: user.username,
      birthday: user.birthday,
      phone: user.phone,
      skype: user.skype,
      avatarURL: user.avatarURL,
    },
  });
};

const getCurrent = (req, res) => {
  const { _id, email, username, birthday, theme, phone, skype, avatarURL } =
    req.user;

  res.json({
    id: _id,
    email,
    username,
    theme,
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
    const {avatarURL} = req.body;
    await User.findByIdAndUpdate(_id, { avatarURL, ...req.body });
  }

  await User.findByIdAndUpdate(_id, { ...req.body });
  const user = await User.findById(_id);
  res.json({
    email: user.email,
    username: user.username,
    theme: user.theme,
    birthday: user.birthday,
    phone: user.phone,
    skype: user.skype,
    avatarURL: user.avatarURL,
  });
};

const updateTheme = async (req, res) => {
   const { _id } = req.user;
  const { theme } = req.body;
  await User.findByIdAndUpdate(_id, { theme });

  res.status(200).json({ theme });
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
  updateTheme: ctrlWrapper(updateTheme),
};
