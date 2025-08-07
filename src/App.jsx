import React, { useEffect, useState } from "react";
import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import StartScreen from "./components/StartScreen"; // 👈 Start screen after loading

const App = () => {
  const [loading, setLoading] = useState(true);   // for loading screen
  const [visible, setVisible] = useState(true);   // for fade effect
  const [started, setStarted] = useState(false);  // for start screen

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
        setTimeout(() => setVisible(false), 1000); // fade out
      }, 2000); // simulate loading delay
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  // Phase 1: Loading screen
  if (!started) {
    return <StartScreen onStart={() => setStarted(true)} />;
  }
  if (loading || visible) {
    return (
      <div className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center bg-white dark:bg-black transition-opacity duration-700">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50" />
      </div>
    );
  }

  // Phase 2: Start screen (after loading)
  

  // Phase 3: Main App
  return (
    <>
      <Navbar />
      <Hero />
      {/* <ShowcaseSection /> */}
      <LogoShowcase />
      <FeatureCards />
      {/* <Experience /> */}
      <TechStack />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
      <p className="flex-center mb-2">call me: 01550565354</p>
    </>
  );
};

export default App;
