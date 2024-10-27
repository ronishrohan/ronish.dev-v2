import gsap from "gsap";
import { createRef, RefObject, useEffect, useState } from "react";
import { useLenis } from "lenis/react";

const Work = () => {
  return (
    <section className="min-h-screen h-fit w-screen flex flex-col p-4 mt-10">
      <div className="h-[1px] bg-black w-full"></div>
      <TextSlider></TextSlider>
    </section>
  );
};

const TextSlider = () => {
  const lenis = useLenis();
  const firstText: RefObject<HTMLDivElement> = createRef();
  const secondText: RefObject<HTMLDivElement> = createRef();
  let xPercent : any  = 0;
  const [direction, setDirection] : [number, Function] = useState(-1)

  function animate() {
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });

    xPercent +=   0.1 * direction;

    console.log(xPercent);

    if (Math.abs(xPercent) > 100) xPercent = 0;

    requestAnimationFrame(animate);
  }
  useEffect(() => {
    animate();
  });
  return (
    <>
      <div className="flex text-[15vw] font-normal  whitespace-nowrap relative w-fit">
        <div className="mr-4" ref={firstText}>MY WORKS MY WORKS</div>
        <div ref={secondText} className="left-full absolute">
          MY WORKS MY WORKS
        </div>
      </div>
    </>
  );
};

export default Work;
