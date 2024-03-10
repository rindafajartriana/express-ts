// src/routes/userRoutes.ts
import * as express from "express";
import {
  getListController,
  getListFromExternalController,
  getListJoinController,
  postCreateHeaderDetailController,
  patchUpdateHeaderDetailController,
  deleteHeaderDetailController,
} from "../controllers/index";
import * as jwt from "jsonwebtoken";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

// Generate TOKEN
router.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { username: username };
  const accessToken = jwt.sign(user, process.env.JWT_SECRET as string);
  res.json({ accessToken: accessToken });
});

router.get("/list", authenticateToken, getListController); // SOAL NO. 1
router.get("/list_concat", authenticateToken, getListFromExternalController);
// CRUD SOAL NO. 7 & SOAL NO. 8
router.get("/list_headerdetail", authenticateToken, getListJoinController);
router.post(
  "/simpan_headerdetail",
  authenticateToken,
  postCreateHeaderDetailController
);
router.patch(
  "/update_headerdetail",
  authenticateToken,
  patchUpdateHeaderDetailController
);
router.delete(
  "/delete_headerdetail",
  authenticateToken,
  deleteHeaderDetailController
);
// END NO. 7 & NO. 8

export default router;
