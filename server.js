import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ name: "Toor AI", status: "online" });
});

app.post("/api/chat", (req, res) => {
  const m = req.body.message;
  if (typeof m !== "string" || !m.trim()) {
    return res.status(400).json({ error: "Message required" });
  }
  const c = m.trim().match(/^(\d+(?:\.\d+)?)\s*([+*/-])\s*(\d+(?:\.\d+)?)$/);
  if (c) {
    const a = Number(c[1]), b = Number(c[3]);
    const r = c[2] === "+" ? a+b : c[2] === "-" ? a-b : c[2] === "*" ? a*b : b === 0 ? "Cannot divide by zero" : a/b;
    return res.json({ reply: String(r), tool: "calculator" });
  }
  res.json({ reply: "Toor AI received: " + m.trim(), tool: null });
});

app.listen(process.env.PORT || 3000, "0.0.0.0", () => console.log("Toor AI ready"));
