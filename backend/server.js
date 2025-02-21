const express = require("express");
const { PythonShell } = require("python-shell");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;  // Port for your backend server

// Enable CORS for frontend
app.use(cors());

// Body parser middleware
app.use(bodyParser.json());

// Chat endpoint to handle the requests
app.post("/chat", (req, res) => {
    const prompt = req.body.message;

    // Set up PythonShell to run local_model.py with the prompt
    PythonShell.run('local_model.py', { args: [prompt] }, (err, result) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).send("Error executing Python script");
        }

        // Send the generated text as the response
        res.json({ response: result[0] });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
