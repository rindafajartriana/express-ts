import * as express from "express";
import { Request, Response, NextFunction } from "express";
import * as bodyParser from "body-parser";
import userRoutes from "./routes/index";
import * as multer from "multer";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(bodyParser.json());

// Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// SOAL NO. 4
// ========================FILE UPLOAD=====================
const upload = multer({
  storage: multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
      cb(null, "upload");
    },
    filename: (req: any, file: any, cb: any) => {
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    },
  }),
});

// Endpoint untuk mengunggah file
app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
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
app.use("/knitto", userRoutes);

// Memulai server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
