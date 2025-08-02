// src/App.jsx

"use client";

import { useState } from "react";
import LoadingPage from "./components/LoadingPage";
import TransitionPage from "./components/TransitionPage";
import CriminalCouturePage from "./components/CriminalCouturePage";

const App = () => {
  const [showLoading, setShowLoading] = useState(true);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  return (
    <>
      {showLoading ? (
        <LoadingPage onComplete={handleLoadingComplete} />
      ) : (
        <TransitionPage />
      )}
      <CriminalCouturePage />
    </>
  );
};

export default App;