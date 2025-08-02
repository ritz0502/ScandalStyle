"use client"

import { useState, useEffect, useRef } from "react"
import "./Sidebar.css"

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef(null)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && !event.target.closest(".menu-toggle")) {
        closeSidebar()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Collections", href: "#collections" },
    { name: "Team", href: "#team" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <>
      <button className={`menu-toggle ${isOpen ? "active" : ""}`} onClick={toggleSidebar} aria-label="Toggle menu">
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <div className={`sidebar-overlay ${isOpen ? "active" : ""}`} onClick={closeSidebar}></div>

      <aside ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h2 className="brand-name">CRIMINAL COUTURE</h2>
          </div>

          <nav className="sidebar-nav">
            <ul className="nav-list">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <a href={item.href} className="nav-link" onClick={closeSidebar}>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="sidebar-footer">
            <button className="shop-button" onClick={closeSidebar}>
              SHOP NOW
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
