"use client";

import React, { useEffect, useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import How_It_Works_Card from "./How-It-Works-Card";
import Chat_Ai_Export from "./Chat-AI-Expert";
import Categories from "./Categories";
import Recommendation_Plants from "./Recommendation-plants";

// Import images
import plantRecognitionIcon from "@/public/plantRecognation.png";
import aiAssistant from "@/public/aiAssistant.png";
import growthDetection from "@/public/growthDetection.png";
import camera from "@/public/camera.png";
import search from "@/public/search.png";
import bulb from "@/public/bulb.png";
import { useRouter } from "next/navigation";
import { Card } from "@/types/Plant";

function FeatureSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  const router = useRouter();

  // Intersection Observer to trigger animations when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Custom Feature Card component with animations
  const AnimatedFeatureCard = ({
    title,
    description,
    url,
    path,
    delay = 0,
  }: Card) => (
    <motion.div
      variants={itemVariants}
      className="flex-1 cursor-pointer bg-[#edfdf6] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
      onClick={() => router.push(path)}
    >
      <div className="p-6 flex flex-col items-center text-center h-full">
        <div className="relative w-20 h-20 mb-4 group">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-green-200 to-teal-100 rounded-full opacity-60"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: delay,
            }}
          />
          <div className="relative z-10">
            <Image
              src={url}
              alt={title}
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="mt-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-teal-600 font-medium flex items-center gap-1 hover:gap-2 transition-all duration-300"
          >
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  // Custom How It Works Card with animations
  const AnimatedHowItWorksCard = ({
    image,
    title,
    description,
    index,
  }: {
    image: StaticImageData;
    title: string;
    description: string;
    index: number;
  }) => (
    <motion.div
      variants={itemVariants}
      className="flex-1 flex flex-col items-center text-center relative"
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-100 to-teal-50 rounded-full -z-10"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: index * 0.5,
          }}
        />
        <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10">
          {index + 1}
        </div>
        <div className="absolute top-7 -right-full h-0.5 bg-gradient-to-r from-teal-400 to-green-200 w-full transform translate-x-3 hidden md:block"></div>
      </div>
      <div className="mt-6 mb-3">
        <div className="w-16 h-16 mx-auto">
          <Image
            src={image}
            alt={title}
            width={64}
            height={64}
            className="object-contain"
          />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );

  // Section divider component
  const SectionDivider = ({ title }: { title: string }) => (
    <div className="w-full flex flex-col items-center mb-12">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "100px" }}
        transition={{ duration: 1 }}
        className="h-1 bg-gradient-to-r from-green-400 to-teal-500 rounded-full mb-3"
      />
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-3xl font-bold text-gray-800 relative"
      >
        {title}
        <motion.span
          className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-green-400 to-teal-400"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
      </motion.h2>
    </div>
  );

  return (
    <div
      ref={sectionRef}
      className="max-w-7xl mx-auto px-6 py-20 space-y-32 overflow-hidden"
    >
      {/* Features Section */}
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="w-full"
      >
        <SectionDivider title="AI-Powered Plant Care Features" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatedFeatureCard
            title="Instant Plant Recognition"
            description="Upload or scan any plant for immediate identification with 99.9% accuracy"
            url={plantRecognitionIcon}
            delay={0}
            path="/features/plant-detection"
          />
          <AnimatedFeatureCard
            title="AI Plant Care Assistant"
            description="Get AI-powered personalized care schedules based on your environment"
            url={aiAssistant}
            delay={0.2}
            path="/features/chat-ai"
          />
          <AnimatedFeatureCard
            title="Plant Disease Detectation"
            description="Identify plant diseases instantly using AI and receive tailored care tips for healthier growth."
            url={growthDetection}
            delay={0.4}
            path="/features/plant-disease"
          />
        </div>
      </motion.div>

      {/* How It Works Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="w-full"
      >
        <SectionDivider title="How It Works" />
        <div className="relative">
          {/* Connecting lines for desktop */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-green-200 via-teal-300 to-green-200 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative z-10">
            <AnimatedHowItWorksCard
              image={camera}
              title="Take a Photo"
              description="Snap a picture of any plant you want to identify"
              index={0}
            />
            <AnimatedHowItWorksCard
              image={search}
              title="Get Instant Results"
              description="Our AI analyzes the image and provides accurate identification"
              index={1}
            />
            <AnimatedHowItWorksCard
              image={bulb}
              title="Learn & Care"
              description="Access detailed care instructions and growing tips"
              index={2}
            />
          </div>
        </div>
      </motion.div>

      {/* Chat with AI Expert Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInVariants}
        className="w-full"
      >
        <div className="bg-gradient-to-b from-green-50 to-teal-50 rounded-3xl px-6 py-12 md:px-12 md:py-16 overflow-hidden relative">
          {/* Decorative circles */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-green-200 rounded-full opacity-20"></div>
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-teal-200 rounded-full opacity-20"></div>

          <SectionDivider title="Chat with AI Plant Expert" />

          <motion.div
            className="relative z-10 mt-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Chat_Ai_Export />
          </motion.div>
        </div>
      </motion.div>

      {/* Categories Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInVariants}
        className="w-full"
      >
        <SectionDivider title="Plant Categories" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Categories />
        </motion.div>
      </motion.div>

      {/* Recommendations Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInVariants}
        className="w-full"
      >
        <SectionDivider title="Recommended Plants" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Recommendation_Plants />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default FeatureSection;
