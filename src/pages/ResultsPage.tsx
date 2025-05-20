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
  question: string;
  result: string;
  solution: string;
  reasoning: string;
};

type QuizResponse = {
  grade: number;
  subject: string;
  topic: string;
  difficulty: string;
  exercises: QuizQuestion[];
};

const ResultsPage = () => {
  const location = useLocation();
  const {
    subject,
    grade,
    topic,
    subtopic,
    difficulty,
    count,
    extraPrompt,
  }: RequestPrompt = location.state || {};

  const [quizData, setQuizData] = useState<QuizResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!subject || !grade || !topic || !count || !difficulty) {
        setError("Missing required data.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/api/generate-quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            grade: grade,
            subject: subject,
            topic: topic,
            difficulty: difficulty,
            extraPrompt: extraPrompt,
            count: count,
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
  }, [grade, subject, topic, difficulty, count, extraPrompt]);

  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typeset();
    }
  }, [quizData]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-stone-300 mb-8 text-center">
        Rezultatai
      </h1>

      {loading && (
        <div className="space-y-6">
          {Array.from({ length: count }).map((_, idx) => (
            <div key={idx} className="skeleton h-40 w-full rounded-lg"></div>
          ))}
        </div>
      )}

      {error && (
        <div className="alert alert-error max-w-2xl mx-auto">
          <span>⚠️ Klaida: Nepavyko sukurti uždavinių...</span>
        </div>
      )}

      {quizData && (
        <div className="space-y-6">
          {quizData.exercises.map((q: QuizQuestion, index: number) => (
            <div
              key={index}
              className="bg-stone-500/10 p-6 rounded-xl shadow-md border border-stone-300/30"
            >
              <p className="font-semibold text-stone-300 text-lg mb-4 overflow-x-auto">
                ❓ <span dangerouslySetInnerHTML={{ __html: q.question }} />
              </p>

              <details className="group">
                <summary className="p-4 bg-primary text-white font-bold rounded-lg shadow cursor-pointer hover:bg-primary-focus transition-colors list-none">
                  Peržiūrėti atsakymą ir sprendimo būdą
                  <svg
                    className="w-5 h-5 ml-2 inline-block transform group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>

                <div className="mt-4 space-y-4">
                  <div className="border border-green-300/50 p-4 rounded-lg overflow-x-auto">
                    <p className="text-green-300 font-bold">
                      Teisingas atsakymas:{" "}
                    </p>
                    <span className="block">{q.result}</span>
                  </div>

                  <div className="border border-indigo-300/50 p-4 rounded-lg overflow-x-auto">
                    <p className="text-indigo-300 font-bold">Sprendimas: </p>
                    <span className="block">{q.solution}</span>
                  </div>

                  <div className="p-4 rounded-lg border border-amber-300/50">
                    <p className="text-amber-300 font-bold">Paaiškinimas: </p>
                    <p className="text-stone-300">{q.reasoning}</p>
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
