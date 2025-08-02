import { useEffect } from "react"
import Marquee from "./Marquee"
import TeamSection from "./TeamSection"
import AOS from "aos"
import "aos/dist/aos.css"
import TextAnimation from "./TextAnimation"
import Sidebar from "./Sidebar"

export default function CriminalCouturePage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    })
  }, [])

  return (
    <div className="criminal-couture">
      <header className="site-header">
        <div className="photo"></div>
        <Sidebar/>
      </header>
    
      <TextAnimation/>
      <Marquee />
      <TeamSection />

      <footer className="site-footer">
        <p>&copy; 2024 Criminal Couture. All rights reserved.</p>
      </footer>
    </div>
  )
}
