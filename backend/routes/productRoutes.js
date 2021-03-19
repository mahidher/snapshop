import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../middleware/authMiddleware.js";
var router = express.Router();

import {
  getProducts,
  getProductById,
  deletProductById,
  createProductById,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";

router.route("/").post(protect, admin, createProductById).get(getProducts);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, deletProductById)
  .put(protect, admin, updateProduct);

router.route("/:id/reviews").post(protect, createProductReview);
export default router;
