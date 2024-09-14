import Image from "next/image";
import React from "react";

function Companies() {
  return (
    <div className="flex flex-col items-center justify-center text-gray-400 text-2xl font-bold min-h-[11vh] p-4 md:flex-row">
      Trusted by:  
      <ul className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0 md:ml-10 md:justify-between">
        {[1, 2, 3, 4, 5].map((num) => (
          <li key={num} className="relative h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24">
            <Image src={`/trusted${num}.png`} alt="trusted brands" fill />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Companies;
