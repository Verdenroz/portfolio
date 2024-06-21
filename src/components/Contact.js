import React from 'react';
import '../css/contact.css';

export default function Contact() {
    return (
        <section id="contact">
        <div className="contact-container">
            <div className="contact-header">
                <h1>CONTACT ME 🤙</h1>
                <h2>Need a passionate self-learner? I'm available!</h2>
            </div>
            <div className="contact-links">
                <div className="contact-method">
                    <a href="mailto:harveytseng2@gmail.com"><span className="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 512 512" fill="white"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg></span></a>
                    <a href="mailto:harveytseng2@gmail.com"><h3>harveytseng2@gmail.com</h3></a>
                </div>
                <div className="contact-method">
                    <span className="contact-icon"><svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 512 512" fill="white"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg></span>
                    <h3>631-383-8305</h3>
                </div>
            </div>
        </div>
    </section>
    );
}