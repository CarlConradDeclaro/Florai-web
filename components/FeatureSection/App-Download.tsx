"use client";
import Image from "next/image";
import React from "react";
import { ArrowDown, Check, Download, Smartphone } from "lucide-react";

const AppDownload = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white max-w-7xl mx-auto px-5">
      <div className="max-w-7xl mx-auto px-5 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            Meet Your Plant Care Companion
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Identify plants, get care tips, and build your green thumb with our
            AI-powered app
          </p>

          <div className="flex justify-center gap-4 mt-8">
            <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </button>

            <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              <div className="text-left">
                <div className="text-xs">GET IT ON</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </button>
          </div>
        </div>

        {/* App Showcase */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <div className="relative z-10 flex justify-center">
              <div className="transform -rotate-3 mr-4  ">
                <Image
                  src={require("@/public/appView1.png")}
                  alt="PlantPal app screenshot"
                  className="rounded-[24px]"
                />
              </div>
              <div className="transform rotate-3">
                <Image
                  src={require("@/public/appView2.png")}
                  alt="PlantPal app screenshot"
                  className="rounded-[24px]"
                />
              </div>
            </div>
          </div>

          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-green-800 mb-6">
              Why Plant Lovers Choose Our App
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check size={16} className="text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Instant Plant Identification
                  </h3>
                  <p className="text-gray-600">
                    Take a photo and get accurate results in seconds with our AI
                    technology
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check size={16} className="text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Personalized Care Guides
                  </h3>
                  <p className="text-gray-600">
                    Get custom care tips based on your plant species and local
                    climate
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check size={16} className="text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Plant Health Diagnosis
                  </h3>
                  <p className="text-gray-600">
                    Identify and fix common plant problems with our AI assistant
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check size={16} className="text-green-700" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">
                    Community of Plant Enthusiasts
                  </h3>
                  <p className="text-gray-600">
                    Connect with other plant lovers to share tips and showcase
                    your collection
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-2">Download Today</h3>
              <p className="text-gray-600 mb-4">
                Join over 2 million plant lovers using PlantPal
              </p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-white z-30">
                      <span className="text-xs">🌟</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-white -ml-2 z-20">
                      <span className="text-xs">🌟</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-white -ml-2 z-10">
                      <span className="text-xs">🌟</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-bold">4.8/5</span> App Store Rating
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Download size={20} className="text-green-700" />
                  <div className="text-sm">
                    <span className="font-bold">2M+</span> Downloads
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-green-100 p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full filter blur-3xl opacity-50 -mr-20 -mt-20"></div>

            <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4 relative z-10">
              Ready to start your plant journey?
            </h2>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto relative z-10">
              Download our app today and transform the way you care for your
              plants. It's free!
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <button className="flex items-center justify-center gap-2 bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition">
                <Smartphone size={20} />
                <span>Download Now</span>
              </button>

              <button className="flex items-center justify-center gap-2 bg-white text-green-700 border border-green-700 px-8 py-3 rounded-lg hover:bg-green-50 transition">
                <span>Learn More</span>
                <ArrowDown size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
