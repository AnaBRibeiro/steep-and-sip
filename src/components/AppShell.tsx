"use client";

import { useEffect, useState } from "react";
import ClosingCta from "./ClosingCta";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";
import QuizFlow from "./QuizFlow";
import ResultsView from "./ResultsView";
import Testimonials from "./Testimonials";
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

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("openQuiz")) {
      navigate("quiz");
      window.history.replaceState(null, "", "/");
    }
  }, [navigate]);

  return (
    <>
      <Header onLogoClick={goHome} onStartQuiz={() => navigate("quiz")} />
      <main className={`page-transition flex-1 ${visible ? "is-visible" : "is-hidden"}`}>
        {view === "landing" && (
          <>
            <Hero onStart={() => navigate("quiz")} />
            <Testimonials />
            <ClosingCta onStart={() => navigate("quiz")} />
          </>
        )}
        {view === "quiz" && <QuizFlow onComplete={handleComplete} onCancel={goHome} />}
        {view === "results" && answers && (
          <ResultsView answers={answers} onRetake={() => navigate("quiz")} onStartOver={goHome} />
        )}
      </main>
      <Footer />
    </>
  );
}
