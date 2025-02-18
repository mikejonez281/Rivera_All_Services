import { useState } from "react";
import axios from "axios";

function App() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const sendMessage = async () => {
        const res = await axios.post("http://localhost:5000/api/chat", { message });
        setResponse(res.data.reply);
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
