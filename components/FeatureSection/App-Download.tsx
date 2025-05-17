"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import {
  ArrowDown,
  Check,
  Download,
  Smartphone,
  Leaf,
  Sun,
  Droplets,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";

const AppDownload = () => {
  const containerRef = useRef(null);
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: any) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const features = [
    {
      icon: <Leaf size={18} className="text-green-700" />,
      title: "Instant Plant Identification",
      description:
        "Take a photo and get accurate results in seconds with our AI technology",
    },
    {
      icon: <Sun size={18} className="text-green-700" />,
      title: "Personalized Care Guides",
      description:
        "Get custom care tips based on your plant species and local climate",
    },
    {
      icon: <Droplets size={18} className="text-green-700" />,
      title: "Plant Health Diagnosis",
      description:
        "Identify and fix common plant problems with our AI assistant",
    },
    {
      icon: <Check size={18} className="text-green-700" />,
      title: "Community of Plant Enthusiasts",
      description:
        "Connect with other plant lovers to share tips and showcase your collection",
    },
  ];

  return (
    <motion.div
      ref={containerRef}
      className="bg-gradient-to-b from-green-50 to-white w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 py-20 relative">
        {/* Background Elements */}
        <motion.div
          className="absolute -top-20 -left-20 w-64 h-64 bg-green-100 rounded-full opacity-30 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-0 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 1.5,
          }}
        />

        {/* Hero Section */}
        <motion.div
          className="text-center mb-16 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-800 to-emerald-500 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Meet Your Plant Care Companion
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Identify plants, get care tips, and build your green thumb with our
            AI-powered app
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </motion.button>

            <motion.button
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-left">
                <div className="text-xs">GET IT ON</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* App Showcase */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <motion.div className="md:w-1/2" style={{ opacity, scale }}>
            <div className="relative flex justify-center z-10">
              <motion.div
                className="transform -rotate-3 mr-4 "
                initial={{ x: -100, opacity: 0, rotateZ: -10 }}
                animate={{ x: 0, opacity: 1, rotateZ: -3 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                  delay: 0.2,
                }}
                whileHover={{ y: -10, rotateZ: -5 }}
              >
                <Image
                  src={require("@/public/appView1.png")}
                  alt="PlantPal app screenshot"
                  className="rounded-[32px]"
                />
              </motion.div>
              <motion.div
                className="transform rotate-3  "
                initial={{ x: 100, opacity: 0, rotateZ: 10 }}
                animate={{ x: 0, opacity: 1, rotateZ: 3 }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                  delay: 0.4,
                }}
                whileHover={{ y: -10, rotateZ: 5 }}
              >
                <Image
                  src={require("@/public/appView2.png")}
                  alt="PlantPal app screenshot"
                  className="rounded-[32px]"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            ref={featuresRef}
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h2
              className="text-3xl font-bold bg-gradient-to-r from-green-800 to-emerald-500 bg-clip-text text-transparent mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Why Plant Lovers Choose Our App
            </motion.h2>

            <div className="space-y-6">
              <AnimatePresence>
                {isInView &&
                  features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 bg-white/50 p-4 rounded-xl backdrop-blur-sm border border-green-100 hover:border-green-200 transition-all"
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={featureVariants}
                      whileHover={{ x: 5 }}
                    >
                      <motion.div
                        className="mt-1 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        {feature.icon}
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-lg text-green-800">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>
            </div>

            <motion.div
              className="mt-10 p-5 bg-white/70 backdrop-blur-sm rounded-xl border border-green-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <h3 className="font-semibold text-lg mb-2 text-green-800">
                Download Today
              </h3>
              <p className="text-gray-600 mb-4">
                Join over 2 million plant lovers using PlantPal
              </p>

              <div className="flex flex-wrap gap-6 items-center">
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex">
                    <motion.div
                      className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-white z-30"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      <span className="text-xs">🌟</span>
                    </motion.div>
                    <motion.div
                      className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-white -ml-2 z-20"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 1.5,
                        delay: 0.2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      <span className="text-xs">🌟</span>
                    </motion.div>
                    <motion.div
                      className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-white -ml-2 z-10"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 1.5,
                        delay: 0.4,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      <span className="text-xs">🌟</span>
                    </motion.div>
                  </div>
                  <div className="text-sm">
                    <span className="font-bold">4.8/5</span> App Store Rating
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <Download size={20} className="text-green-700" />
                  <div className="text-sm">
                    <span className="font-bold">2M+</span> Downloads
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="bg-gradient-to-br from-green-100 to-emerald-50 p-10 rounded-3xl relative overflow-hidden shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            {/* Decorative Elements */}
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full filter blur-3xl opacity-50 -mr-20 -mt-20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />

            <motion.div
              className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-100 rounded-full filter blur-3xl opacity-40 -ml-10 -mb-10"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 2,
              }}
            />

            <motion.h2
              className="text-3xl md:text-4xl font-bold text-green-800 mb-4 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to start your plant journey?
            </motion.h2>

            <motion.p
              className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Download our app today and transform the way you care for your
              plants. It's free!
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 relative z-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-700 to-emerald-600 text-white px-8 py-4 rounded-xl shadow-lg"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Smartphone size={20} />
                <span>Download Now</span>
              </motion.button>

              <motion.button
                className="flex items-center justify-center gap-2 bg-white text-green-700 border border-green-200 px-8 py-4 rounded-xl shadow-md"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <span>Learn More</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown size={20} />
                </motion.div>
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AppDownload;
