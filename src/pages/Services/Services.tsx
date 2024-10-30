import React from "react";
import TextAppearWords from "../../components/Text/TextAppearWords";

const Services = () => {
  return (
    <section className="h-fit w-screen p-4 flex flex-col">
      <div className="h-[1px] w-full bg-black mt-10 mb-4"></div>
      <div className="text-center w-full text-[13vw] leading-[14vw] flex gap-[4vw] justify-center">
        WHAT I{" "}
        <span className="italic">
          <TextAppearWords>OFFER</TextAppearWords>
        </span>
      </div>
      <div className="h-[200vh] flex relative gap-4  pt-[200px]">
        <div className="w-1/2 shrink-0 h-full rounded-lg overflow-hidden">
          <div className="size-full bg-gradient-to-t from-red-600 to-blue-500"></div>
        </div>
        <div className="w-1/2 shrink-0 h-screen sticky top-0 flex items-center justify-center">
          test
        </div>
      </div>
    </section>
  );
};

export default Services;
