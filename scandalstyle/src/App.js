// src/App.jsx

"use client";

import { useState } from "react";
import LoadingPage from "./components/LoadingPage";
import TransitionPage from "./components/TransitionPage";
// import CollectionsPage from "./components/CollectionsPage"; 

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
      {/* <CollectionsPage /> */}
    </>
  );
};

export default App;