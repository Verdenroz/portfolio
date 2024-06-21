import React from 'react';
import TopBar from './components/TopBar.js';
import Profile from './components/Profile.js';
import About from './components/About.js';
import Projects from './components/Projects.js';
import Contact from './components/Contact.js';
import BottomBar from './components/BottomBar.js';

function App() {
  return (
      <div className="App">
        <header> <TopBar /> </header>
        <main>
          <Profile />
          <About />
          <Projects />
          <Contact />
        </main>
        <BottomBar />
      </div>
  );
}

export default App;
