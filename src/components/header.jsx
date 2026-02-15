import React from "react";
import "./header.css";

function Header({ activeSection, setActiveSection }) {
    return (
        <header className="header">
            <a href="#" className="logo">h.shkoukani</a>
            <nav className="nav">
                <ul className="nav-list">
                    <li><button onClick={() => setActiveSection("about")}>About</button></li>
                    <li><button onClick={() => setActiveSection("skills")}>Skills</button></li>
                    <li><button onClick={() => setActiveSection("projects")}>Projects</button></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;