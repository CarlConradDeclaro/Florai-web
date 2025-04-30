"use client";

import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="flex p-5 justify-between border border-gray-100  rounded">
      <div className="flex gap-2 items-center">
        <Image src={require("@/public/h16.png")} alt="logo" className="" />
        <h1 className="font-bold">FlorAI</h1>
      </div>

      <div className="flex gap-10">
        <div className="flex gap-2 items-center">
          <Image src={require("@/public/home.png")} alt="logo" className="" />
          <h1 className="font-extralight">Home</h1>
        </div>
        <div className="flex gap-2 items-center">
          <Image
            src={require("@/public/discover.png")}
            alt="logo"
            className=""
          />
          <h1 className="font-extralight">Discover</h1>
        </div>
        <div className="flex gap-2 items-center">
          <Image
            src={require("@/public/scanner.png")}
            alt="logo"
            className=""
          />
          <h1 className="font-extralight">AI Scanner</h1>
        </div>
        <div className="flex gap-2 items-center">
          <Image
            src={require("@/public/collection.png")}
            alt="logo"
            className=""
          />
          <h1 className="font-extralight">Collections</h1>
        </div>
        <div className="flex gap-2 items-center">
          <Image
            src={require("@/public/community.png")}
            alt="logo"
            className=""
          />
          <h1 className="font-extralight">Download</h1>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex gap-2 items-center">
          <Image src={require("@/public/notif.png")} alt="logo" className="" />
        </div>
        <div className="flex gap-2 items-center">
          <Image src={require("@/public/search.png")} alt="logo" className="" />
        </div>
        <div className="w-8 h-8 bg-[#00FF94] rounded-full cursor-pointer"></div>
      </div>
    </div>
  );
}

export default Header;
