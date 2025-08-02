"use client"

import { useState, useEffect, useRef } from "react"
import "./TextAnimation.css"

export default function TextAnimation() {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const textRef = useRef(null)

  const fullText = "SCANDAL STYLE"

  useEffect(() => {
    let charIndex = 0
    const typeInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typeInterval)
        setIsComplete(true)
        // Keep cursor blinking after completion
        setShowCursor(true)
      }
    }, 200) // Typing speed

    return () => clearInterval(typeInterval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100

        textRef.current.style.setProperty("--mouse-x", `${Math.max(0, Math.min(100, x))}%`)
        textRef.current.style.setProperty("--mouse-y", `${Math.max(0, Math.min(100, y))}%`)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="text-animation-container">
      <div ref={textRef} className="text-step">
        <h1 className="fashion-text">
          <span className="typewriter-text">{displayText}</span>
          {showCursor && <span className="typewriter-cursor">|</span>}
        </h1>
      </div>

      <div className="subtitle-container">
        <p className="subtitle">Not Just Fashion. A Crime Scene.</p>
      </div>
    </div>
  )
}
