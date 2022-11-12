import express from "express";
import {
  register,
  login,
  setAvatar,
  getAllUsers,
  logOut,
} from "../controller/usersController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setavatar/:id", setAvatar);
router.get("/allusers", getAllUsers);
router.post("/logout/:id", logOut);
export default router;
