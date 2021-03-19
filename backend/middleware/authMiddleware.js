import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  console.log("in protect hello");
  console.log(req.headers.authorization);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("token found");
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");
      console.log("user id " + req.user.id);
      console.log("done");
      next();
    } catch (error) {
      console.log("error");
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized,token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token!");
  }
});

const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an Admin.");
  }
});
export { protect, admin };
