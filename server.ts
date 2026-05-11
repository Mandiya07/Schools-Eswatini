import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import crypto from "crypto";
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

  // MTN MoMo initialization
  const MOMO_API_USER = process.env.MOMO_API_USER || "f7ddf49f-f83b-4bd4-8017-4585b721da49";
  const MOMO_API_KEY = process.env.MOMO_API_KEY || "89e40ebd469f4d56b3abd1c321a2c9c9";
  const MOMO_SUB_KEY = process.env.MOMO_SUB_KEY || "fcd8a51259a4452d8f60721ea0dc8355";
  const MOMO_ENV = process.env.MOMO_ENVIRONMENT || "sandbox";
  const MOMO_BASE_URL = "https://sandbox.momodeveloper.mtn.com"; // Change for production e.g. https://proxy.momoapi.mtn.com

  const getMomoToken = async () => {
    if (!MOMO_API_USER || !MOMO_API_KEY || !MOMO_SUB_KEY) {
      throw new Error("MTN MoMo configuration is incomplete. Visit https://momodeveloper.mtn.com/ to get your 'API User', 'API Key', and 'Subscription Key' for the Sandbox environment.");
    }
    const auth = Buffer.from(`${MOMO_API_USER}:${MOMO_API_KEY}`).toString('base64');
    const response = await axios.post(`${MOMO_BASE_URL}/collection/token/`, {}, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Ocp-Apim-Subscription-Key': MOMO_SUB_KEY
      }
    });
    return response.data.access_token;
  };

  // API routes
  app.post("/api/momo/request-to-pay", async (req, res) => {
    try {
      const { resource, phoneNumber } = req.body;
      const token = await getMomoToken();
      const referenceId = crypto.randomUUID();

      // Initiate Request to Pay
      await axios.post(`${MOMO_BASE_URL}/collection/v1_0/requesttopay`, {
        amount: resource.price.toFixed(2),
        currency: "EUR", // Sandbox usually requires EUR even for Eswatini/Africa testing
        externalId: resource.id.substring(0, 10),
        payer: {
          partyIdType: "MSISDN",
          partyId: phoneNumber
        },
        payerMessage: `Payment for ${resource.title}`,
        payeeNote: `Academic Resource: ${resource.id}`
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Reference-Id': referenceId,
          'X-Target-Environment': MOMO_ENV,
          'Ocp-Apim-Subscription-Key': MOMO_SUB_KEY,
          'Content-Type': 'application/json'
        }
      });

      res.json({ referenceId, status: 'pending' });
    } catch (error: any) {
      console.error("MoMo Error:", error.response?.data || error.message);
      res.status(500).json({ error: error.response?.data?.message || error.message });
    }
  });

  app.get("/api/momo/status/:referenceId", async (req, res) => {
    try {
      const { referenceId } = req.params;
      const token = await getMomoToken();

      const response = await axios.get(`${MOMO_BASE_URL}/collection/v1_0/requesttopay/${referenceId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Target-Environment': MOMO_ENV,
          'Ocp-Apim-Subscription-Key': MOMO_SUB_KEY
        }
      });

      res.json(response.data);
    } catch (error: any) {
      console.error("MoMo Status Error:", error.response?.data || error.message);
      res.status(500).json({ error: error.message });
    }
  });

  // eMali mock endpoints
  app.post("/api/emali/request-to-pay", async (req, res) => {
    try {
      const { resource, phoneNumber } = req.body;
      const referenceId = crypto.randomUUID();
      
      // Since Eswatini Mobile eMali API documentation is not publicly available on a developer portal
      // like MTN MoMo, we are mocking the payment initiation for demonstration purposes.
      console.log(`[eMali Mock] Initiating payment for E${resource.price} to number ${phoneNumber}`);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));

      res.json({ referenceId, status: 'pending' });
    } catch (error: any) {
      console.error("eMali Error:", error.message);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/emali/status/:referenceId", async (req, res) => {
    try {
      const { referenceId } = req.params;
      
      console.log(`[eMali Mock] Checking status for ${referenceId}`);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Randomly resolve after some iterations, or just return SUCCESS for mock
      res.json({ status: 'SUCCESSFUL', referenceId });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

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
