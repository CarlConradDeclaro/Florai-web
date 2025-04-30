import FeatureSection from "@/components/FeatureSection";
import AppDownload from "@/components/FeatureSection/App-Download";
import HeroSection from "@/components/HeroSection";
import React from "react";

function index() {
  return (
    <div>
      <div className="p-5">
        <HeroSection />
      </div>
      <div>
        <FeatureSection />
      </div>
      <div className="mt-[200px]">
        <AppDownload />
      </div>
    </div>
  );
}

export default index;
