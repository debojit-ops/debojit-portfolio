import { useState } from "react";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Experiences from "./sections/Experiences";
import Footer from './sections/Footer';
import Hero from "./sections/Hero";
import Navbar from "./sections/Navbar";
import Projects from "./sections/Projects";
import Testimonial from "./sections/Testimonial";
import LoadingScreen from "./components/LoadingScreen";

const App = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      {loaded && (
        <>
          <div className="container mx-auto max-w-7xl">
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Experiences />
            <Testimonial />
            <Contact />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
