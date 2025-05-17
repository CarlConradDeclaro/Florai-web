"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Upload,
  Check,
  X,
  AlertCircle,
  ChevronRight,
  Camera,
  Loader,
  Search,
} from "lucide-react";
import { DiseaseResult } from "@/types/Plant";
import withAuth from "@/lib/withAuth";
import { Predict_Disease } from "@/service/plant-disease-detection";

// Main component
const PlantDisease: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiseaseResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  // Process the selected file
  const processSelectedFile = (file: File) => {
    if (!file.type.match("image.*")) {
      setError("Please select an image file");
      return;
    }

    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setError(null);
    setResult(null);
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedImage) {
      setError("Please select an image first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await Predict_Disease(formData);

      if (!response.ok) {
        throw new Error("Failed to analyze image");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      if (err instanceof Error) setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset everything
  const handleReset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Get condition class based on result
  const getConditionClass = () => {
    if (!result) return "";

    const condition = result.leaf_condition.toLowerCase();
    if (condition.includes("healthy")) return "text-green-500";
    return "text-red-500";
  };

  // Get confidence level class
  const getConfidenceClass = () => {
    if (!result) return "";

    const confidence = parseFloat(result.confidence);
    if (confidence > 80) return "bg-green-500";
    if (confidence > 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Main Content */}
      <main className="flex-grow py-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Plant Disease Detection
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Upload a photo of your plant's leaves and our AI will identify any
              potential diseases or confirm its health status.
            </p>
          </motion.div>

          {/* Main Container */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Upload Section */}
            <motion.div
              className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <Upload className="mr-2 h-6 w-6 text-green-600" />
                  Upload Plant Image
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                        isDragging
                          ? "border-green-500 bg-green-50"
                          : "border-gray-300 hover:border-green-400"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileSelect}
                      />

                      <motion.div
                        className="flex flex-col items-center"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Camera className="h-12 w-12 text-green-500 mb-4" />
                        <p className="text-gray-700 font-medium mb-2">
                          Drag and drop an image here, or click to browse
                        </p>
                        <p className="text-gray-500 text-sm">
                          Supports JPG, PNG and GIF files
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <p>{error}</p>
                      </div>
                    </motion.div>
                  )}

                  {previewUrl && (
                    <motion.div
                      className="mb-6"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-700 font-medium mb-2">
                        Selected Image:
                      </p>
                      <div className="relative rounded-lg overflow-hidden aspect-video">
                        <img
                          src={previewUrl}
                          alt="Plant preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleReset}
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white p-1 rounded-full shadow-md"
                        >
                          <X className="h-5 w-5 text-gray-700" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-center">
                    <motion.button
                      type="submit"
                      className={`py-3 px-6 rounded-lg flex items-center justify-center ${
                        selectedImage
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-300 cursor-not-allowed"
                      } text-white font-semibold transition-colors`}
                      disabled={!selectedImage || isLoading}
                      whileHover={selectedImage ? { scale: 1.03 } : {}}
                      whileTap={selectedImage ? { scale: 0.97 } : {}}
                    >
                      {isLoading ? (
                        <>
                          <Loader className="animate-spin h-5 w-5 mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Search className="h-5 w-5 mr-2" />
                          Detect Disease
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div
              className="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <Leaf className="mr-2 h-6 w-6 text-green-600" />
                  Analysis Results
                </h3>

                {!result && !isLoading && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <motion.div
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="text-gray-400 mb-4"
                    >
                      <Leaf className="h-16 w-16 mx-auto" />
                    </motion.div>
                    <p className="text-gray-500 text-lg">
                      Upload an image to see disease detection results
                    </p>
                  </div>
                )}

                {isLoading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                      }}
                      className="mb-4"
                    >
                      <Loader className="h-12 w-12 text-green-500" />
                    </motion.div>
                    <p className="text-gray-700 text-lg">
                      Analyzing your plant...
                    </p>
                  </div>
                )}

                {result && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <div className="flex items-center mb-4">
                        {result.leaf_condition
                          .toLowerCase()
                          .includes("healthy") ? (
                          <Check className="h-8 w-8 text-green-500 mr-3" />
                        ) : (
                          <AlertCircle className="h-8 w-8 text-red-500 mr-3" />
                        )}
                        <h4 className="text-xl font-bold">Diagnosis Result</h4>
                      </div>

                      <div className="mb-4">
                        <p className="text-gray-600 mb-2">Condition:</p>
                        <p
                          className={`text-2xl font-bold ${getConditionClass()}`}
                        >
                          {result.leaf_condition}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-600 mb-2">Confidence:</p>
                        <div className="flex items-center">
                          <div className="flex-grow bg-gray-200 rounded-full h-4 overflow-hidden">
                            <motion.div
                              className={`h-full ${getConfidenceClass()}`}
                              initial={{ width: "0%" }}
                              animate={{ width: result.confidence }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            />
                          </div>
                          <span className="ml-3 font-semibold">
                            {result.confidence}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                      <h4 className="text-lg font-semibold mb-3">
                        Recommendations
                      </h4>
                      {result.leaf_condition
                        .toLowerCase()
                        .includes("healthy") ? (
                        <div className="text-gray-700">
                          <p className="mb-2">
                            Your plant appears to be healthy! Continue with your
                            current care routine:
                          </p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Maintain current watering schedule</li>
                            <li>Keep plant in its current light conditions</li>
                            <li>Continue regular fertilization cycle</li>
                          </ul>
                        </div>
                      ) : (
                        <div className="text-gray-700">
                          <p className="mb-2">
                            Based on the detected condition, we recommend:
                          </p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>Isolate the affected plant from others</li>
                            <li>Remove affected leaves safely</li>
                            <li>Consider appropriate treatment options</li>
                            <li>Adjust watering and sunlight exposure</li>
                          </ul>
                          <motion.div
                            className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100 flex items-center"
                            whileHover={{ scale: 1.02 }}
                          >
                            <a
                              href="#"
                              className="text-blue-600 font-medium flex items-center"
                            >
                              Learn more about treating {result.leaf_condition}
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </a>
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Additional Features */}
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Plant Care Tips
              </h3>
              <p className="text-gray-600">
                Access our comprehensive library of plant care guides and
                disease prevention tips.
              </p>
              <a
                href="#"
                className="text-green-600 font-medium flex items-center mt-4 hover:underline"
              >
                Browse guides
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Track Your Plants
              </h3>
              <p className="text-gray-600">
                Create a profile to track your plant's health history and get
                personalized recommendations.
              </p>
              <a
                href="#"
                className="text-green-600 font-medium flex items-center mt-4 hover:underline"
              >
                Get started
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Expert Consultation
              </h3>
              <p className="text-gray-600">
                Connect with plant experts for personalized advice on complex
                plant health issues.
              </p>
              <a
                href="#"
                className="text-green-600 font-medium flex items-center mt-4 hover:underline"
              >
                Find experts
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default withAuth(PlantDisease);
