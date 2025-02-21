const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;  // Port for your backend server

// Enable CORS for frontend
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Chat endpoint to handle the requests
app.post("/chat", async (req, res) => {
    try {
        const prompt = req.body.message;
        const response = await axios.post("http://localhost:5000/generate", { prompt });
        res.json({ response: response.data });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Server error");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
