import jwt from "jsonwebtoken";
import "dotenv/config";
import httpError from "../helpers/httpError.js";
import { findUserById } from "../services/authServise.js";

const { ACCESS_SECRET_KEY } = process.env;

export const validateToken = async (req, res, next) => {
  const authString = req.headers.authorization;
  if (!authString) {
    return next(httpError(401, "Authorization header not found"));
  }
  try {
    const [bearer, token] = authString.split(" ");
    if (bearer !== "Bearer") {
      return next(httpError(401, "Incorrect authorization type"));
    }
    const { id } = jwt.verify(token, ACCESS_SECRET_KEY);

    const user = await findUserById(id);

    if (!user) {
      return next(httpError(401, "User not found"));
    }

    if (id !== user.id || token !== user.accessToken) {
      return next(httpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(httpError(401, "Authorized token has expired"));
    } else if (error.name === "JsonWebTokenError") {
      return next(httpError(401, "Invalid token"));
    } else {
      return next(httpError(500, "Internal server error"));
    }
  }
};
