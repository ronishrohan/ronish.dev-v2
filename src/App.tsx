import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Preloader from "./components/Preloader/Preloader";
import ReactLenis from "lenis/react";


import { AnimatePresence } from "framer-motion";
import About from "./pages/About/About";
import Cursor from "./components/Cursor/Cursor";
import Work from "./pages/Work/Work";
import Services from "./pages/Services/Services";
import Contact from "./pages/Contact/Contact";

const App = () => {
  const [loaded, setLoaded]: [boolean, Function] = useState(false);
  
  return (
    <ReactLenis root autoRaf >
      <Preloader hasLoaded={() => setLoaded(true)}></Preloader>
      {loaded && (
        <div className="size-full relative">
          <Cursor></Cursor>
          <Navbar></Navbar>
          <Home></Home>
          <About></About>
          <Work></Work>
          <Contact></Contact>
          {/* <Services></Services> */}
        </div>
      )}
    </ReactLenis>
  );
};

export default App;
