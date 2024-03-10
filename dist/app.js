"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const index_1 = require("./routes/index");
const multer = require("multer");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware untuk logging permintaan
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use(bodyParser.json());
// Middleware untuk menyertakan header ke setiap respons
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
// ========================FILE UPLOAD=====================
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "upload");
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${file.fieldname}-${Date.now()}${ext}`);
        },
    }),
});
// Endpoint untuk mengunggah file
app.post("/upload", upload.single("file"), (req, res) => {
    // Mengambil informasi file yang diunggah
    const file = req.file;
    if (!file) {
        return res.status(400).json({ message: "No file uploaded." });
    }
    // Memberi respons dengan informasi file yang diunggah
    res.json({
        message: "File uploaded successfully.",
        filename: file.filename,
        path: file.path,
    });
});
// ========================FILE UPLOAD=====================
// Menggunakan userRoutes untuk rute terkait pengguna lainnya
app.use("/knitto", index_1.default);
// Memulai server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
