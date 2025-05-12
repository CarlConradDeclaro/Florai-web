"use client";

import FeatureSection from "@/components/FeatureSection";
import AppDownload from "@/components/FeatureSection/App-Download";
import HeroSection from "@/components/HeroSection";
import React, { useEffect, useState } from "react";

function index() {
  return (
    <div className={`min-h-screen transition-all duration-300 `}>
      <div>
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
