"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";

const FeatureCard = ({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: StaticImageData;
}) => {
  return (
    <div className="flex h-[180px] w-[400px] shadow-2xl rounded-2xl p-3">
      <div className="flex flex-col justify-center  p-5">
        <Image src={url} alt="logo" className="w-8 h-8" />
        <h1 className="mt-3 mb-3 font-bold">{title}</h1>
        <p className="text-[12px] text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
