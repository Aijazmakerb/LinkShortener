import generate from "shortid";
import { URL } from "../models/url.js";

export async function handleGenerateNewShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "Url required" });
  const shortId = generate();
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortId });
}
