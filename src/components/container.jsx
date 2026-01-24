import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Header from "./header";
import Footer from "./footer";
import "./container.css";

function Container() {
    const [activeSection, setActiveSection] = useState("about");

    const renderContent = () => {
        switch (activeSection) {
            case "about":
                return (
                    <section className="content about">
                        <h2>About Me</h2>
                        <p>
                            Software Engineering graduate based in Dubai with strong expertise in programming, algorithms,
                            and system design. Proficient in Python and JavaScript, with hands-on experience
                            developing AI agents and automations using LangGraph, training and fine-tuning
                            machine learning models, and deploying intelligent systems into production
                            environments.
                        </p>

                        <p>
                            Experienced in full-stack web development using React, Next.js, Express, and
                            RESTful APIs, with additional background in mobile development using React Native.
                            Skilled in data preprocessing, model evaluation, version control (Git), and CI/CD
                            fundamentals.
                        </p>

                        <p>
                            Demonstrated technical project management capabilities including requirements
                            engineering, system specification, task decomposition (WBS), sprint planning,
                            milestone tracking, risk identification, and coordinating development workflows
                            in Agile/Scrum environments.
                        </p>

                        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                            <TypeAnimation
                                sequence={[
                                    "Let me build you a Website",
                                    1000,
                                    "Let me build you an AI agent",
                                    1000,
                                    "Let me build you a Mobile app",
                                    1000,
                                    "Let me build you an Automation",
                                    1000,
                                ]}
                                wrapper="span"
                                speed={30}
                                repeat={Infinity}
                            />
                        </p>

                        <a
                            href="https://www.linkedin.com/in/hshkoukani"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hire-btn"
                        >
                            Hire Me
                        </a>
                    </section>
                );
            case "skills":
                return (
                    <section className="content skills">
                        <h2>Technical Skills</h2>
                        <div className="skills-grid">
                            {[
                            { name: "Frontend Development", icon: "/icons/frontend.png" },
                            { name: "Backend Development", icon: "/icons/backend.png" },
                            { name: "AI Model Development & Integration", icon: "/icons/ai-model.png" },
                            { name: "AI Agents & Langgraph Automation", icon: "/icons/ai-agent.png" },
                            { name: "Database & SQL", icon: "/icons/database.png" },
                            { name: "Data Analysis", icon: "/icons/data.png" },
                            { name: "Mobile Development", icon: "/icons/mobile.png" },
                            ].map((skill, index) => (
                            <div className="skill-card" key={index}>
                                <img src={skill.icon} alt={skill.name} />
                                <span>{skill.name}</span>
                            </div>
                            ))}
                        </div>

                        <h2 style={{ marginTop: "3rem" }}>Non-Technical Skills</h2>
                        <div className="skills-grid">
                            {[
                            { name: "Agile Methodology & SDLC", icon: "/icons/agile.png" },
                            { name: "Team Collaboration", icon: "/icons/tc.png" },
                            { name: "Problem Solving", icon: "/icons/ps.png" },
                            ].map((skill, index) => (
                            <div className="skill-card non-technical" key={index}>
                                 <img src={skill.icon} alt={skill.name} />
                                <span>{skill.name}</span>
                            </div>
                            ))}
                        </div>
                    </section>
                );
            case "projects":
                const projects = [
                    {
                    name: "Prof Dux Mini - Senior Project",
                    description:
                        "AI-Twilio powered Calling Service to support Lecturers. Features include sending announcements, online meetings, and task organization through Google Calendar.",
                    github: "https://github.com/Hasan-Shkoukani/profduxmini",
                    },
                    {
                    name: "SolinDocs - Senior Project I",
                    description:
                        "AI-powered mobile application to streamline university life. Built with MERN and React Native. Features live timetable organizer, event calendar, and smart document parsing using LLM.",
                    github: "https://github.com/Hasan-Shkoukani/solin",
                    },
                    {
                    name: "Unit-Testing Framework",
                    description:
                        "Lightweight, extensible Python unit testing framework with custom assertions, decorators, test runner, and LLM-powered debugging.",
                    github: "https://github.com/Hasan-Shkoukani/unit-testing",
                    },
                    {
                    name: "Bolt.py - Chrome Extension",
                    description:
                        "AI-powered Gmail responder Chrome Extension for NEU Registration Office to classify and respond to emails efficiently.",
                    github: "https://github.com/Hasan-Shkoukani/bolt",
                    },
                    {
                    name: "GitReview",
                    description:
                        "AI-powered code analysis tool providing automated scoring on readability, maintainability, performance, and overall code quality.",
                    github: "https://github.com/Hasan-Shkoukani/git-review",
                    },
                ];

                return (
                    <section className="content projects">
                    <h2>Projects</h2>
                    <p>Check out my latest projects showcasing my work and expertise.</p>

                    <div className="projects-grid">
                        {projects.map((project, index) => (
                        <a
                            key={index}
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-card"
                        >
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                        </a>
                        ))}
                    </div>
                    </section>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container-wrapper">
            <Header activeSection={activeSection} setActiveSection={setActiveSection} />
            <main className="main-content">
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
}

export default Container;