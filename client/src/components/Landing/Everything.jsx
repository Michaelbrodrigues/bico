import Image from "next/image";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";

function Everything() {
  const everythingData = [
    {
      title: "Stick to your budget",
      subtitle:
        "Find the right service for every price point. No hourly rates, just project-based pricing.",
    },
    {
      title: "Get quality work done quickly",
      subtitle:
        "Hand your project over to a talented freelancer in minutes, get long-lasting results.",
    },
    {
      title: "Pay when you're happy",
      subtitle:
        "Upfront quotes mean no surprises. Payments only get released when you approve.",
    },
    {
      title: "Count on 24/7 support",
      subtitle:
        "Our round-the-clock support team is available to help anytime, anywhere.",
    },
  ];

  return (
    <div className="bg-[#f1fdf7] py-10 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-24 flex flex-col lg:flex-row justify-between gap-10">
      <div className="lg:w-2/4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-5 text-[#404145] font-bold">
          Why choose Gigger.
        </h2>
        <ul className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
          {everythingData.map(({ title, subtitle }) => (
            <li key={title}>
              <div className="flex gap-2 items-center text-lg sm:text-xl">
                <BsCheckCircle className="text-[#62646a]" />
                <h4>{title}</h4>
              </div>
              <p className="text-[#62646a] text-sm sm:text-base">{subtitle}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative h-48 sm:h-80 lg:h-96 lg:w-2/4 w-full">
        <Image src="/everything2.jpg" fill alt="everything" className="rounded-sm object-cover" />
      </div>
    </div>
  );
}

export default Everything;
