import React from 'react';
import Hero from './Hero';
import About from './About';
import Legacy from './Legacy';
import Initiatives from './Initiatives';
import Contact from './Contact';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <About />
            <Legacy />
            <Initiatives />
            <Contact />
        </>
    );
};

export default Home;
