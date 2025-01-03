"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";

const blogs = [
  {
    id: 1,
    title: "The 'Boomerang' Employees Returning After Quitting",
    date: "20 July, 2023",
    categories: ["Fashion", "Lifestyle", "News"],
    image: "/blog-1.png",
    link: "/blog-details/4",
  },
  {
    id: 2,
    title: "Fast fashion: How clothes are linked to climate change",
    date: "18 March, 2023",
    categories: ["Fashion", "Lifestyle", "News"],
    image: "/blog-2.png",
    link: "/blog-details/5",
  },
  {
    id: 3,
    title: "The Sound Of Fashion: Malcolm McLaren Words",
    date: "15 February, 2023",
    categories: ["Fashion", "Lifestyle", "News"],
    image: "/blog-3.png",
    link: "/blog-details/6",
  },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Blogs = () => {
  return (
    <section className="pt-28 pb-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-gray-500">Our Blog & News</span>
          <h3 className="font-semibold text-[44px] text-gray-900 leading-[1.2]">
            Latest News & Articles
          </h3>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <Card key={blog.id} className="shadow-lg">
              <div className="relative">
                {/* Blog Image */}
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-t-md"
                />
                <div className="absolute top-4 right-4 bg-white text-gray-600 px-2 py-1 text-sm rounded-md shadow-md">
                  {blog.date}
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-2">
                  {/* Categories with SVG icon */}
                  <div className="text-sm text-gray-500 mb-2 space-x-2">
                    {blog.categories.map((category, index) => (
                      <React.Fragment key={index}>
                        <a
                          onClick={scrollToTop}
                          className="relative inline-flex items-center cursor-pointer hover:text-black transition-all duration-300 group"
                        >
                          {/* SVG Icon */}
                          <span className="mr-1">
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 14 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.636 8.14182L8.14808 12.6297C8.03182 12.7461 7.89375 12.8384 7.74178 12.9014C7.58981 12.9644 7.42691 12.9969 7.26239 12.9969C7.09788 12.9969 6.93498 12.9644 6.78301 12.9014C6.63104 12.8384 6.49297 12.7461 6.37671 12.6297L1 7.25926V1H7.25926L12.636 6.37671C12.8691 6.61126 13 6.92854 13 7.25926C13 7.58998 12.8691 7.90727 12.636 8.14182V8.14182Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                              <path
                                d="M4.12964 4.12988H4.13694"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                          {category}
                          <span className="block h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                        </a>
                        {index < blog.categories.length - 1 && <span>, </span>}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Blog Title with updated styles */}
                  <h3 className="text-2xl font-normal leading-[1.33] text-gray-800 hover:text-[#821f40] transition-all duration-300 ease-out">
                    <a href={blog.link}>{blog.title}</a>
                  </h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Discover More Button */}
        <div className="text-center mt-16">
          <Button
            className="inline-block font-normal text-base bg-transparent border-[1.5px] border-[#010f1c] text-[#010f1c] px-[25px] py-[5px] hover:bg-[#821f40] hover:text-white transition-all duration-300 ease-in-out"
          >
            Discover More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
