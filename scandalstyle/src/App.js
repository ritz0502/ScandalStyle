// src/App.jsx

"use client";

import { useState } from "react";
import LoadingPage from "./components/LoadingPage";
import TransitionPage from "./components/TransitionPage";
import CriminalCouturePage from "./components/CriminalCouturePage";

const App = () => {
  const [showLoading, setShowLoading] = useState(true);
  const [showTransition, setShowTransition] = useState(false);
  const [showMain, setShowMain] = useState(false);

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setShowTransition(true);
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setShowMain(true);
  };

  return (
    <>
      {showLoading && <LoadingPage onComplete={handleLoadingComplete} />}
      {showTransition && (
        <TransitionPage onTransitionEnd={handleTransitionComplete} />
      )}
      {showMain && <CriminalCouturePage />}
    </>
  );
};

export default App;
