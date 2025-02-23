import { useState } from "react";
import axios from "axios";

function App() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    // const sendMessage = async () => {
    //     const res = await axios.post("http://localhost:5000/api/chat", { message });
    //     setResponse(res.data.reply);
    // };

    const sendMessage = async () => {
        try {
            console.log("Sending message:", message);  // Debugging log
            const res = await axios.post("http://localhost:5000/chat", { message });
            setResponse(res.data.response);
        } catch (error) {
            console.error("Error sending message:", error);
            if (error.response) {
                console.error("Response Error:", error.response.data);
            }
            if (error.request) {
                console.error("Request Error:", error.request);
            }
        }
    };
    

    return (
        <div className="App">
            <h1>Renovation AI Chat</h1>
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ask about renovations..." />
            <button onClick={sendMessage}>Send</button>
            <p>{response}</p>
        </div>
    );
}

export default App;
