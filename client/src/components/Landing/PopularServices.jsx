import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

function PopularServices() {
  const router = useRouter();
  const popularServicesData = [
    { name: "Ai Artists", label: "Add talent to AI", image: "/service1.png" },
    { name: "Logo Design", label: "Build your brand", image: "/service2.jpeg" },
    { name: "Wordpress", label: "Customize your site", image: "/service3.jpeg" },
    { name: "Voice Over", label: "Share your message", image: "/service4.jpeg" },
    { name: "Social Media", label: "Reach more customers", image: "/service5.jpeg" },
    { name: "SEO", label: "Unlock growth online", image: "/service6.jpeg" },
    { name: "Illustration", label: "Color your dreams", image: "/service7.jpeg" },
    { name: "Translation", label: "Go global", image: "/service8.jpeg" },
  ];

  return (
    <div className="mx-4 sm:mx-8 lg:mx-20 my-8 sm:my-16">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-5 text-[#404145] font-bold">
        Popular Services
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
        {popularServicesData.map(({ name, label, image }) => (
          <li
            key={name}
            className="relative cursor-pointer"
            onClick={() => router.push(`/search?q=${name.toLowerCase()}`)}
          >
            <div className="absolute z-10 text-white left-4 top-3 sm:left-5 sm:top-4">
              <span className="text-sm sm:text-base">{label}</span>
              <h6 className="font-extrabold text-xl sm:text-2xl">{name}</h6>
            </div>
            <div className="h-60 sm:h-72 lg:h-80 w-full relative">
              <Image src={image} fill alt="service" className="object-cover rounded-lg" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PopularServices;
