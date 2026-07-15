"use client";

import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";
import QuizFlow from "./QuizFlow";
import ResultsView from "./ResultsView";
import { QuizAnswers } from "@/lib/types";

type View = "landing" | "quiz" | "results";

export default function AppShell() {
  const [view, setView] = useState<View>("landing");
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);

  function handleComplete(finalAnswers: QuizAnswers) {
    setAnswers(finalAnswers);
    setView("results");
  }

  function goHome() {
    setView("landing");
  }

  return (
    <>
      <Header onLogoClick={goHome} />
      <main className="flex-1">
        {view === "landing" && <Hero onStart={() => setView("quiz")} />}
        {view === "quiz" && <QuizFlow onComplete={handleComplete} onCancel={goHome} />}
        {view === "results" && answers && (
          <ResultsView answers={answers} onRetake={() => setView("quiz")} onStartOver={goHome} />
        )}
      </main>
      <Footer />
    </>
  );
}
