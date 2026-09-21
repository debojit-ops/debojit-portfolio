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
import { createContext, useContext } from "react";

const HiddenProjectsContext = createContext();

export const useHiddenProjects = () => {
  const context = useContext(HiddenProjectsContext);
  if (!context) {
    throw new Error("useHiddenProjects must be used within HiddenProjectsProvider");
  }
  return context;
};

const HiddenProjectsProvider = ({ children }) => {
  const [showHidden, setShowHidden] = useState(false);
  
  return (
    <HiddenProjectsContext.Provider value={{ showHidden, setShowHidden }}>
      {children}
    </HiddenProjectsContext.Provider>
  );
};

const App = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <HiddenProjectsProvider>
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
    </HiddenProjectsProvider>
  );
};

export default App;
