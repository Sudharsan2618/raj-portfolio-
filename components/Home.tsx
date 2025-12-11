import React from 'react';
import Hero from './Hero';
import LegacyVideo from './LegacyVideo';
import About from './About';
import Gallery from './Gallery';
import Programs from './Programs';
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
            <Programs />
            <Legacy />
            <Initiatives />
            <Contact />
        </>
    );
};

export default Home;

