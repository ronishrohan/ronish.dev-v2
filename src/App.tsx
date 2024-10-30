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

const App = () => {
  const [loaded, setLoaded]: [boolean, Function] = useState(false);

  return (
    <>
      {/* <ReactLenis root autoRaf> */}
      <Preloader hasLoaded={() => setLoaded(true)}></Preloader>
      {loaded && (
        <>
          <Navbar></Navbar>
          <Cursor></Cursor>
          <ReactLenis root>
            <Home></Home>
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
