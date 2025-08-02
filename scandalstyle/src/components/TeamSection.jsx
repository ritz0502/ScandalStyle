import { useState } from "react"
import "./TeamSection.css"
import arushi from "../assets/arushi.JPG"
import reetika from "../assets/reetika.jpeg"


const teamMembers = [
  {
    id: 1,
    name: "Arushi Jain",
    role: "Software Developer",
    image: arushi,
  },
  {
    id: 2,
    name: "Reetika Gupta",
    role: "Software Developer",
    image: reetika,
  }
]

export default function TeamSection() {
  const [hoveredMember, setHoveredMember] = useState(null)

  return (
    <section className="team-section" data-aos="fade-up">
      <div className="team-container">
        <div className="team-header" data-aos="fade-up" data-aos-delay="100">
          <h2 className="team-title">OUR TEAM</h2>
          <p className="team-subtitle">The rebels behind the revolution</p>
        </div>

        <div className="team-content" data-aos="fade-up" data-aos-delay="200">
          <div className="team-list">
            {teamMembers.map((member, index) => (
              <div
                key={member.id}
                className="team-list-item"
                data-aos="fade-right"
                data-aos-delay={300 + index * 100}
                onMouseEnter={() => setHoveredMember(member)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <span className="member-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="member-name">{member.name}</span>
                <span className="member-role">{member.role}</span>
              </div>
            ))}
          </div>

          {/* Popup Image */}
          <div className={`team-popup ${hoveredMember ? "active" : ""}`}>
            {hoveredMember && (
              <div className="popup-image-container">
                <img
                  src={hoveredMember.image || "/placeholder.svg"}
                  alt={hoveredMember.name}
                  className="popup-image"
                  onError={(e) => {
                    e.target.src =
                      "/placeholder.svg?height=300&width=300&text=" + encodeURIComponent(hoveredMember.name)
                  }}
                />
                <div className="popup-overlay">
                  <h3 className="popup-name">{hoveredMember.name}</h3>
                  <p className="popup-role">{hoveredMember.role}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
