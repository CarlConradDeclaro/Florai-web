"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef, MouseEventHandler } from "react";
import { motion } from "framer-motion";

function HeroSection() {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const plantRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);

    // Simple parallax effect for the plant image
    const handleMouseMove = (e: MouseEvent) => {
      if (!plantRef.current) return;

      const xValue = (e.clientX - window.innerWidth / 2) / 30;
      const yValue = (e.clientY - window.innerHeight / 2) / 30;

      plantRef.current.style.transform = `translateX(${xValue}px) translateY(${yValue}px) rotate(${xValue / 10}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Floating animation for the plant
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-green-50 to-white">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-green-200/30 to-blue-200/20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 0.4,
              scale: 1,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h4 className="text-green-600 font-medium mb-2 text-lg tracking-wide">
                Your Plant Care Revolution
              </h4>
            </motion.div>

            <motion.h1
              className="font-bold text-4xl md:text-5xl lg:text-6xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-500 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Intelligent Plant Care
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
                Powered by AI
              </span>
            </motion.h1>

            <motion.p
              className="text-gray-600 text-lg mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              Your intelligent companion for plant identification and care. Get
              instant answers about any plant with our advanced AI technology
              that adapts to your garden's unique needs.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <motion.button
                className="bg-gradient-to-r from-green-500 to-teal-400 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                onClick={() => router.push("/features/chat-ai")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Plant Assistant</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>

              <motion.button
                className="text-green-600 font-semibold py-3 px-8 rounded-full border-2 border-green-500 hover:bg-green-50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>

            <motion.div
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-green-300 to-blue-300 border-2 border-white"
                  />
                ))}
              </div>
              <span className="text-gray-600">
                <span className="font-bold text-green-600">2,000+</span> plant
                species recognized
              </span>
            </motion.div>
          </motion.div>

          {/* Right column - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-300/20 rounded-full blur-3xl" />

            <motion.div
              className="relative z-10"
              initial={{ y: 20 }}
              animate={floatingAnimation}
              ref={plantRef}
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-teal-300 rounded-full blur opacity-30"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <Image
                  src={require("@/public/mainBg.jpg")}
                  alt="AI Plant Care"
                  className="relative z-10 drop-shadow-2xl rounded-2xl"
                  priority
                />
              </div>

              {/* 3D effect elements */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-teal-300/50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] rounded-full border border-green-300/30"
                animate={{
                  scale: [1.1, 1.3, 1.1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
