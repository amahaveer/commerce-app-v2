"use client"; // Add this at the top for Next.js

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const reviews = [
  {
    text: "How you use the city or town name is up to you. All results may be freely used in any work.",
    user: "Theodore Handle",
    role: "CO Founder",
    rating: 4,
    avatar: "/user-2.png", // Replace with correct path
  },
  {
    text: "Very happy with our choice to take our daughter to Brave care. The entire team was great! Thank you!",
    user: "John Smith",
    role: "UI/UX Designer",
    rating: 5,
    avatar: "/user-3.png", // Replace with correct path
  },
  {
    text: "Thanks for all your efforts and teamwork over the last several months! Thank you so much",
    user: "Salim Rana",
    role: "Web Developer",
    rating: 4,
    avatar: "/user-4.png", // Replace with correct path
  },
];

const ReviewCarousel = () => {
  return (
    <section className="relative bg-[#f6f6f6] pt-32 pb-32">
      <div className="relative z-10 container mx-auto px-4">
        {/* Background Gradient Circle */}
        <span className="absolute top-[-80px] left-1/2 transform -translate-x-1/2 w-[432px] h-[432px] bg-gradient-to-b from-[#0989ff1a] via-[#f6f6f6] to-transparent rounded-full -z-10"></span>

        {/* Section Title */}
        <h3 className="text-center font-normal text-[20px] mb-12 text-gray-800">
          The Review Are In
        </h3>

        {/* Carousel */}
        <div className="flex justify-center">
          <Carousel className="relative w-full max-w-4xl">
            <CarouselContent className="relative">
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="flex justify-center">
                  <Card className="w-full max-w-xl border-none rounded-none shadow-none px-2 bg-transparent">
                    <CardContent className="flex flex-col items-center justify-center space-y-4">
                      {/* Star Rating */}
                      <div className="flex space-x-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating
                                ? "text-[#821f40]"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-center font-normal text-[30px] leading-relaxed text-black mb-8">
                        “{review.text}”
                      </p>

                      {/* User Info */}
                      <div className="flex items-center justify-center p-2 bg-white shadow-md rounded-[40px] space-x-4">
                        <img
                          src={review.avatar}
                          alt={review.user}
                          className="w-12 h-12 rounded-full"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg mb-[-2px]">
                            {review.user}
                          </h4>
                          <span className="text-sm text-gray-500">
                            {review.role}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Carousel Arrows */}
            <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:bg-[#821f40] hover:text-white hover:border-none">
              {/* Left Arrow Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-left h-4 w-4"
              >
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
              <span className="sr-only">Previous slide</span>
            </CarouselPrevious>

            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:bg-[#821f40] hover:text-white hover:border-none">
              {/* Right Arrow Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right h-4 w-4"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
              <span className="sr-only">Next slide</span>
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;
