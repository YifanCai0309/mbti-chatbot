import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [mbtiType, setMbtiType] = useState("");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleChat = async () => {
    try {
      const res = await axios.post("http://localhost:3001", {
        type: mbtiType,
        question,
      });
      setResponse(res.data.response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>MBTI Chatbot</h1>
      <div>
        <label>
          MBTI Type:
          <input
            type="text"
            value={mbtiType}
            onChange={(e) => setMbtiType(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleChat}>Ask</button>

      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
}

export default App;
