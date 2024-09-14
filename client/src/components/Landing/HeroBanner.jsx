import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function HomeBanner() {
  const router = useRouter();
  const [image, setImage] = useState(1);
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    const interval = setInterval(
      () => setImage(image >= 6 ? 1 : image + 1),
      10000
    );
    return () => clearInterval(interval);
  }, [image]);

  return (
    <div className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[680px] relative bg-cover">
      <div className="absolute top-0 right-0 w-[110vw] h-full transition-opacity z-0">
        <Image
          alt="hero"
          src="/bg-herob1.webp"
          fill
          className={`${
            image === 1 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/hiregreen.jpg"
          fill
          className={`${
            image === 2 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/paysafaly.jpg"
          fill
          className={`${
            image === 3 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/bg-hero3new.jpg"
          fill
          className={`${
            image === 4 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/bg-hero4new.jpg"
          fill
          className={`${
            image === 5 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
        <Image
          alt="hero"
          src="/bg-hero6new.jpg"
          fill
          className={`${
            image === 6 ? "opacity-100" : "opacity-0"
          } transition-all duration-1000`}
        />
      </div>

      <div className="z-10 relative flex justify-center flex-col h-full gap-5 p-4 sm:p-8 md:p-12 lg:p-20">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-snug">
          Find the perfect&nbsp;
          <i>freelance</i>
          <br />
          services for your business in New Zealand
        </h1>

        <div className="flex align-middle">
          <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
            <IoSearchOutline className="absolute text-gray-500 text-2xl flex align-middle h-full left-2" />
            <input
              type="text"
              className="h-12 sm:h-14 w-full pl-10 rounded-md rounded-r-none"
              placeholder={`Try "building mobile app"`}
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
          <button
            className="bg-[#1DBF73] text-white px-4 sm:px-6 md:px-8 lg:px-12 text-sm sm:text-lg font-semibold rounded-r-md"
            onClick={() => router.push(`/search?q=${searchData}`)}
          >
            Search
          </button>
        </div>

        <div className="text-white flex flex-col sm:flex-row gap-2 sm:gap-4">
          Popular:
          <ul className="flex gap-2 sm:gap-4 flex-wrap">
            <li
              className="text-xs sm:text-sm py-1 px-2 sm:px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
              onClick={() => router.push("/search?q=website design")}
            >
              Website Design
            </li>
            <li
              className="text-xs sm:text-sm py-1 px-2 sm:px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
              onClick={() => router.push("/search?q=wordpress")}
            >
              Wordpress
            </li>
            <li
              className="text-xs sm:text-sm py-1 px-2 sm:px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
              onClick={() => router.push("/search?q=logo design")}
            >
              Logo Design
            </li>
            <li
              className="text-xs sm:text-sm py-1 px-2 sm:px-3 border rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
              onClick={() => router.push("/search?q=ai services")}
            >
              AI Services
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;
