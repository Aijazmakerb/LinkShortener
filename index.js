import dotenv from "dotenv";
import express from "express";
import { connectToDatabase } from "./connect.js";
import { URL } from "./models/url.js";
import router from "./routes/url.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 8001;

connectToDatabase(process.env.SECRET_KEY)
  .then(() => console.log("Connected to database"))
  .catch(() => console.log("Error connecting to Database"));

app.use("/url", router);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(entry.redirectUrl);
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
