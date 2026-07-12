import { Router, type IRouter } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.SESSION_SECRET ?? "fallback-secret";

function verifyToken(authHeader: string | undefined): boolean {
  if (!authHeader?.startsWith("Bearer ")) return false;
  const token = authHeader.slice(7);
  try {
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

const workspaceRoot = process.cwd().endsWith(path.join("artifacts", "api-server"))
  ? path.resolve(process.cwd(), "../..")
  : process.cwd();

const uploadsDir = path.resolve(workspaceRoot, "artifacts/api-server/uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${unique}${ext}`);
  },
});

const imageFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const videoFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const allowed = ["video/mp4", "video/webm", "video/ogg", "video/quicktime", "video/x-msvideo"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed"));
  }
};

const mediaFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
  const imageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
  const videoTypes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime", "video/x-msvideo"];
  if ([...imageTypes, ...videoTypes].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image or video files are allowed"));
  }
};

const uploadImages = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: 10 * 1024 * 1024, files: 10 },
});

const uploadVideo = multer({
  storage,
  fileFilter: videoFilter,
  limits: { fileSize: 200 * 1024 * 1024, files: 1 },
});

const uploadMedia = multer({
  storage,
  fileFilter: mediaFilter,
  limits: { fileSize: 200 * 1024 * 1024, files: 11 },
});

const router: IRouter = Router();

router.get("/uploads/:filename", (req, res): void => {
  const filename = Array.isArray(req.params.filename) ? req.params.filename[0] : req.params.filename;
  const safeName = path.basename(filename);
  const filePath = path.join(uploadsDir, safeName);
  if (!fs.existsSync(filePath)) {
    res.status(404).json({ error: "File not found" });
    return;
  }
  res.sendFile(filePath);
});

router.post("/admin/upload/images", (req, res): void => {
  if (!verifyToken(req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  uploadImages.array("images", 10)(req, res, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    const files = (req.files as Express.Multer.File[]) || [];
    const urls = files.map((f) => `/api/uploads/${f.filename}`);
    res.json({ urls });
  });
});

router.post("/admin/upload/video", (req, res): void => {
  if (!verifyToken(req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  uploadVideo.single("video")(req, res, (err) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }
    res.json({ url: `/api/uploads/${file.filename}` });
  });
});

router.delete("/admin/upload/:filename", (req, res): void => {
  if (!verifyToken(req.headers.authorization)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const filename = Array.isArray(req.params.filename) ? req.params.filename[0] : req.params.filename;
  const safeName = path.basename(filename);
  const filePath = path.join(uploadsDir, safeName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  res.json({ success: true });
});

export default router;
