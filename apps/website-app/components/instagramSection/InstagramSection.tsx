"use client"; 

import React from "react";
import Image from "next/image"; 
import Link from "next/link"; 

const instagramImages = [
  {
    id: 1,
    image: "/insta-1.png",
    link: "https://www.instagram.com/",
  },
  {
    id: 2,
    image: "/insta-2.png",
    link: "https://www.instagram.com/",
  },
  {
    id: 3,
    image: "/insta-3.png",
    link: "https://www.instagram.com/",
  },
  {
    id: 4,
    image: "/insta-4.png",
    link: "https://www.instagram.com/",
  },
];

// ... (previous imports)

const InstagramSection = () => {
    return (
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {/* First two Instagram Images */}
          {instagramImages.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-md"
            >
              <Image
                src={item.image}
                alt="Instagram image"
                width={364}
                height={370}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={item.link} target="_blank" rel="noopener noreferrer">
                  <div className="bg-white text-black rounded-full w-14 h-14 flex items-center justify-center text-lg hover:bg-gray-200 transition-colors">
                    <i className="fa-brands fa-instagram" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
  
          {/* Updated Middle Instagram Banner */}
          <div className="flex flex-col items-center justify-center text-center bg-white border border-[#010f1c] p-6">
            <div className="mb-10">
              <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/insta-icon.png"
                  alt="Instagram icon"
                  width={136}
                  height={136}
                  className="mx-auto"
                />
              </Link>
            </div>
            <div className="tp-instagram-banner-content">
              <span className="block text-lg text-gray-500 mb-2">Follow Us on</span>
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-3xl font-bold text-[#021d35] hover:text-[#821f40] "
              >
                Instagram
              </Link>
            </div>
          </div>
  
          {/* Last two Instagram Images */}
          {instagramImages.slice(2).map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden rounded-md"
            >
              <Image
                src={item.image}
                alt="Instagram image"
                width={364}
                height={370}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={item.link} target="_blank" rel="noopener noreferrer">
                  <div className="bg-white text-black rounded-full w-14 h-14 flex items-center justify-center text-lg hover:bg-gray-200 transition-colors">
                    <i className="fa-brands fa-instagram" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default InstagramSection;
  
