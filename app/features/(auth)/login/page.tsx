"use client";

import { UserForm } from "@/types/user";
import { login } from "@/service/Auth";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const [userForm, setUserForm] = useState<UserForm>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (field: string, value: string) => {
    setUserForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await login(userForm);

      if (response?.data) {
        router.push("/features/homepage");
      }
      console.log("User:", response?.data.email);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Login container */}
      <div className="relative w-full max-w-md mx-auto flex flex-col justify-center px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex justify-center"
        >
          <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ rotate: 3 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              onClick={() => router.push("/features/homepage/")}
            >
              <Image
                src={require("@/public/floraiLogo.png")}
                alt="logo"
                className="rounded-full w-15 h-15"
              />
            </motion.div>
            <motion.span
              className="ml-2 text-xl font-medium text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              FlorAI
            </motion.span>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={mounted ? "visible" : "hidden"}
          className="bg-white rounded-xl p-8 shadow-sm border border-gray-100"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <h1 className="text-2xl font-medium text-gray-800">Sign in</h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back to FlorAI</p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full py-2 px-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  placeholder="name@example.com"
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <motion.a
                  href="#"
                  className="text-xs text-green-600 hover:text-green-700"
                  whileHover={{ x: 2 }}
                >
                  Forgot password?
                </motion.a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full py-2 px-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  placeholder="••••••••"
                  onChange={(e) => handleChange("password", e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6">
            <motion.button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-2 px-4 bg-green-600 text-white rounded-md shadow-sm font-medium transition-all duration-200"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span>Signing in</span>
                </div>
              ) : (
                "Sign in"
              )}
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <motion.a
              href="/features/register"
              className="text-green-600 font-medium hover:text-green-700"
              whileHover={{ x: 1 }}
            >
              Sign up
            </motion.a>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <motion.div
            className="inline-flex items-center space-x-4 opacity-50"
            whileHover={{ opacity: 0.7 }}
          >
            <motion.a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Privacy
            </motion.a>
            <motion.div className="w-1 h-1 rounded-full bg-gray-300" />
            <motion.a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Terms
            </motion.a>
            <motion.div className="w-1 h-1 rounded-full bg-gray-300" />
            <motion.a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Help
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
