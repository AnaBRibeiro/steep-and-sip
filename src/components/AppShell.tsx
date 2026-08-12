"use client";

import { useLayoutEffect, useState } from "react";
import ClosingCta from "./ClosingCta";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";
import Newsletter from "./Newsletter";
import QuizFlow from "./QuizFlow";
import ResultsView from "./ResultsView";
import SkipLink from "./SkipLink";
import Testimonials from "./Testimonials";
import { useFadeNavigate } from "@/lib/useFadeNavigate";
import { QuizAnswers, Tea } from "@/lib/types";
import { QUIZ_PROGRESS_STORAGE_KEY } from "@/lib/quiz";

type View = "landing" | "quiz" | "results";

// Module-level (not component state), so it resets only on an actual page (re)load —
// unlike Performance Navigation Timing, which stays "reload" for the entire document's
// life and can't tell a soft client-side navigation back to "/" apart from a real refresh.
let hasCheckedForSavedProgress = false;

interface AppShellProps {
  teas: Tea[];
  loggedIn: boolean;
  favoriteTeaIds: string[];
}

export default function AppShell({ teas, loggedIn, favoriteTeaIds }: AppShellProps) {
  const { value: view, visible, navigate, jumpTo } = useFadeNavigate<View>("landing");
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);

  function handleComplete(finalAnswers: QuizAnswers) {
    setAnswers(finalAnswers);
    navigate("results");
  }

  function goHome() {
    // Leaving the quiz (e.g. via the logo) abandons any in-progress answers — otherwise a
    // later refresh of the homepage would incorrectly auto-resume the old quiz progress.
    sessionStorage.removeItem(QUIZ_PROGRESS_STORAGE_KEY);
    navigate("landing");
  }

  function handleNavStartQuiz() {
    if (view !== "landing") {
      const message =
        view === "results"
          ? "Retake the quiz? Your current results will be replaced."
          : "Restart the quiz? Your current answers will be cleared.";
      if (!confirm(message)) return;
      sessionStorage.removeItem(QUIZ_PROGRESS_STORAGE_KEY);
    }
    navigate("quiz");
  }

  useLayoutEffect(() => {
    const hasOpenQuizParam = new URLSearchParams(window.location.search).has("openQuiz");

    // Only auto-resume saved progress the first time AppShell mounts after an actual page
    // (re)load — not on every later soft navigation back to "/", like clicking the logo
    // from another page, which should always land on the homepage.
    const isFirstMountThisPageLoad = !hasCheckedForSavedProgress;
    hasCheckedForSavedProgress = true;
    const hasStoredProgress =
      isFirstMountThisPageLoad && sessionStorage.getItem(QUIZ_PROGRESS_STORAGE_KEY) !== null;

    if (hasOpenQuizParam || hasStoredProgress) {
      jumpTo("quiz");
    }
    if (hasOpenQuizParam) {
      window.history.replaceState(null, "", "/");
    }

    // Safe to reveal the homepage now — React has decided what view to actually show.
    document.documentElement.classList.remove("resume-quiz-pending");
  }, [jumpTo]);

  return (
    <>
      <SkipLink />
      <Header onLogoClick={goHome} onStartQuiz={handleNavStartQuiz} />
      <main
        id="main-content"
        tabIndex={-1}
        className={`page-transition flex-1 ${visible ? "is-visible" : "is-hidden"}`}
      >
        {view === "landing" && (
          <div id="landing-view">
            <Hero onStart={() => navigate("quiz")} />
            <Testimonials />
            <ClosingCta onStart={() => navigate("quiz")} />
            <Newsletter />
          </div>
        )}
        {view === "quiz" && <QuizFlow onComplete={handleComplete} onCancel={goHome} />}
        {view === "results" && answers && (
          <ResultsView
            answers={answers}
            teas={teas}
            loggedIn={loggedIn}
            favoriteTeaIds={favoriteTeaIds}
            onRetake={() => navigate("quiz")}
            onStartOver={goHome}
          />
        )}
      </main>
      <Footer onStartQuiz={handleNavStartQuiz} />
    </>
  );
}
