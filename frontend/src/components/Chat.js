import React, { useState } from "react";
import axios from "axios";

const Chat = () => {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");

    const sendMessage = async () => {
        try {
            const res = await axios.post("http://localhost:5000/chat", { message });
            setResponse(res.data.response);
        } catch (error) {
            console.error("Error sending message:", error.response || error.message);
        }
    };
   

    return (
        <div>
            <h1>Chat with the Model</h1>
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Ask a question..." 
            />
            <button onClick={sendMessage}>Send</button>
            <p>{response}</p>
        </div>
    );
};

export default Chat;


