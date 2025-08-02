"use client";

import { useState, useEffect, useRef } from "react";
import "./Sidebar.css";

export default function Sidebar({
  onHomeClick,
  onCollectionsClick,
  onTeamClick,
  onContactClick,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest(".menu-toggle")
      ) {
        closeSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleNavClick = (item) => {
    closeSidebar();

    switch (item) {
      case "Home":
        onHomeClick?.();
        break;
      case "Collections":
        onCollectionsClick?.();
        break;
      case "Team":
        onTeamClick?.();
        break;
      case "Contact":
        onContactClick?.();
        break;
      default:
        break;
    }
  };

  const navItems = ["Home", "Collections", "Team", "Contact"];

  return (
    <>
      <button
        className={`menu-toggle ${isOpen ? "active" : ""}`}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      <div
        className={`sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={closeSidebar}
      ></div>

      <aside ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h2 className="brand-name">CRIMINAL COUTURE</h2>
          </div>

          <nav className="sidebar-nav">
            <ul className="nav-list">
              {navItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <button
                    className="nav-link"
                    onClick={() => handleNavClick(item)}
                    style={{
                      background: "none",
                      border: "none",
                      width: "100%",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </button>
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
  );
}
