"use client";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="  bg-[#111827] h-[400px]">
      <div className="flex justify-around gap-4 p-15 ">
        <div>
          <div className="flex gap-3">
            <Image src={require("@/public/h16.png")} alt="logo" />
            <h1 className="text-white font-bold text-[24px] ">FlorAI</h1>
          </div>
          <h4 className="text-gray-500 mt-5">
            Revolutionizing plant care with artificial intelligence
          </h4>
        </div>

        <div>
          <h1 className="text-white font-bold text-[24px] mb-5">Resources</h1>

          <h4 className="text-gray-500">Plant Guide</h4>
          <h4 className="text-gray-500">Care Tips</h4>
          <h4 className="text-gray-500">AI Features</h4>
          <h4 className="text-gray-500">Blog</h4>
        </div>

        <div>
          <h1 className="text-white font-bold text-[24px] mb-5">Company</h1>

          <h4 className="text-gray-500">About Us</h4>
          <h4 className="text-gray-500">Careers</h4>
          <h4 className="text-gray-500">Contact</h4>
          <h4 className="text-gray-500">Press</h4>
        </div>

        <div>
          <h1 className="text-white font-bold text-[24px] mb-5">Community</h1>

          <h4 className="text-gray-500">Forum</h4>
          <h4 className="text-gray-500">Plant Gallery</h4>
          <h4 className="text-gray-500">Expert Network</h4>
          <h4 className="text-gray-500">Eve</h4>
        </div>
      </div>

      <div className="border border-gray" />

      <div className="flex justify-center mt-[50px]">
        <h1 className="text-white">© 2025 FloraAI. All rights reserved.</h1>
      </div>
    </div>
  );
};

export default Footer;
