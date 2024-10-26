import React, { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Preloader from "./components/Preloader/Preloader";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const [loaded, setLoaded]: [boolean, Function] = useState(true);
 
  return (
    <AnimatePresence>
      {/* <Preloader hasLoaded={() => setLoaded(true)}></Preloader> */}
      {loaded && (
        <>
          <Navbar></Navbar>
          <Home></Home>{" "}
        </>
      )}
    </AnimatePresence>
  );
};

export default App;
