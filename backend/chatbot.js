const express = require("express");
const bodyParser = require("body-parser");
const { Ollama } = require("ollama");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

const mbtiInfoBuffer = fs.readFileSync(
  path.join(__dirname, "./mbti-info.json")
);
const mbtiInfo = JSON.parse(mbtiInfoBuffer.toString());

const ollama = new Ollama({
  baseUrl: "http://localhost:11434",
  model: "gemma:2b",
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/", async (req, res) => {
  const { type, question } = req.body;
  const info = mbtiInfo[type];

  const messages = [
    {
      role: "system",
      content:
        "你是一个共情能力非常强的心理医生，并且很了解MBTI（迈尔斯-布里格斯性格类型指标)的各种人格类型，你的任务是根据来访者的 MBTI 和问题，给出针对性的情感支持，你的回答要富有感情、有深度和充足的情感支持，引导来访者乐观积极面对问题",
    },
    {
      role: "user",
      content: `用户的 MBTI 类型是${type}, 这个类型的特点是${info}, 他的问题是${question}`,
    },
  ];

  try {
    //const response = await ollama.chat(messages);
    const response = await ollama.chat({
      model: "gemma:2b",
      messages: messages,
    });
    //res.json({ response: response.data });
    console.log(response.message.content);
    res.json({ response: response.message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
