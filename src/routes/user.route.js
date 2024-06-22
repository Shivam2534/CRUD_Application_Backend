import { Router } from "express";
import {
  CretaeUser,
  GetUsrById,
  UpdateUserById,
  DeleteUserById,
  FindAllUsers,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/createuser").post(upload.single("avatar"), CretaeUser);
router.route("/getuser/:id").get(GetUsrById);
// router.route("/updateuser/:_id").put(upload.single("avatar"), UpdateUserById);
router.route("/updateuser/:_id").put(UpdateUserById);
router.route("/deleteuser/:_id").delete(DeleteUserById);
router.route("/getallusers").get(FindAllUsers);

export default router;
