// src/App.jsx

"use client";

import { useState } from "react";
import LoadingPage from "./components/LoadingPage";
import TransitionPage from "./components/TransitionPage";

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
    </>
  );
};

export default App;