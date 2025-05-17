"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Upload,
  Loader,
  X,
  Search,
  RefreshCw,
  Leaf,
  ChevronRight,
  Info,
  CircleCheck,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import withAuth from "@/lib/withAuth";
import {
  Classify_Plant,
  Get_Predicted_Plant,
} from "@/service/plant-classification";

const PlantDetection: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<{
    flower_name: string;
    confidence: string;
  } | null>(null);
  const [plantInfo, setPlantInfo] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("upload");
  const [cameraReady, setCameraReady] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize canvas element
  useEffect(() => {
    if (showCamera && !canvasRef.current) {
      const canvas = document.createElement("canvas");
      canvasRef.current = canvas;
    }
  }, [showCamera]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
      setResult(null);
      setPlantInfo(null);
      setError(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setResult(null);
      setPlantInfo(null);
      setError(null);
    }
  };

  const toggleCamera = async () => {
    if (showCamera) {
      stopCamera();
    } else {
      setShowCamera(true);
      setPreview(null);
      setFile(null);
      setResult(null);
      setPlantInfo(null);
      setError(null);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // Prefer rear camera if available
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setCameraReady(true);
          };
        }
      } catch (err) {
        setError("Could not access camera. Please check permissions.");
        setShowCamera(false);
      }
    }
  };

  const stopCamera = () => {
    setShowCamera(false);
    setCameraReady(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  const takePhoto = () => {
    if (!videoRef.current || !cameraReady) {
      setError("Camera is not ready yet. Please wait.");
      return;
    }

    const video = videoRef.current;

    // Create canvas if it doesn't exist
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) {
      setError("Could not create image context.");
      return;
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to file
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError("Failed to capture image.");
          return;
        }

        const capturedFile = new File([blob], "camera_capture.jpg", {
          type: "image/jpeg",
        });

        setFile(capturedFile);
        setPreview(URL.createObjectURL(blob));
        stopCamera();
      },
      "image/jpeg",
      0.9
    ); // 90% quality JPEG
  };

  const classifyImage = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await Classify_Plant(formData);

      if (!response.ok) {
        throw new Error(`Classification failed: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);

      // Once we have the flower name, get details
      if (data.flower_name) {
        getPlantDetails(data.flower_name);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getPlantDetails = async (flowerName: string) => {
    try {
      const response = await Get_Predicted_Plant(flowerName);

      if (!response.ok) {
        throw new Error(`Failed to get plant details: ${response.statusText}`);
      }

      const data = await response.json();
      setPlantInfo(data);
    } catch (err) {
      console.error("Error getting plant details:", err);
    }
  };

  const resetAll = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setPlantInfo(null);
    setError(null);
    stopCamera();
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const resultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center mb-10"
      >
        <div className="bg-white rounded-full p-3 shadow-lg shadow-emerald-100">
          <Leaf className="text-emerald-500 w-6 h-6" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight ml-3">
          Flor<span className="text-emerald-500">AI</span>
        </h1>
      </motion.div>

      {!result ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-3">
              Identify Your Plant
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Take a photo or upload an image of any plant, and our AI will
              identify it and provide detailed information.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-xl shadow-emerald-100 overflow-hidden"
          >
            <div className="flex border-b border-gray-100">
              <button
                className={`flex-1 py-4 font-medium flex items-center justify-center space-x-2 transition ${
                  activeTab === "upload"
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => {
                  setActiveTab("upload");
                  stopCamera();
                }}
              >
                <Upload className="w-5 h-5" />
                <span>Upload Image</span>
              </button>
              <button
                className={`flex-1 py-4 font-medium flex items-center justify-center space-x-2 transition ${
                  activeTab === "camera"
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => {
                  setActiveTab("camera");
                  toggleCamera();
                }}
              >
                <Camera className="w-5 h-5" />
                <span>Take Photo</span>
              </button>
            </div>

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {activeTab === "upload" && (
                  <motion.div
                    key="upload"
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                  >
                    <div
                      className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition
                        ${preview ? "border-emerald-300 bg-emerald-50" : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"}`}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {preview ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative"
                        >
                          <div className="rounded-xl overflow-hidden shadow-lg max-h-96 mx-auto">
                            <img
                              src={preview}
                              alt="Plant preview"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <button
                            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPreview(null);
                              setFile(null);
                            }}
                          >
                            <X className="w-4 h-4 text-gray-600" />
                          </button>
                        </motion.div>
                      ) : (
                        <div>
                          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                            <Upload className="w-10 h-10 text-emerald-500" />
                          </div>
                          <h3 className="text-lg font-medium text-gray-800 mb-2">
                            Drag & drop your image here
                          </h3>
                          <p className="text-gray-500 mb-4">
                            or click to browse from your device
                          </p>
                          <span className="inline-block px-4 py-2 border border-gray-300 rounded-full text-sm text-gray-500">
                            JPG, PNG, WEBP • Max 10MB
                          </span>
                        </div>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </motion.div>
                )}

                {activeTab === "camera" && (
                  <motion.div
                    key="camera"
                    variants={itemVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="relative"
                  >
                    {showCamera ? (
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-center">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            className={`rounded-full p-4 shadow-lg ${cameraReady ? "bg-white" : "bg-gray-300"}`}
                            onClick={takePhoto}
                            disabled={!cameraReady}
                          >
                            <div className="w-10 h-10 rounded-full border-4 border-emerald-600"></div>
                          </motion.button>
                        </div>
                        {!cameraReady && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
                            <div className="text-center">
                              <Loader className="w-8 h-8 animate-spin mx-auto mb-2" />
                              <p>Starting camera...</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : preview ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-2xl overflow-hidden shadow-lg"
                      >
                        <div className="relative">
                          <img
                            src={preview}
                            alt="Captured plant"
                            className="w-full object-contain"
                          />
                          <button
                            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
                            onClick={() => {
                              setPreview(null);
                              setFile(null);
                              toggleCamera();
                            }}
                          >
                            <X className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="text-center p-12 border-2 border-dashed border-gray-200 rounded-2xl">
                        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                          <Camera className="w-10 h-10 text-emerald-500" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-800 mb-2">
                          Camera Access Needed
                        </h3>
                        <p className="text-gray-600 mb-6">
                          We'll need permission to use your camera to take a
                          photo
                        </p>
                        <button
                          className="px-6 py-3 bg-emerald-600 text-white rounded-full font-medium shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-colors"
                          onClick={toggleCamera}
                        >
                          Enable Camera
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-start"
                >
                  <div className="rounded-full bg-red-100 p-1 mr-3 mt-0.5">
                    <X className="w-4 h-4 text-red-600" />
                  </div>
                  <p>{error}</p>
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="mt-8">
                <button
                  className={`w-full py-4 px-6 rounded-xl font-medium text-lg flex items-center justify-center space-x-3
                    ${
                      file
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-200 hover:from-emerald-700 hover:to-teal-700"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }
                    transition-all`}
                  onClick={classifyImage}
                  disabled={!file || isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-6 h-6 animate-spin" />
                      <span>Analyzing Plant...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-6 h-6" />
                      <span>Identify Plant</span>
                    </>
                  )}
                </button>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-8 text-center text-gray-500"
          >
            <p>
              Our AI can recognize thousands of plant species with high accuracy
            </p>
          </motion.div>
        </motion.div>
      ) : (
        <AnimatePresence>
          <motion.div
            key="results"
            initial="hidden"
            animate="visible"
            variants={fadeVariants}
            className="max-w-6xl mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <motion.div variants={resultVariants}>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {result.flower_name.charAt(0).toUpperCase() +
                    result.flower_name.slice(1)}
                </h2>
                <div className="flex items-center">
                  <CircleCheck className="w-5 h-5 text-emerald-500 mr-2" />
                  <p className="text-gray-600">
                    Identified with {result.confidence} confidence
                  </p>
                </div>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                onClick={resetAll}
              >
                <RefreshCw className="w-4 h-4" />
                <span>New Scan</span>
              </motion.button>
            </div>

            <motion.div
              variants={resultVariants}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="relative">
                <div className="sticky top-8">
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                    <div className="aspect-square overflow-hidden bg-emerald-50">
                      <img
                        src={preview || ""}
                        alt="Identified plant"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-semibold text-gray-800 capitalize">
                          {result.flower_name}
                        </h3>
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                          {result.confidence}
                        </span>
                      </div>

                      <div className="mt-2 pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600 mb-1">
                          Identification confidence
                        </p>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{
                              width: result.confidence.replace("%", "") + "%",
                            }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-white rounded-3xl p-6 shadow-xl">
                    <h3 className="flex items-center text-lg font-semibold text-gray-800 mb-3">
                      <Info className="w-5 h-5 mr-2 text-emerald-500" />
                      Quick Facts
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                        Scientific family: Asteraceae
                      </li>
                      <li className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                        Native to: Northern hemisphere
                      </li>
                      <li className="flex items-center text-gray-600">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                        Blooming season: Spring to Fall
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <motion.div
                  variants={resultVariants}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden"
                >
                  <div className="border-b border-gray-100 bg-gradient-to-r from-emerald-50 to-teal-50 px-8 py-5">
                    <h3 className="text-xl font-semibold text-gray-800">
                      About this plant
                    </h3>
                  </div>

                  <div className="p-8">
                    {plantInfo ? (
                      <div className="prose prose-emerald prose-headings:font-semibold prose-headings:text-gray-800 prose-p:text-gray-600 prose-strong:text-gray-800 prose-li:text-gray-600 max-w-none">
                        <ReactMarkdown>{plantInfo}</ReactMarkdown>
                      </div>
                    ) : (
                      <div className="h-64 flex items-center justify-center">
                        <div className="text-center">
                          <Loader className="w-10 h-10 text-emerald-500 animate-spin mx-auto mb-4" />
                          <p className="text-gray-600">
                            Loading plant information...
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={resultVariants} className="mt-12 text-center">
              <button
                className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-full font-medium shadow-lg shadow-emerald-200 transition-colors"
                onClick={resetAll}
              >
                Identify Another Plant
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center text-sm text-gray-500"
      >
        <div className="flex items-center justify-center mb-2">
          <Leaf className="w-4 h-4 text-emerald-500 mr-1" />
          <p className="font-medium">FlorAI Plant Detection</p>
        </div>
        <p>Powered by advanced AI • Identify thousands of plant species</p>
      </motion.footer>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default withAuth(PlantDetection);
