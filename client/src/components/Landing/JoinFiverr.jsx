import Image from "next/image";
import React from "react";

function JoinFiverr() {
  return (
    <div className="relative mx-4 sm:mx-8 lg:mx-32 my-8 sm:my-16">
      <div className="absolute z-10 top-1/3 left-5 sm:left-10">
        <h4 className="text-white text-3xl sm:text-4xl lg:text-5xl mb-6 sm:mb-10">
          Suddenly it&apos;s all so <i>doable.</i>
        </h4>
        <button
          className="border text-sm sm:text-base font-medium px-4 sm:px-5 py-2 border-[#1DBF73] bg-[#1DBF73] text-white rounded-md"
          type="button"
        >
          Join Gigger
        </button>
      </div>
      <div className="relative w-full h-60 sm:h-80 lg:h-96">
        <Image src="/sudenly.jpg" fill alt="signup" className="rounded-sm object-cover" />
      </div>
    </div>
  );
}

export default JoinFiverr;
