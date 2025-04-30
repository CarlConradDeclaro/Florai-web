"use client";

import React from "react";
import FeatureCard from "./FeatureCard";
import plantRecognitionIcon from "@/public/plantRecognation.png";
import aiAssistant from "@/public/aiAssistant.png";
import growthDetection from "@/public/growthDetection.png";
import camera from "@/public/camera.png";
import search from "@/public/search.png";
import bulb from "@/public/bulb.png";

import Image from "next/image";
import How_It_Works_Card from "./How-It-Works-Card";
import Chat_Ai_Export from "./Chat-AI-Expert";
import Categories from "./Categories";
import Recommendation_Plants from "./Recommendation-plants";

function FeatureSection() {
  return (
    <div className="max-w-7xl mx-auto px-5 mt-10">
      <div className="flex justify-center">
        <h1 className="font-bold flex items-center p-5">
          AI-Powered Plant Care Features
        </h1>
      </div>
      <div className="flex justify-between">
        <FeatureCard
          title="Instant Plant Recognation"
          description="Upload or scan any plant for immediate identification with 99.9% accuracy"
          url={plantRecognitionIcon}
        />
        <FeatureCard
          title="AI Plant Care Assistant"
          description="Get AI-powered personalized care schedules based on your environment"
          url={aiAssistant}
        />
        <FeatureCard
          title="Growth Prediction"
          description="Advanced AI algorithms predict and track your plants growth patterns"
          url={growthDetection}
        />
      </div>
      <div className="mt-[100px]  ">
        <div className="flex justify-center">
          <h1 className="font-bold flex items-center p-5">How It Works</h1>
        </div>
        <div className="flex justify-between mt-5">
          <How_It_Works_Card
            image={camera}
            title="Take a Photo"
            description="  Snap a picture of any plant you want to identify"
          />

          <How_It_Works_Card
            image={search}
            title="Get Instant Results"
            description="    Our AI analyzes the image and provides accurate identification"
          />
          <How_It_Works_Card
            image={bulb}
            title="Learn & Care"
            description="    Access detailed care instructions and growing tips"
          />
        </div>
      </div>
      <div className="flex flex-col items-center  mt-[100px]  bg-[#F9FAFB]">
        <div className="flex justify-center">
          <h1 className="font-bold flex items-center p-5">
            Chat with AI Plant Expert
          </h1>
        </div>
        <div className="flex justify-center p-5 w-full">
          <Chat_Ai_Export />
        </div>
      </div>
      <div className="mt-[100px] mb-10">
        <Categories />
      </div>
      <div className="mt-[100px] mb-[100px] ">
        <Recommendation_Plants />
      </div>
    </div>
  );
}

export default FeatureSection;
