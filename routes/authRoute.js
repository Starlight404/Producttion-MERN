import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
// router object
const router = express.Router();
// Register || Method POST

router.post("/register", registerController);

// login || POST
router.post("/login", loginController);

// Forgot password || POST

router.post("/forgot-password", forgotPasswordController);

// test
router.get("/test", requireSignIn, isAdmin, testController);

// protected  route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// protected admin auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update profile
router.put("/profile", requireSignIn, updateProfileController);

//  Orders
router.get("/orders", requireSignIn, getOrdersController);

// All Orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status Update
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);

export default router;
