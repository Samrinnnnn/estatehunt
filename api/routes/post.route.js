import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
    console.log("router");  // Logs to the server console
    res.send("Test route hit!");  // Sends a response back to the client
});

export default router;
