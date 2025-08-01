// src/components/TransitionPage.jsx

"use client";

import { useState, useEffect } from "react";
import scandalLogo from '../assets/Scandal.png';

const TransitionPage = ({ onTransitionEnd }) => {
  const [phase, setPhase] = useState("hold");

  useEffect(() => {
  const timers = [
    // The logo and text hold for 3 seconds.
    setTimeout(() => setPhase("sweep-out"), 3000), 
    // The sweep-out animation now takes 0.8s. We call onTransitionEnd after it's complete.
    setTimeout(() => {
      setPhase("complete");
      if (onTransitionEnd) onTransitionEnd();
    }, 3000 + 800), // 3000ms hold + 800ms sweep-out
  ];
  return () => timers.forEach(clearTimeout);
}, [onTransitionEnd]);

  return (
    <div className={`transition-container ${phase}`}>
      <div className={`center-content ${phase === "hold" ? "visible" : ""}`}>
        <div className="welcome-text">WELCOME TO</div>
        <div className="logo-container">
          <img src={scandalLogo} alt="Scandal" className="logo" />
        </div>
        <div className="tagline">your one-stop fashion crime scene</div>
      </div>
      
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Libertinus+Sans:ital,wght@0,400;0,700;1,400&display=swap');

        .transition-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          /* --- This is the key change --- */
          background: linear-gradient(45deg, #8b0000 20%, #dc143c 50%, #4a0000 100%);
          /* ---------------------------- */
          z-index: 9999;
          transition: transform 0.8s cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }
        
        .transition-container.hold {
          transform: translateY(0);
        }
        
        .transition-container.sweep-out {
          transform: translateY(-100vh);
        }
        
        .transition-container.complete {
  /* Set the transform to match the final position of sweep-out */
  transform: translateY(-100vh); 
  opacity: 0; /* Add opacity:0 back to hide the element completely */
  pointer-events: none;
  /* You may want to add a transition property to make this disappear smoothly */
  transition: opacity 0.5s ease-in-out;
}

        .center-content {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 15;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          
          /* Use flexbox for better spacing control */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .center-content.visible {
          opacity: 1;
          animation: elegantFadeIn 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        @keyframes elegantFadeIn {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.6) translateY(40px); }
          60% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.08) translateY(-8px); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1) translateY(0px); }
        }

        .welcome-text {
          font-family: "Libertinus Sans", sans-serif;
          font-weight: 700;
          font-style: normal;
          font-size: clamp(3rem, 7vw, 4.5rem); /* Slightly smaller for proportion */
          color: #f5f5dc; /* Changed to a lighter color for visibility on red */
          margin-bottom: -2.2rem; /* Increased margin for better spacing */
          letter-spacing: 2px;
          text-shadow: 0 3px 6px rgba(0, 0, 0, 0.5);
        }

        .logo-container {
          margin: 0; /* Removing the margin here to let the child element handle it */
        }

        .logo {
          max-width: clamp(370px, 90vw, 700px); /* Increased size of the logo */
          height: auto;
          filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.6));
        }

        .tagline {
          font-family: "Libertinus Sans", sans-serif;
          font-weight: 400;
          font-style: normal;
          font-size: clamp(2rem, 4vw, 2.4rem); /* Increased size for readability */
          color: #d4af37;
          letter-spacing: 1px;
          margin-top: -4.2rem; /* Increased margin for better spacing */
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default TransitionPage;