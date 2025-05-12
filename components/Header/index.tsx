"use client";

import { UserTypes } from "@/types/user";
import { getUserInfo, logout } from "@/service/Auth";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import AccountMenu from "../AccountMenu";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, Menu, X } from "lucide-react";

function Header() {
  const [user, setUser] = useState<UserTypes | undefined>(undefined);
  const [activeLink, setActiveLink] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const getuserInfo = async () => {
      try {
        const response = await getUserInfo();

        if (response) {
          setUser(response?.data);
          setIsLoggedIn(true);
          console.log("login ", isLoggedIn);
        }
        console.log("user data", response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getuserInfo();
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [isLoggedIn]);

  const router = useRouter();

  // Import all icons statically to avoid dynamic require errors
  const homeIcon = require("@/public/home.png");
  const discoverIcon = require("@/public/discover.png");
  const scannerIcon = require("@/public/scanner.png");
  const collectionIcon = require("@/public/collection.png");
  const communityIcon = require("@/public/community.png");
  const pathName = usePathname();

  const navItems = [
    { name: "Home", icon: homeIcon, path: "/features/homepage/" },
    { name: "Discover", icon: discoverIcon, path: "/features/discover/" },
    {
      name: "AI Scanner",
      icon: scannerIcon,
      path: "/features/plant-detection",
    },
    {
      name: "Disease Detection",
      icon: collectionIcon,
      path: "/features/plant-disease/",
    },

    { name: "Download", icon: communityIcon, path: "/features/homepage/" },
  ];

  const handleNavigation = (path: string, name: string) => {
    setActiveLink(name);
    router.push(path);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: { type: "spring", stiffness: 300, damping: 10 },
    },
    tap: { scale: 0.95 },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      height: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
    open: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
  };

  return (
    <motion.div
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`
        sticky top-0 z-50 px-4 sm:px-6 md:px-8 py-4 
        backdrop-blur-md border-b  
            bg-white/90 text-black border-gray-100
        
        transition-all duration-300 ease-in-out
      `}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            whileHover="hover"
            whileTap="tap"
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => router.push("/features/homepage/")}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              onClick={() => setActiveLink("Home")}
            >
              <Image
                src={require("@/public/floraiLogo.png")}
                alt="logo"
                className="w-12 h-12 rounded-full"
              />
            </motion.div>
            <motion.h1
              className={`font-bold text-lg  bg-gradient-to-r from-green-700 to-emerald-500 bg-clip-text text-transparent`}
            >
              FlorAI
            </motion.h1>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex gap-6 lg:gap-8"
          >
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex gap-2 items-center cursor-pointer relative px-2 py-1 group`}
                onClick={() => handleNavigation(item.path, item.name)}
              >
                <Image src={item.icon} alt={item.name} className="w-5 h-5" />
                <span
                  className={`${activeLink === item.name ? "font-medium" : "font-extralight"} transition-all duration-200`}
                >
                  {item.name}
                </span>

                {/* Animated underline */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-0.5 w-0 bg-green-500 group-hover:w-full transition-all duration-300 ${
                    activeLink === item.name ? "w-full" : "w-0"
                  }`}
                  layoutId="underline"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-full "bg-[#3a8566]" : "bg-green-50"`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>

          {/* Right Side Icons */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-4"
          >
            <motion.div variants={itemVariants} className="ml-2">
              <AccountMenu user={user ? user : undefined} logout={logout} />
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`md:hidden mt-4 rounded-lg
              
                  ? "bg-[#3a8566]"
                  : "bg-white border border-gray-100"
               overflow-hidden shadow-lg`}
            >
              <div className="py-2">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    onClick={() => {
                      handleNavigation(item.path, item.name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex gap-3 items-center cursor-pointer px-4 py-3 ${
                      activeLink === item.name
                        ? "font-medium"
                        : "font-extralight"
                    }`}
                  >
                    <Image
                      src={item.icon}
                      alt={item.name}
                      className="w-5 h-5"
                    />
                    <span>{item.name}</span>
                  </motion.div>
                ))}

                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                {/* Mobile Menu Footer Actions */}
                <div className="flex items-center justify-around px-4 py-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-fulcursor-pointer`}
                  >
                    <Bell size={20} />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 rounded-full  cursor-pointer`}
                  >
                    <Search size={20} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Header;
