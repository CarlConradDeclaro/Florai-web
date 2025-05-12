"use client";

import Sidebar from "@/components/chat-ai/sidebar";
import { Plant } from "@/types/Plant";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { IoMenu } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { useRouter } from "next/navigation";
import withAuth from "@/lib/withAuth";
import { motion, AnimatePresence } from "framer-motion";

// Define conversation message types
interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: Date;
  // For AI messages that contain plant data
  introMarkdown?: string;
  jsonPlants?: Plant[];
  summaryMarkdown?: string;
  status?: string;
}

// Interface for API response
interface ApiResponse {
  introduction: string;
  relevant_plants: Plant[];
  summary: string;
}

const Chat_Ai = () => {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>("");
  const [conversations, setConversations] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [closeSidebar, setCloseSidebar] = useState(false);

  // Animation states for simulated streaming
  const [isShowingIntro, setIsShowingIntro] = useState(false);
  const [isShowingPlants, setIsShowingPlants] = useState(false);
  const [isShowingSummary, setIsShowingSummary] = useState(false);
  const [currentAiMessageId, setCurrentAiMessageId] = useState<string | null>(
    null
  );

  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom whenever conversations change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  const handlePrompt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && prompt.trim()) {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (!prompt.trim() || isLoading) return;

    // Add user message to conversations
    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: prompt,
      timestamp: new Date(),
    };

    setConversations((prevConversations) => [
      ...prevConversations,
      newUserMessage,
    ]);

    // Clear input field
    setPrompt("");

    // Start fetching AI response
    fetchResponse(prompt);
  };

  const fetchResponse = async (userPrompt: string) => {
    setIsLoading(true);

    // Create a placeholder for AI response
    const aiMessageId = (Date.now() + 1).toString();
    setCurrentAiMessageId(aiMessageId);

    const aiMessage: Message = {
      id: aiMessageId,
      sender: "ai",
      content: "",
      timestamp: new Date(),
      status: "processing...",
    };

    setConversations((prev) => [...prev, aiMessage]);

    try {
      const res = await fetch(`http://localhost:8000/ai-deepseek2_json/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          new_message: userPrompt,
          conversation: conversations,
        }),
      });

      if (!res.ok) {
        updateAIMessage(aiMessageId, {
          status: "Error fetching response ❌",
        });
        setIsLoading(false);
        return;
      }

      const data: ApiResponse = await res.json();

      // Simulate streaming with staggered reveal

      // First show the intro with typing effect
      updateAIMessage(aiMessageId, {
        status: "processing...",
      });
      setIsShowingIntro(true);

      // After a delay, update with the intro
      setTimeout(() => {
        updateAIMessage(aiMessageId, {
          introMarkdown: data.introduction,
          status: "Finding the best plants for you...",
        });

        // After another delay, show the plants
        setTimeout(() => {
          setIsShowingPlants(true);
          updateAIMessage(aiMessageId, {
            jsonPlants: data.relevant_plants,
            status: "processing...",
          });

          // After plants are shown, show the summary
          setTimeout(() => {
            setIsShowingSummary(true);
            updateAIMessage(aiMessageId, {
              summaryMarkdown: data.summary,
              status: "done ✅",
            });
            setIsLoading(false);

            // Reset animation states after a delay
            setTimeout(() => {
              setIsShowingIntro(false);
              setIsShowingPlants(false);
              setIsShowingSummary(false);
              setCurrentAiMessageId(null);
            }, 1000);
          }, 1500); // Delay before summary
        }, 1200); // Delay before plants
      }, 1000); // Delay before intro
    } catch (error) {
      console.error("Error:", error);
      updateAIMessage(aiMessageId, {
        status: "error ❌",
      });
      setIsLoading(false);
    }
  };

  const updateAIMessage = (id: string, updates: Partial<Message>) => {
    setConversations((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg))
    );
  };

  // Render a message based on its type
  const renderMessage = (message: Message, index: number) => {
    const isCurrentMessage = message.id === currentAiMessageId;

    if (message.sender === "user") {
      return (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex justify-end items-center gap-2 mb-4"
        >
          <motion.div
            className="bg-[#40916C] text-white p-3 rounded-lg max-w-[70%] shadow-lg border border-green-300"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <p>{message.content}</p>
          </motion.div>
          <motion.div
            className="bg-green-300 rounded-full w-8 h-8 flex items-center justify-center shadow-md"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-white font-bold">U</span>
          </motion.div>
        </motion.div>
      );
    } else {
      // AI message
      return (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex justify-start items-start gap-2 mb-4"
        >
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image
              src={require("@/public/ai-logo.png")}
              alt="logo"
              className="rounded-full w-10 h-10 shadow-md"
            />
          </motion.div>
          <motion.div
            className="bg-[#F3F4F6] text-black p-3 rounded-lg max-w-[70%] shadow-lg border border-gray-300"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <div className="p-4 overflow-y-auto">
              <motion.div
                className="text-sm text-gray-500 italic mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {message.status}
              </motion.div>

              {/* Intro */}
              {message.introMarkdown && (
                <motion.div
                  className="prose prose-sm max-w-none text-gray-800 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <ReactMarkdown>{message.introMarkdown}</ReactMarkdown>
                </motion.div>
              )}

              {/* Simulated typing effect for current message */}
              {isCurrentMessage && isShowingIntro && !message.introMarkdown && (
                <motion.div
                  className="flex items-center space-x-2 text-gray-400 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.span
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      transition: {
                        repeat: Infinity,
                        duration: 1.5,
                      },
                    }}
                  >
                    processing...
                  </motion.span>
                </motion.div>
              )}

              {/* Loading placeholder */}
              {message.status === "Finding the best plants for you..." && (
                <motion.div
                  className="flex items-center space-x-2 text-gray-400 italic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span>Finding the best plants for you</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      transition: {
                        repeat: Infinity,
                        duration: 1.5,
                      },
                    }}
                  >
                    ...
                  </motion.span>
                </motion.div>
              )}

              {/* Plant Cards */}
              {message.jsonPlants && message.jsonPlants.length > 0 && (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, staggerChildren: 0.1 }}
                >
                  <AnimatePresence>
                    {message.jsonPlants.map((plant, index) => (
                      <motion.div
                        key={index}
                        className="bg-white rounded-2xl shadow-md p-4 border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <motion.div
                          initial={{ scale: 0.9 }}
                          whileInView={{ scale: 1 }}
                          className="overflow-hidden rounded-xl"
                        >
                          <motion.img
                            src={plant.url}
                            alt={plant.common_name}
                            className="w-full h-48 object-cover rounded-xl mb-3 hover:scale-105 transition-transform duration-300"
                            whileHover={{ scale: 1.05 }}
                            loading="lazy"
                          />
                        </motion.div>
                        <motion.h3
                          className="text-lg font-semibold text-green-700"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                        >
                          {plant.common_name}
                        </motion.h3>
                        <motion.p
                          className="text-sm text-gray-600"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          {plant.description}
                        </motion.p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Summary */}
              {message.summaryMarkdown && (
                <motion.div
                  className="prose prose-sm max-w-none text-gray-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <ReactMarkdown>{message.summaryMarkdown}</ReactMarkdown>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      );
    }
  };

  const onClose = () => {
    setCloseSidebar(!closeSidebar);
  };

  return (
    <div className="h-screen flex flex-col">
      <motion.div
        className="flex justify-between p-5 h-[60px] shadow-lg bg-gradient-to-r from-green-800 to-green-600 text-white"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.div
          className="flex items-center h-full gap-2 cursor-pointer"
          onClick={() => router.push("/features/homepage/")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image src={require("@/public/h16.png")} alt="logo" />
          <h1 className="font-semibold text-lg">FlorAI</h1>
        </motion.div>
        <motion.div
          className="flex items-center h-full gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-lg font-medium">Plant Assistant</h1>
        </motion.div>
        <div className="flex items-center h-full gap-4"></div>
      </motion.div>

      <div className="flex flex-1 justify-center">
        {/* Chat area */}
        <motion.div
          className="w-[75%] flex flex-col bg-[#FFFFFF]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[calc(100vh-120px)]">
            {/* Welcome message if no conversations */}
            {conversations.length === 0 && (
              <motion.div
                className="flex flex-col items-center justify-center h-full text-center text-gray-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.5,
                  }}
                >
                  <Image
                    src={require("@/public/ai-logo.png")}
                    alt="logo"
                    className="rounded-full w-24 h-24 shadow-lg"
                  />
                </motion.div>
                <motion.h2
                  className="text-2xl font-semibold mb-2 mt-4 text-green-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Welcome to FlorAI!
                </motion.h2>
                <motion.p
                  className="max-w-md text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  Ask me anything about plants and gardening. I can recommend
                  plants that match your needs and preferences.
                </motion.p>
                <motion.div
                  className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200 max-w-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  <p className="text-sm text-green-800">Try questions like:</p>
                  <ul className="text-sm text-green-700 mt-2 space-y-1">
                    <li>• What are good plants for low light conditions?</li>
                    <li>• How do I care for succulents?</li>
                    <li>• Recommend pet-safe indoor plants</li>
                  </ul>
                </motion.div>
              </motion.div>
            )}

            {/* Render all conversations */}
            <AnimatePresence>
              {conversations.map((message, index) =>
                renderMessage(message, index)
              )}
            </AnimatePresence>

            {/* Dummy div for auto-scrolling */}
            <div ref={messageEndRef} />
          </div>

          {/* Input area - fixed height at the bottom */}
          <motion.div
            className="h-[60px] bg-gradient-to-r from-gray-100 to-gray-200 flex items-center p-2 space-x-2 shadow-inner"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.input
              ref={inputRef}
              type="text"
              placeholder="Type a message about plants..."
              value={prompt}
              onChange={handlePrompt}
              onKeyPress={handleKeyPress}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              whileFocus={{ scale: 1.01 }}
            />
            <motion.button
              className={`bg-gradient-to-r from-green-600 to-green-500 text-white p-2 rounded-lg flex gap-2 w-[100px] items-center justify-center shadow-md ${!prompt.trim() || isLoading ? "opacity-70 cursor-not-allowed" : "hover:from-green-700 hover:to-green-600"}`}
              onClick={sendMessage}
              disabled={!prompt.trim() || isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {isLoading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  Send
                  <IoIosSend size={18} />
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Sidebar */}
        <AnimatePresence>
          {!closeSidebar && (
            <motion.div
              className="w-[25%] bg-[#F9FAFB] shadow-lg"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <Sidebar onClose={onClose} />
            </motion.div>
          )}
        </AnimatePresence>

        {closeSidebar && (
          <motion.div
            onClick={onClose}
            className="p-4 cursor-pointer hover:bg-gray-100 rounded-full mt-4 mr-4"
            whileHover={{ scale: 1.1, backgroundColor: "#f0f9f0" }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <IoMenu size={30} className="text-green-700" />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default withAuth(Chat_Ai);
