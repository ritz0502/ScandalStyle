"use client";

import { useState, useEffect } from "react";
import dressCaution from "../assets/dress.png";
import cuffsImage from "../assets/cuffs.png";
import lightning from "../assets/bolt.png";

const LoadingPage = ({ onComplete }) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [countdown, setCountdown] = useState(7);
  const [crimeSceneVisible, setCrimeSceneVisible] = useState(false);
  const [thunderBlink, setThunderBlink] = useState(true);
  const [splashVisible, setSplashVisible] = useState(false);

  // Phase transitions
  useEffect(() => {
    const phaseTimers = [
      setTimeout(() => setCurrentPhase(1), 2000), // Fashion Drop Incoming
      setTimeout(() => setCurrentPhase(2), 4000), // Get Ready to Steal
    ];

    return () => phaseTimers.forEach(clearTimeout);
  }, []);

  // Crime scene drop animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setCrimeSceneVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Countdown timer
useEffect(() => {
  const timer = setInterval(() => {
    setCountdown((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        setSplashVisible(true); // Start the blood splash animation
        
        // Wait for the full animation to finish (droplets + screen fill)
        const transitionDelay = 3000; // This should be the total time for your splash animation
        setTimeout(() => {
          if (onComplete) {
            onComplete(); 
          }
        }, transitionDelay); 

        return 0;
      }
      return prev - 1;
    });
  }, 1000);
  
  return () => clearInterval(timer);
}, [onComplete]);

  // Thunder blink effect
  useEffect(() => {
    if (currentPhase === 2) {
      const blinkTimer = setInterval(() => {
        setThunderBlink((prev) => !prev);
      }, 500);

      return () => clearInterval(blinkTimer);
    }
  }, [currentPhase]);

  const phases = [
    {
      text: (
        <>
          THE
          <br />
          SCENE IS
          <br />
          BEING
          <br />
          SET...
        </>
      ),
      elements: null,
    },
    {
      text: (
        <>
          FASHION
          <br />
          DROPS
          <br />
          INCOMING
        </>
      ),
      elements: (
        <div className="caution-tape">
          <div className="tape-strip">CAUTION</div>
          <div className="tape-strip">CAUTION</div>
          <div className="tape-strip">CAUTION</div>
        </div>
      ),
    },
    {
      text: (
        <div className="main-text">
          <div>GET</div>
          <div>READY</div>
          <div className="lightning-wrapper">
            <img
              src={lightning}
              alt="lightning"
              className={`lightning-behind ${thunderBlink ? "blink" : ""}`}
            />
            <span className="to-text">TO</span>
          </div>
          <div>STEAL!!</div>
        </div>
      ),
      elements: null,
    },
  ];

  return (
    <div className="loading-container">
      {/* Background siren lights */}
      <div className="siren-light siren-1"></div>
      <div className="siren-light siren-2"></div>
      <div className="siren-light siren-3"></div>

      {/* Background handcuffs image */}
      <div className="background-handcuffs">
        <img src={cuffsImage} alt="Handcuffs" />
      </div>

      {/* Main content */}
      <div className="content">
        {/* Left side - Text and elements */}
        <div className="left-content">
          <div className={`main-text phase-${currentPhase}`}>
            {phases[currentPhase].text}
          </div>
          {phases[currentPhase].elements && (
            <div className={`phase-elements phase-${currentPhase}`}>
              {phases[currentPhase].elements}
            </div>
          )}
        </div>

        {/* Right side - Crime scene tape */}
        <div
          className={`crime-scene ${crimeSceneVisible ? "drop-animation" : ""}`}
        >
          <img
            src={dressCaution}
            alt="Dress Caution"
            className="custom-graphic"
          />
        </div>
      </div>

      {/* Bottom countdown */}
      <div className="countdown-section">
        <div className="countdown-circle">
          <div className="countdown-inner">
            <div className="countdown-number">{countdown}</div>
            <div className="countdown-rings">
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
              <div className="ring ring-3"></div>
            </div>
          </div>
        </div>
        <div className="countdown-text">
          <>
            COUNTDOWN
            <br />
            TO THE
            <br />
            STYLE DRIPS
            <br />
          </>
        </div>
      </div>

      {/* Enhanced Blood Splash Animation */}
      <div className={`blood-splash-container ${splashVisible ? "active" : ""}`}>
        {/* Individual Blood Droplets */}
        <div className="blood-droplet droplet-1"></div>
        <div className="blood-droplet droplet-2"></div>
        <div className="blood-droplet droplet-3"></div>
        <div className="blood-droplet droplet-4"></div>
        <div className="blood-droplet droplet-5"></div>
        <div className="blood-droplet droplet-6"></div>
        <div className="blood-droplet droplet-7"></div>
        <div className="blood-droplet droplet-8"></div>
        <div className="blood-droplet droplet-9"></div>
        <div className="blood-droplet droplet-10"></div>
        
        {/* Main Blood Screen Fill */}
        <div className="blood-screen-fill"></div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap");

        .loading-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(
            135deg,
            #0a0a0a 0%,
            #1a1a1a 50%,
            #0a0a0a 100%
          );
          overflow: hidden;
          font-family: "Space Mono", monospace;
          color: white;
        }

        .background-handcuffs {
          position: absolute;
          left: 10%;
          top: 50%;
          transform: translateY(-50%);
          width: 700px;
          height: auto;
          opacity: 0.15;
          z-index: 1;
          pointer-events: none;
        }

        .background-handcuffs img {
          width: 100%;
          height: auto;
          display: block;
        }

        /* Siren light effects */
        .siren-light {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 0, 0, 0.3) 0%,
            rgba(255, 0, 0, 0.1) 50%,
            transparent 70%
          );
          animation: pulse 2s ease-in-out infinite;
        }

        .siren-1 {
          bottom: -100px;
          left: -100px;
          animation-delay: 0s;
        }

        .siren-2 {
          bottom: -150px;
          right: -150px;
          animation-delay: 0.7s;
        }

        .siren-3 {
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          animation-delay: 1.4s;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }

        /* Main content layout */
        .content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100vh;
          padding: 0 5%;
          position: relative;
        }

        .left-content {
          flex: 1;
          position: relative;
          text-align: left;
          min-height: 100px;
        }

        /* Main text */
        .main-text {
          width: 100%;
          margin: 0;
          font-size: clamp(4rem, 9vw, 10rem);
          font-weight: 900;
          line-height: 0.9;
          letter-spacing: -2px;
          opacity: 0;
          transform: translateX(-20px);
          animation: fadeAndMoveIn 1s ease-out forwards;
        }

        .main-text.phase-0 {
          animation-delay: 0s;
        }

        .main-text.phase-1 {
          animation-delay: 2s;
        }

        .main-text.phase-2 {
          animation-delay: 4s;
        }

        .lightning-wrapper {
          position: relative;
          display: inline-block;
          margin: 1rem 0;
        }

        .lightning-behind {
          position: absolute;
          top: 50%;
          left: 170%;
          transform: translate(-50%, -55%) scale(2);
          z-index: -1;
          opacity: 1;
          height: 17rem;
          filter: drop-shadow(0 0 12px yellow);
        }

        .to-text {
          position: relative;
          z-index: 1;
        }

        @keyframes fadeAndMoveIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Phase elements */
        .phase-elements {
          opacity: 0;
          transform: translateX(-50px);
          animation: slideInLeft 0.8s ease-out forwards;
        }

        @keyframes slideInLeft {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .phase-elements.phase-1 {
          animation-delay: 2.5s;
        }

        .phase-elements.phase-2 {
          animation-delay: 4.5s;
        }

        /* Caution tape */
        .caution-tape {
          display: flex;
          flex-direction: column;
          gap: 10px;
          transform: rotate(-15deg);
        }

        .tape-strip {
          background: linear-gradient(
            45deg,
            #ffff00 25%,
            #000 25%,
            #000 50%,
            #ffff00 50%,
            #ffff00 75%,
            #000 75%
          );
          background-size: 20px 20px;
          padding: 8px 20px;
          font-family: "Space Mono", monospace;
          font-weight: bold;
          color: #000;
          font-size: 1rem;
          letter-spacing: 2px;
        }

        .blink {
          animation: blink-animation 1s infinite alternate;
        }

        @keyframes blink-animation {
          from {
            opacity: 1;
          }
          to {
            opacity: 0.3;
          }
        }

        /* Crime scene */
        .crime-scene {
          flex: 0 0 400px;
          height: 100vh;
          position: relative;
          transform: translateY(-100vh);
          transition: transform 5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .crime-scene.drop-animation {
          transform: translateY(0);
        }

        .custom-graphic {
          width: clamp(1000px, 120vw, 1400px);
          height: auto;
        }

        /* Countdown section */
        .countdown-section {
          position: absolute;
          bottom: 10%;
          left: 60%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 2rem;
          z-index: 3;
        }

        .countdown-circle {
          position: relative;
          width: 150px;
          height: 150px;
        }

        .countdown-inner {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle, #001a1a 0%, #003333 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #00ffff;
        }

        .countdown-rings {
          position: absolute;
          inset: -10px;
        }

        .ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #00ffff;
          animation: spin 3s linear infinite;
        }

        .ring-1 {
          animation-duration: 2s;
          opacity: 0.8;
        }

        .ring-2 {
          inset: -7px;
          animation-duration: 3s;
          opacity: 0.6;
          animation-direction: reverse;
        }

        .ring-3 {
          inset: -20px;
          animation-duration: 4s;
          opacity: 0.4;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .countdown-number {
          background: none;
          color: white;
          font-weight: bold;
          font-size: 3.5rem;
          position: static;
        }

        .countdown-text {
          font-size: 2rem;
          font-weight: bold;
          line-height: 1.2;
        }

        /* Enhanced Blood Splash Animation */
        .blood-splash-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1000;
          pointer-events: none;
        }

        /* Individual Blood Droplets */
        .blood-droplet {
          position: absolute;
          background: radial-gradient(circle at 30% 30%, #dc143c, #8b0000, #4a0000);
          border-radius: 50% 50% 50% 0;
          opacity: 0;
          transform: rotate(45deg) scale(0);
          filter: drop-shadow(0 2px 4px rgba(139, 0, 0, 0.6));
        }

        /* Droplet positioning and sizing */
        .droplet-1 {
          width: 60px;
          height: 80px;
          top: 20%;
          left: 15%;
        }

        .droplet-2 {
          width: 40px;
          height: 50px;
          top: 35%;
          left: 75%;
        }

        .droplet-3 {
          width: 80px;
          height: 100px;
          top: 60%;
          left: 25%;
        }

        .droplet-4 {
          width: 30px;
          height: 40px;
          top: 15%;
          left: 60%;
        }

        .droplet-5 {
          width: 50px;
          height: 65px;
          top: 70%;
          left: 80%;
        }

        .droplet-6 {
          width: 35px;
          height: 45px;
          top: 25%;
          left: 40%;
        }

        .droplet-7 {
          width: 70px;
          height: 90px;
          top: 45%;
          left: 10%;
        }

        .droplet-8 {
          width: 45px;
          height: 60px;
          top: 80%;
          left: 50%;
        }

        .droplet-9 {
          width: 25px;
          height: 35px;
          top: 10%;
          left: 85%;
        }

        .droplet-10 {
          width: 55px;
          height: 70px;
          top: 55%;
          left: 65%;
        }

        /* Blood Screen Fill */
        .blood-screen-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: linear-gradient(45deg, #8b0000 20%, #dc143c 50%, #4a0000 100%);
          opacity: 0;
          clip-path: circle(0% at 50% 50%);
          transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* Active state animations */
        .blood-splash-container.active .blood-droplet {
          animation: bloodDropletSplash 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .blood-splash-container.active .droplet-1 { animation-delay: 0.1s; }
        .blood-splash-container.active .droplet-2 { animation-delay: 0.15s; }
        .blood-splash-container.active .droplet-3 { animation-delay: 0.2s; }
        .blood-splash-container.active .droplet-4 { animation-delay: 0.05s; }
        .blood-splash-container.active .droplet-5 { animation-delay: 0.25s; }
        .blood-splash-container.active .droplet-6 { animation-delay: 0.3s; }
        .blood-splash-container.active .droplet-7 { animation-delay: 0.12s; }
        .blood-splash-container.active .droplet-8 { animation-delay: 0.35s; }
        .blood-splash-container.active .droplet-9 { animation-delay: 0.08s; }
        .blood-splash-container.active .droplet-10 { animation-delay: 0.18s; }

        .blood-splash-container.active .blood-screen-fill {
          opacity: 1;
          clip-path: circle(150% at 50% 50%);
          transition-delay: 1.5s;
        }

        @keyframes bloodDropletSplash {
          0% {
            opacity: 0;
            transform: rotate(45deg) scale(0) translateY(-20px);
          }
          30% {
            opacity: 1;
            transform: rotate(45deg) scale(1.2) translateY(0px);
          }
          60% {
            opacity: 0.9;
            transform: rotate(45deg) scale(1) translateY(5px);
          }
          100% {
            opacity: 1;
            transform: rotate(45deg) scale(1) translateY(0px);
          }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .content {
            flex-direction: column;
            padding: 2rem;
            justify-content: space-around;
          }

          .left-content {
            text-align: center;
          }

          .main-text {
            font-size: clamp(4rem, 10vw, 10rem);
          }

          .crime-scene {
            flex: 0 0 200px;
            height: 40vh;
          }

          .countdown-section {
            bottom: 2%;
            gap: 1rem;
          }

          .countdown-circle {
            width: 80px;
            height: 80px;
          }

          .countdown-text {
            font-size: 1.2rem;
          }

          .background-handcuffs {
            display: none;
          }

          /* Smaller droplets on mobile */
          .blood-droplet {
            transform: rotate(45deg) scale(0.7);
          }
        }

        @media (max-width: 480px) {
          .main-text {
            font-size: clamp(4rem, 10vw, 10rem);
          }

          .tape-strip {
            font-size: 0.8rem;
            padding: 6px 15px;
          }

          .blood-droplet {
            transform: rotate(45deg) scale(0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingPage; 