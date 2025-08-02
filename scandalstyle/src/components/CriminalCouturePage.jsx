import { useEffect, useRef, useState } from "react";
import Marquee from "./Marquee";
import TeamSection from "./TeamSection";
import AOS from "aos";
import "aos/dist/aos.css";
import TextAnimation from "./TextAnimation";
import Sidebar from "./Sidebar";
import CollectionsPage from "./CollectionsPage";

export default function CriminalCouturePage() {
  const [showCollections, setShowCollections] = useState(false);

  const teamRef = useRef(null);   // Scroll target for "Team"
  const footerRef = useRef(null); // Scroll target for "Contact"

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 100 });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToTeam = () => {
    teamRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCollectionsClick = () => {
    setShowCollections(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToHome = () => {
    setShowCollections(false);
    // Scroll to top when returning to home
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  if (showCollections) {
    return (
      <CollectionsPage 
        onBack={handleBackToHome}
        onTeamClick={scrollToTeam}
        onContactClick={scrollToFooter}
      />
    );
  }

  return (
    <div className="criminal-couture">
      <header className="site-header">
        <div className="photo"></div>
        <Sidebar
          onHomeClick={scrollToTop}
          onCollectionsClick={handleCollectionsClick}
          onTeamClick={scrollToTeam}
          onContactClick={scrollToFooter}
        />
      </header>

      <TextAnimation />
      <Marquee />

      <div ref={teamRef}>
        <TeamSection />
      </div>

      <footer className="site-footer" ref={footerRef}>
        <p>&copy; 2024 Criminal Couture. All rights reserved.</p>
      </footer>
    </div>
  );
}