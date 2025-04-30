import Image, { StaticImageData } from "next/image";
import React from "react";

const PlantCard = ({
  image,
  common_name,
  sunlight,
  wateringNeeds,
}: {
  image: string;
  common_name: string;
  sunlight: string;
  wateringNeeds: string;
}) => {
  return (
    <div className="w-[250px] shadow-2xl border border-gray-300 rounded-[10px]   ">
      <Image
        src={image}
        width={100}
        height={100}
        alt="plant"
        className="h-[150px] object-cover rounded-[10px] bg-green-50 w-full "
      />
      <div className="flex flex-col gap-2 ml-5 mt-5 -2">
        <h1 className=" font-semibold">{common_name}</h1>
        <div className="flex gap-2">
          <Image src={require("@/public/sun.png")} alt="plant" />
          <p className="text-gray-400">{sunlight}</p>
        </div>
        <div className="flex gap-2">
          <Image src={require("@/public/temp.png")} alt="plant" />
          <p className="text-gray-400">{wateringNeeds}</p>
        </div>
      </div>
      <div className="flex justify-center  h-[40px] m-2">
        <button className="bg-[#ECFDF5]  w-[100%] rounded  items-center justify-center">
          <p className="text-[#10B981] font-bold"> Learn More</p>
        </button>
      </div>
    </div>
  );
};

export default PlantCard;
