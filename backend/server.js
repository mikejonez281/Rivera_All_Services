const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;  // Ensure it's listening on port 5000

// Enable CORS for frontend
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Define POST route for /chat
app.post("/chat", (req, res) => {
    const prompt = req.body.message;
    // Your logic to handle the message
    res.json({ response: "Your model's response here" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


