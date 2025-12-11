import React from 'react';
import Hero from './Hero';
import LegacyVideo from './LegacyVideo';
import About from './About';
import Gallery from './Gallery';
import Legacy from './Legacy';
import Initiatives from './Initiatives';
import Contact from './Contact';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <LegacyVideo />
            <About />
            <Gallery />
            <Legacy />
            <Initiatives />
            <Contact />
        </>
    );
};

export default Home;

