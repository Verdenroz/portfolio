import React from "react";
import '../css/nav.css';

function toggleMenu() {
    const mobileNav = document.getElementById('mobile-nav-menu');
    mobileNav.classList.toggle('open');
}

export default function TopBar() {
    return (
        <div>
            <nav id="nav">
                <a href="#profile" className="logo">Harvey Tseng</a>
                <ul className="nav-links">
                    <li className="desktop-nav"><a href="#profile">Home</a></li>
                    <li className="desktop-nav"><a href="#about">About</a></li>
                    <li className="desktop-nav"><a href="#projects">Projects</a></li>
                    <li className="desktop-nav"><a href="#contact">Contact</a></li>
                    <li id="mobile-nav"><button onClick={toggleMenu}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mobile-menu"><path d="M4 6l16 0"></path><path d="M4 12l16 0"></path><path d="M4 18l16 0"></path></svg></button></li>
                </ul>
            </nav>
            <div id="mobile-nav-menu" className="mobile-nav-menu">
                <button onClick={toggleMenu} className="mobile-nav-exit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6l-12 12"></path><path d="M6 6l12 12"></path></svg></button>
                <ul className="nav-links">
                    <li><a href="#profile" onClick={toggleMenu}>Home</a></li>
                    <li><a href="#about" onClick={toggleMenu}>About</a></li>
                    <li><a href="#projects" onClick={toggleMenu}>Projects</a></li>
                    <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
                </ul>
            </div>
        </div>
    );
}