// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// const PORT = 5000;  // Ensure it's listening on port 5000

// // Enable CORS for frontend
// app.use(cors());

// // Body parser middleware
// app.use(bodyParser.json());

// // Define POST route for /chat
// app.post("/chat", (req, res) => {
//     const prompt = req.body.message;
//     // Your logic to handle the message
//     res.json({ response: "Standard bathroom remodeling services is $3000" });
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


import { LlamaModel, LlamaContext, LlamaChatSession } from "@llama-node/llama-cpp";
import path from "path";

async function runLlama() {
  // Path to the Llama model file. Adjust as needed.
  const modelPath = path.resolve(process.cwd(), "./models/llama-2-7b-chat.Q4_K_M.gguf");

  // Load the Llama model
  const model = new LlamaModel({ modelPath });

  // Create a Llama context
  const context = new LlamaContext({ model });

  // Create a chat session
  const session = new LlamaChatSession({ context });

  // Interact with the model
  const response = await session.prompt("What is the capital of France?");
  
  console.log(response); // Output the model's response
}

runLlama().catch(console.error);