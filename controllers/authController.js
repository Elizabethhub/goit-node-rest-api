import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";

import gravatar from "gravatar";
import Jimp from "jimp";

import * as authServices from "../services/authServices.js";
import * as userServices from "../services/userServices.js";

import ctrlWrapper from "../decorators/ctrlWrapper.js";

import HttpError from "../helpers/HttpError.js";

const contactsDir = path.resolve("public", "avatars");

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email } = req.body;
  const user = await userServices.findUser({ email });
  if (user) {
    throw HttpError(409, "email already used");
  }
  const avatarURL = gravatar.url(email);
  const newUser = await authServices.signup({ ...req.body, avatarURL });
  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
    subscription: newUser.subscription,
    avararURL: avatarURL,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid"); //"Email invalid"
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid"); //"Password invalid")
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await authServices.setToken(user._id, token);

  res.json({
    token,
    user: { email, subscription: user.subscription },
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await authServices.setToken(_id);

  res.json({
    message: "Signout success",
  });
};

const getCurrent = async (req, res) => {
  const { email, username, subscription } = req.user;
  res.json({
    email,
    username,
    subscription,
  });
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  const result = await authServices.setSubscription(_id, subscription);
  res.json(result);
};

const updateAvatar = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  try {
    const { _id } = req.user;
    const updatedFile = await Jimp.read(oldPath);
    updatedFile.resize(250, 250).write(oldPath);
    const [avatarExtension] = filename.split(".").reverse();
    const newFileName = path.join(`user_avatar-image_${_id}.${avatarExtension}`);
    const newPath = path.join(contactsDir, newFileName);
    await fs.rename(oldPath, newPath);
    const avatarURL = path.join("avatars", newFileName);
    const result = await authServices.setAvatar(_id, avatarURL);
    res.json(result);
  } catch (error) {
    await fs.unlink(tempStorage);
    throw error;
  }
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
