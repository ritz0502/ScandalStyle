"use client"

import "./Marquee.css"
import { useState, useEffect } from "react"

const fashionItems = [
  { id: 1, image: "/src/assets/fashion1.png", title: "Rebel Leather" },
  { id: 2, image: "/src/assets/fashion2.jpeg", title: "Gothic Elegance" },
  { id: 3, image: "/src/assets/fashion3.jpeg", title: "Punk Essentials" },
  { id: 4, image: "/src/assets/fashion4.webp", title: "Street Rebellion" },
  { id: 5, image: "/src/assets/fashion5.webp", title: "Avant-Garde" },
  { id: 6, image: "/src/assets/fashion6.jpeg", title: "Criminal Accessories" },
]

export default function Marquee() {
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const marqueeLeft = document.querySelector(".marquee-left")
    const marqueeRight = document.querySelector(".marquee-right")

    if (marqueeLeft) {
      marqueeLeft.style.animationPlayState = isPaused ? "paused" : "running"
    }

    if (marqueeRight) {
      marqueeRight.style.animationPlayState = isPaused ? "paused" : "running"
    }
  }, [isPaused])

  return (
    <section className="marquee-section" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="marquee-container">
        {/* Top row - scrolls left to right */}
        <div className="marquee-row marquee-left">
          <div className="marquee-content">
            {[...fashionItems, ...fashionItems].map((item, index) => (
              <div key={`top-${index}`} className="marquee-item">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=200&width=300&text=" + encodeURIComponent(item.title)
                  }}
                />
                <div className="item-overlay">
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row - scrolls right to left */}
        <div className="marquee-row marquee-right">
          <div className="marquee-content">
            {[...fashionItems.reverse(), ...fashionItems].map((item, index) => (
              <div key={`bottom-${index}`} className="marquee-item">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=200&width=300&text=" + encodeURIComponent(item.title)
                  }}
                />
                <div className="item-overlay">
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
