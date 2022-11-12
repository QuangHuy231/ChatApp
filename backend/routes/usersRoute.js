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
router.put("/setavatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);
router.post("/logout", logOut);
export default router;
