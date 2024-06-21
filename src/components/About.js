import React from 'react';
import '../css/about.css';
import laptop from '../assets/laptop.jpg';

export default function About() {
    return (
        <section id="about">
        <div className="about-container">
            <div className="about-img">
                <img src={laptop} alt="Laptop" className="about-img"/>
            </div>
            <div className="about-content">
                <h1>ABOUT ME 👋</h1>
                <div className="about-body">
                    <div className="about-text">
                        <h2>Senior CS Student attending SUNY Farmingdale</h2>
                        <p>I am working towards becoming an Android developer. I specialize in Kotlin and Android Studio, but I have learned other languages such as Java and Python. I am currently taking AI classes and will be working towards integrating AI within my next apps. My graduation is expected to be May 2025, where I hope to find work immediately afterwards.</p>
                    </div>
                </div>
            </div>
        </div>  
    </section>
    );
}