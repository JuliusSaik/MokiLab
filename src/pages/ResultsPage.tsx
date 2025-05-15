import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { RequestPrompt } from "../state/models/RequestModels";

declare global {
  interface Window {
    MathJax: {
      typeset: () => void;
    };
  }
}

type QuizQuestion = {
  klausimas: string;
  rezultatas: string;
  sprendimas: string;
  paaiskinimas: string;
};

type QuizResponse = {
  klase: number;
  dalykas: string;
  tema: string;
  sunkumas: string;
  uzdaviniai: QuizQuestion[];
};

const ResultsPage = () => {
  const location = useLocation();
  const { subject, grade, topic, difficulty, extraPrompt }: RequestPrompt =
    location.state || {};

  const [quizData, setQuizData] = useState<QuizResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!subject || !grade || !topic || !difficulty) {
        setError("Missing required data.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/generate-quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            klase: grade,
            dalykas: subject,
            tema: topic,
            sunkumas: difficulty,
            extraPrompt: extraPrompt,
            kiekis: 10,
          }),
        });

        if (!res.ok) throw new Error("Failed to fetch quiz");
        const data: QuizResponse = await res.json();
        setQuizData(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [grade, subject, topic, difficulty, extraPrompt]);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typeset(); // paleidžia MathJax naujai įkeltam turiniui
    }
  }, [quizData]);

  return (
    <div className="text-center mt-8">
      <h1 className="text-4xl font-bold text-stone-300 mb-8">Rezultatai</h1>

      {loading && <p>⏳ Kraunama...</p>}
      {error && <p className="text-red-600">⚠️ Klaida: {error}</p>}

      {quizData && (
        <div className="space-y-6 text-left max-w-2xl mx-auto">
          {quizData.uzdaviniai.map((q: QuizQuestion, index: number) => (
            <div
              key={index}
              className="bg-stone-500/10 p-4 rounded-xl shadow-md border-stone-300 border-1"
            >
              <p className="font-semibold text-stone-300 text-lg items-start">
                ❓ {q.klausimas}
              </p>
              <div className="flex flex-col items-center">
                <details className="w-full m-4 ">
                  <summary className="p-4 bg-indigo-500 text-white font-bold rounded-lg shadow-lg cursor-pointer hover:bg-indigo-500 transition-colors ">
                    Peržiūrėti atsakymą ir sprendimo būdą
                  </summary>

                  <div className="border-1 border-gray-600 p-4 rounded-lg mt-4">
                    <p
                      className="text-green-300"
                      dangerouslySetInnerHTML={{
                        __html: `✔️ \\(${q.rezultatas}\\)`,
                      }}
                    ></p>
                  </div>

                  <div className="border-1 border-gray-600 p-4 rounded-lg mt-4">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: `🔍 \\(${q.sprendimas}\\)`,
                      }}
                    ></p>
                  </div>

                  <div className="border-1 border-gray-600 p-4 rounded-lg mt-4">
                    <p>💡 {q.paaiskinimas}</p>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
