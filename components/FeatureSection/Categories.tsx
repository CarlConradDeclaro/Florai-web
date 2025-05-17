"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Categories = () => {
  const router = useRouter();
  return (
    <div
      className="max-w-7xl mx-auto px-5 mt-10 cursor-pointer"
      onClick={() => router.push("/features/discover")}
    >
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl ">Categories</h1>
        <h1 className="text-[#00FF94]">View All</h1>
      </div>

      <div className="flex gap-2 mt-5">
        <div className="relative">
          <Image
            src={require("@/public/outdoorPlantCate.png")}
            alt="indoor plant"
            className="rounded-2xl h-[250px]   "
          />
          <div className=" absolute bottom-10 left-5">
            <div className="flex gap-2">
              <Image
                src={require("@/public/outdoorCatIcon.png")}
                alt="indoor plant"
              />
              <h1 className="text-white font-bold">Outdoor Plants</h1>
            </div>
            <p className="text-white font-bold">248 Species</p>
          </div>
        </div>
        <div className="relative">
          <Image
            src={require("@/public/indoorPlantCate.jpg")}
            alt="indoor plant"
            className="rounded-2xl h-[250px]  object-cover"
          />
          <div className=" absolute bottom-10  left-5 ">
            <div className="flex gap-2">
              <Image src={require("@/public/h16.png")} alt="indoor plant" />
              <h1 className="text-white font-bold">Indoor Plants</h1>
            </div>
            <p className="text-white font-bold">186 Species</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
