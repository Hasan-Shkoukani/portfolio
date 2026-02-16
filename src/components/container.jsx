import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Header from "./header";
import Footer from "./footer";
import "./container.css";
import ElectricBorder from './Electro/electro'
import MagicBento from './Grid/grid'
import SpotlightCard from './Cards/cards';


function Container() {
    const [activeSection, setActiveSection] = useState("about");

    const renderContent = () => {
        switch (activeSection) {
            case "about":
                return (
                    <section className="content about">
                        <h2>About Me</h2>

                        <p>
                            AI-focused Software Engineer building intelligent systems,
                            automation tools, and modern full-stack applications.
                        </p>

                        <p>
                            I work mainly with Python and JavaScript, creating AI agents,
                            scalable APIs, and production-ready web and mobile products.
                        </p>

                        <p>
                            Passionate about turning complex ideas into practical,
                            real-world solutions that people actually use.
                        </p>

                        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                            <TypeAnimation
                                sequence={[
                                    "Let's build a Website",
                                    1000,
                                    "Let's build an AI Agent",
                                    1000,
                                    "Let's build a Mobile App",
                                    1000,
                                    "Let's build an Automation",
                                    1000,
                                ]}
                                wrapper="span"
                                speed={15}
                                repeat={Infinity}
                            />
                        </p>
                        <div className="electro-box">

                            <ElectricBorder
                                color="#2bd3dc"
                                speed={1}
                                chaos={0.12}
                                thickness={2}
                                style={{ borderRadius: 16 }}
                            >
                                <div className="electro-content">
                                    <h3>AI Systems Engineer</h3>
                                    <p>
                                        Building AI agents, LLM automations, and intelligent production
                                        systems using LangGraph, Gemini, and custom machine learning pipelines.
                                    </p>
                                </div>
                            </ElectricBorder>

                            <ElectricBorder
                                color="#7d9dff"
                                speed={1}
                                chaos={0.12}
                                thickness={2}
                                style={{ borderRadius: 16 }}
                            >
                                <div className="electro-content">
                                    <h3>Full-Stack Developer</h3>
                                    <p>
                                        Developing scalable applications with React, Next.js, Express,
                                        and FastAPI — delivering web, mobile, and API-driven platforms
                                        from idea to deployment.
                                    </p>
                                </div>
                            </ElectricBorder>

                            <ElectricBorder
                                color="#af7dff"
                                speed={1}
                                chaos={0.12}
                                thickness={2}
                                style={{ borderRadius: 16 }}
                            >
                                <div className="electro-content">
                                    <h3>Builder & Community Leader</h3>
                                    <p>
                                        Hackathon organizer, student club founder, and Python instructor
                                        mentoring 50+ students while leading AI-focused development initiatives.
                                    </p>
                                </div>
                            </ElectricBorder>

                        </div>

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
                        <MagicBento 
                        textAutoHide={true}
                        enableStars
                        enableSpotlight
                        enableBorderGlow={true}
                        enableTilt={false}
                        enableMagnetism={false}
                        clickEffect
                        spotlightRadius={210}
                        particleCount={12}
                        glowColor="132, 0, 255"
                        disableAnimations={false}
                        />
                    </section>
                );
            case "projects":
                const projects = [
                    {
                    name: "Prof Dux Mini - Senior Project II",
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
                    name: "Charti",
                    description:
                        "A web-based tool that generates diagrams from text or code using the Gemini API and displays them with React Flow. It supports dark mode, and users can download their generated diagrams as PNG images.",
                    github: "https://github.com/Hasan-Shkoukani/charti",
                    },
                    {
                    name: "Spendless",
                    description:
                        "smart assistant web app that helps users generate realistic shopping/meal plans based on a budget OR estimate the total cost of a plan they've already made. It uses Google Gemini AI to intelligently handle budget estimation and plan generation.",
                    github: "https://github.com/Hasan-Shkoukani/spendless",
                    },{
                    name: "Paradise Nursery",
                    description:
                        "a mini ecommerce website that uses redux.js for the store, it was submitted and accepted by IBM in the React.js Course",
                    github: "https://github.com/Hasan-Shkoukani/Paradise-Nursery",
                    },{
                    name: "Arduino LED Rgb Strip Animations",
                    description:
                        "Arduino LED RGB Strip, with 2 animations, using C code and Tinker CAD website",
                    github: "https://www.tinkercad.com/things/1pRDMiVGglL-project",
                    },
                ];

                return (
                    <section className="content projects">
                    <h2>Projects</h2>
                    <p>Check out my latest projects showcasing my work and expertise.</p>

                    <div className="projects-grid">
                        {projects.map((project, index) => (
  
                        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(12, 127, 199, 0.97)">
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
                        </SpotlightCard>
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