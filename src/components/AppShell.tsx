"use client";

import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";
import QuizFlow from "./QuizFlow";
import ResultsView from "./ResultsView";
import { useFadeNavigate } from "@/lib/useFadeNavigate";
import { QuizAnswers } from "@/lib/types";

type View = "landing" | "quiz" | "results";

export default function AppShell() {
  const { value: view, visible, navigate } = useFadeNavigate<View>("landing");
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);

  function handleComplete(finalAnswers: QuizAnswers) {
    setAnswers(finalAnswers);
    navigate("results");
  }

  function goHome() {
    navigate("landing");
  }

  return (
    <>
      <Header onLogoClick={goHome} />
      <main className={`page-transition flex-1 ${visible ? "is-visible" : "is-hidden"}`}>
        {view === "landing" && <Hero onStart={() => navigate("quiz")} />}
        {view === "quiz" && <QuizFlow onComplete={handleComplete} onCancel={goHome} />}
        {view === "results" && answers && (
          <ResultsView answers={answers} onRetake={() => navigate("quiz")} onStartOver={goHome} />
        )}
      </main>
      <Footer />
    </>
  );
}
