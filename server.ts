import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import apiRouter from "./src/routes/api.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple In-Memory Cache for Performance Optimization
const cache = new Map<string, { data: any, expiry: number }>();
const CACHE_TTL = 60 * 1000; // 1 minute

function cacheMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.method !== 'GET') return next();
  
  const key = req.originalUrl;
  const cached = cache.get(key);
  
  if (cached && cached.expiry > Date.now()) {
    return res.json(cached.data);
  }
  
  const originalJson = res.json;
  res.json = function(data) {
    cache.set(key, { data, expiry: Date.now() + CACHE_TTL });
    return originalJson.call(this, data);
  };
  
  next();
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Socket.IO Logic
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join a classroom room
    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      // broadcast to others in room
      socket.to(roomId).emit("user-connected", socket.id);

      socket.on("disconnect", () => {
        socket.to(roomId).emit("user-disconnected", socket.id);
      });
      
      // Signaling
      socket.on("offer", (payload) => {
        io.to(payload.target).emit("offer", { ...payload, caller: socket.id });
      });
      socket.on("answer", (payload) => {
        io.to(payload.target).emit("answer", { ...payload, caller: socket.id });
      });
      socket.on("ice-candidate", (incoming) => {
        io.to(incoming.target).emit("ice-candidate", { ...incoming, sender: socket.id });
      });

      // Files
      socket.on("file-share", (fileData) => {
        socket.to(roomId).emit("file-share", fileData);
      });

      // Chat
      socket.on("chat-message", (message) => {
        io.to(roomId).emit("chat-message", message);
      });

      // Whiteboard drawing path
      socket.on("draw", (path) => {
        socket.to(roomId).emit("draw", path);
      });

      socket.on("clear-board", () => {
        socket.to(roomId).emit("clear-board");
      });
    });
  });

  app.use(cors());
  app.use(express.json());

  // API routes
  app.use("/api", cacheMiddleware, apiRouter);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
