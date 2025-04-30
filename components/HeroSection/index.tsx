"use client";

import Image from "next/image";
import React from "react";

function HeroSection() {
  return (
    <div className="flex gap-2  justify-between  max-w-7xl mx-auto px-5  ">
      <div className="flex items-center ">
        <div>
          <div className="mb-4">
            <h1 className="font-bold text-[24px]">Intelligent Plant Care</h1>
            <h1 className="font-bold text-[24px]">Powered by AI</h1>
          </div>
          <div>
            <p className="w-[70%]">
              Your intelligent companion for plant identification and care. Get
              instant answers about any plant with our advanced AI technology.
            </p>
            <button className="bg-gradient-to-r mt-3 from-[#00FF94] to-[#00E0FF] text-white font-semibold cursor-pointer py-2 px-6 rounded-full shadow-md hover:opacity-90 transition">
              Start Plant Analysis
            </button>
          </div>
        </div>
      </div>
      <div>
        <Image src={require("@/public/heroImage.png")} alt="plant image" />
      </div>
    </div>
  );
}

export default HeroSection;
