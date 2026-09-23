require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const Url = require("./models/url");
const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});
app.post("/shorten", async (req, res) => {
    try {
        const { originalUrl } = req.body;

        const shortCode = Math.random().toString(36).substring(2, 8);

        const newUrl = await Url.create({
            originalUrl: originalUrl,
            shortCode: shortCode
        });

        res.json(newUrl);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get("/:shortCode", async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode: shortCode });

        if (!url) {
            return res.status(404).json({
                message: "Short URL not found"
            });
        }

        res.redirect(url.originalUrl);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});