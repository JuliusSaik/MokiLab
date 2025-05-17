// server.js (ESM version)
import express from "express";
import { Groq } from "groq-sdk";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use(express.static("public"));

app.options("/api/validate", (req, res) => {
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).end();
});

app.post("/api/generate-quiz", async (req, res) => {
  try {
    const { grade, subject, topic, count, difficulty, extraPromt } = req.body;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `
Tu esi pažangus užduočių generatorius Lietuvos moksleiviams.
REIKALAVIMAI:
- Generuok ${subject.toLowerCase()} uždavinius pagal pasirinktą klasę: ${grade} klasė.
- Tema: "${topic}"
- Kiekis: ${count} uždavinių
- Sunkumas: "${difficulty}"
- ExtraPromt: "${extraPromt}"
FORMATAS:
Atsakyk TIK šiuo griežtu JSON formatu:
{
  "grade": ${grade},
  "subject": "${subject}",
  "topic": "${topic}",
  "difficulty": "${difficulty}",
  "exercises": [
    {
      "question": "Tekstinis klausimas arba uždavinys",
      "result": "Teisingas atsakymas",
      "solution": "Be jokio teksto ir žodžių parodyta sprendimo eiga",
      "reasoning": "Paaiškink, kaip spręsti šį uždavinį, pateik originalų palyginimą su gyvenimiška situacija."
    }
  ]
}
Formulems ir lygtims naudok inline LaTex sintaksę.
Laipsniams naudok ^\circ pvz.: \angle C = 90^\circ
Nekomentuok – atsakyk tik su galutiniu JSON.
        `,
        },
        {
          role: "user",
          content: "Prašau sugeneruoti uždavinius.",
        },
      ],
      model: "meta-llama/llama-4-maverick-17b-128e-instruct",
      response_format: { type: "json_object" },
    });

    const responseData = JSON.parse(completion.choices[0].message.content);

    res.json(responseData);
  } catch (error) {
    console.error("Quiz generation error:", error);
    res.status(500).json({ error: "Nepavyko sugeneruoti uždavinių" });
  }
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
