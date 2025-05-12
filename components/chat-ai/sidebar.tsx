import Image from "next/image";
import React from "react";
import { IoMdClose } from "react-icons/io";

const Sidebar = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="p-10">
      <div className="flex justify-end cursor-pointer">
        <IoMdClose size={32} onClick={onClose} />
      </div>

      <h1 className="font-semibold pb-2">Quick Plant Care Tips</h1>

      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="shadow-2xl w-full rounded-[10px] p-3 bg-[#FFFFFF]">
          <div className="flex gap-2">
            <Image src={require("@/public/waterCan.png")} alt="icon" />
            <h1 className="font-semibold ">Watering Tips</h1>
          </div>
          <p className="text-gray-400">Check soil moisture before watering</p>
        </div>

        <div className="shadow-2xl w-full rounded-[10px] p-3 bg-[#FFFFFF]">
          <div className="flex gap-2">
            <Image src={require("@/public/sun.png")} alt="icon" />
            <h1 className="font-semibold ">Light Needs</h1>
          </div>
          <p className="text-gray-400">
            Most plants prefer bright, indirect light
          </p>
        </div>

        <div className="shadow-2xl w-full rounded-[10px] p-3 bg-[#FFFFFF]">
          <div className="flex gap-2">
            <Image src={require("@/public/temp.png")} alt="icon" />
            <h1 className="font-semibold ">Humidity</h1>
          </div>
          <p className="text-gray-400">Tropical plants love high humidity</p>
        </div>
      </div>
      <h1 className="font-semibold pt-10 pb-2">Popular Plants</h1>
      <div className="flex justify-center items-center">
        <div className="flex flex-wrap gap-3 ">
          <div className="  w-[130px] h-[130px] shadow-2xl rounded-[10px]">
            <Image src={require("@/public/plantTest.png")} alt="plant" />
            <h3 className="flex flex-col justify-center  items-center  p-2">
              Monstera
            </h3>
          </div>
          <div className="  w-[130px] h-[130px] shadow-2xl rounded-[10px]">
            <Image src={require("@/public/plantTest.png")} alt="plant" />
            <h3 className="flex flex-col justify-center  items-center  p-2">
              Monstera
            </h3>
          </div>
          <div className="  w-[130px] h-[130px] shadow-2xl rounded-[10px]">
            <Image src={require("@/public/plantTest.png")} alt="plant" />
            <h3 className="flex flex-col justify-center  items-center  p-2">
              Monstera
            </h3>
          </div>
          <div className="  w-[130px] h-[130px] shadow-2xl rounded-[10px]">
            <Image src={require("@/public/plantTest.png")} alt="plant" />
            <h3 className="flex flex-col justify-center  items-center  p-2">
              Monstera
            </h3>
          </div>
        </div>
      </div>
      <h1 className="font-semibold pt-5 pb-2">Seasonal Care Guide</h1>
      <div></div>
    </div>
  );
};

export default Sidebar;
