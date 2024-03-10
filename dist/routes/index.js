"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/userRoutes.ts
const express = require("express");
const index_1 = require("../controllers/index");
const jwt = require("jsonwebtoken");
const auth_1 = require("../middleware/auth");
const router = express.Router();
// Generate TOKEN
router.post("/login", (req, res) => {
    // Logic to authenticate user
    const username = req.body.username;
    const user = { username: username };
    const accessToken = jwt.sign(user, process.env.JWT_SECRET);
    res.json({ accessToken: accessToken });
});
router.get("/list", auth_1.authenticateToken, index_1.getListController);
router.get("/list_concat", auth_1.authenticateToken, index_1.getListFromExternalController);
router.get("/list_headerdetail", auth_1.authenticateToken, index_1.getListJoinController);
router.post("/simpan_headerdetail", auth_1.authenticateToken, index_1.postCreateHeaderDetailController);
router.patch("/update_headerdetail", auth_1.authenticateToken, index_1.patchUpdateHeaderDetailController);
router.delete("/delete_headerdetail", auth_1.authenticateToken, index_1.deleteHeaderDetailController);
exports.default = router;
