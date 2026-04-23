import express from "express";
import { app } from "../server.js";
import { messageController } from "../controllers/messageController.js";

// respond with "hello world" when a GET request is made to the homepage
app.post("/api/message", (_req, res) => {
  messageController.createMessage(_req, res);
});
