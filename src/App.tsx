import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Preloader from "./components/Preloader/Preloader";
import ReactLenis from "lenis/react";

import About from "./pages/About/About";
import Cursor from "./components/Cursor/Cursor";
import Work from "./pages/Work/Work";
import Services from "./pages/Services/Services";
import Contact from "./pages/Contact/Contact";
import HomeMobile from "./pages/mobile/Home/Home";
import NavbarMobile from "./components/Navbar/NavbarMobile";

const App = () => {
  const [loaded, setLoaded]: [boolean, Function] = useState(false);
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  return (
    <>
      {/* <ReactLenis root autoRaf> */}
      <Preloader hasLoaded={() => setLoaded(true)}></Preloader>
      {loaded && (
        <>
          {width > 700 && <Navbar></Navbar>}
          {width < 700 && <NavbarMobile></NavbarMobile>}
          {width > 700 && <Cursor></Cursor>}
          <ReactLenis root>
            <Home></Home>
            <HomeMobile></HomeMobile>
            <About></About>
            <Work></Work>
            <Services></Services>
            <Contact></Contact>
          </ReactLenis>
        </>
      )}
      {/* </ReactLenis> */}
    </>
  );
};

export default App;
