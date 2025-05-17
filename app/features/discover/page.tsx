"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  MotionValue,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Search,
  Filter,
  Droplets,
  Sun,
  Thermometer,
  Leaf,
  Clock,
  Heart,
  Info,
  ChevronDown,
  X,
  CheckCircle,
  Flower2,
  Wind,
  PlusCircle,
  Sparkles,
  Award,
  Tag,
  Calendar,
  BookOpen,
  Maximize2,
  Minimize2,
  ShoppingBag,
} from "lucide-react";
import axios from "axios";
import debounce from "lodash/debounce";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import withAuth from "@/lib/withAuth";
import { Get_Search_Plants } from "@/service/search";

// Types for plant data
interface Plant {
  id: number;
  common_name: string;
  scientific_name: string;
  category: string;
  url: string | null;
  culinaryUse: string;
  description: string;
  humidityPreference: string;
  life_span: string;
  medicinalUses: string;
  plant_Type: string;
  sunlight: string;
  wateringNeeds: string;
}

// Category labels with colors
const categoryColors: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Indoor: {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    border: "border-emerald-200",
  },
  Outdoor: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    border: "border-blue-200",
  },
  AirPurifyingPlant: {
    bg: "bg-indigo-100",
    text: "text-indigo-800",
    border: "border-indigo-200",
  },
  WaterPlants: {
    bg: "bg-cyan-100",
    text: "text-cyan-800",
    border: "border-cyan-200",
  },
  Poisonous: {
    bg: "bg-red-100",
    text: "text-red-800",
    border: "border-red-200",
  },
  Default: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    border: "border-gray-200",
  },
};

const Discover = () => {
  const convexPlants = useQuery(api.plants.getPlants); // Convex fetch
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [isGridView, setIsGridView] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [sortOption, setSortOption] = useState<string>("default");
  const [pageTransition, setPageTransition] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (convexPlants) {
      const mapped = convexPlants.map((plant) => ({
        ...plant,
        id: plant._id,
      }));
      setPlants(mapped);
    }
  }, [convexPlants]);

  const categories = Array.from(new Set(plants.map((plant) => plant.category)));

  const searchPlants = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await Get_Search_Plants(query);
      setPlants(response.data);
    } catch (error) {
      console.error("Error searching plants:", error);
      setPlants([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = debounce((query: string) => {
    if (query.trim() === "") {
      if (convexPlants) {
        const mapped = convexPlants.map((plant) => ({
          ...plant,
          id: plant._id,
        }));
        setPlants(mapped);
      }
      setIsLoading(false);
    } else {
      searchPlants(query);
    }
  }, 500);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    setIsLoading(true);
    debouncedSearch(query);
  };

  // Filter plants based on category
  const filteredPlants = selectedCategory
    ? plants.filter((plant) => plant.category === selectedCategory)
    : plants;

  // Sort plants based on selected option
  const sortedPlants = [...filteredPlants].sort((a, b) => {
    switch (sortOption) {
      case "name-asc":
        return a.common_name.localeCompare(b.common_name);
      case "name-desc":
        return b.common_name.localeCompare(a.common_name);
      case "water-low":
        return a.wateringNeeds.localeCompare(b.wateringNeeds);
      case "water-high":
        return b.wateringNeeds.localeCompare(a.wateringNeeds);
      default:
        return 0;
    }
  });

  // Toggle favorite
  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Page entrance animation
  useEffect(() => {
    setPageTransition(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, height: "0vh" }}
        animate={{
          opacity: pageTransition ? 1 : 0,
          height: pageTransition ? "40vh" : "0vh",
        }}
        transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
        className="relative w-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-400 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1600/900')] bg-cover bg-center mix-blend-overlay"></div>

        <div className="relative h-full flex flex-col justify-center px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Discover <span className="text-green-200">Natural Beauty</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl">
              Explore our curated collection of plants for every space and
              lifestyle. Find your perfect green companion today.
            </p>
          </motion.div>

          {/* Floating plants animation */}
          <div className="absolute right-0 bottom-0 hidden lg:block">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  right: `${i * 8}%`,
                  bottom: `${i * 5}%`,
                  zIndex: 10 - i,
                }}
                initial={{ y: 100, opacity: 0 }}
                animate={{
                  y: [0, -10, 0],
                  opacity: 1,
                  rotate: [0, i % 2 === 0 ? 5 : -5, 0],
                }}
                transition={{
                  delay: 0.2 * i,
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <Leaf
                  size={40 + i * 8}
                  className="text-white/80"
                  strokeWidth={1.5}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        {/* Search Bar & Controls */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-4 md:p-5 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input */}
            <div className="relative flex-grow">
              <Search
                className="absolute left-4 top-3 text-emerald-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Search plants, categories, or characteristics..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-12 py-3 pr-4 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 focus:outline-none shadow-sm text-gray-700"
              />
              {isLoading && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="absolute right-4 top-3"
                >
                  <Sparkles className="text-emerald-500" size={20} />
                </motion.div>
              )}
            </div>

            {/* Filter toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 font-medium hover:bg-emerald-100 transition-colors"
            >
              <Filter size={18} />
              Filters
              <motion.div
                animate={{ rotate: isFilterOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </motion.button>

            {/* View toggle */}
            <div className="flex border border-emerald-200 rounded-xl overflow-hidden">
              <motion.button
                whileHover={{
                  backgroundColor: isGridView ? "#10b981" : "#f0fdf4",
                }}
                onClick={() => setIsGridView(true)}
                className={`px-4 py-3 flex items-center justify-center gap-2 transition-colors ${
                  isGridView
                    ? "bg-emerald-500 text-white"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                <Maximize2 size={16} />
                Grid
              </motion.button>
              <motion.button
                whileHover={{
                  backgroundColor: !isGridView ? "#10b981" : "#f0fdf4",
                }}
                onClick={() => setIsGridView(false)}
                className={`px-4 py-3 flex items-center justify-center gap-2 transition-colors ${
                  !isGridView
                    ? "bg-emerald-500 text-white"
                    : "bg-emerald-50 text-emerald-700"
                }`}
              >
                <Minimize2 size={16} />
                List
              </motion.button>
            </div>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mr-2 flex items-center">
                      <Tag size={14} className="mr-1" /> Categories:
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCategory(null)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedCategory === null
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      All
                    </motion.button>

                    {categories.map((category) => (
                      <motion.button
                        key={category}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedCategory === category
                            ? "bg-emerald-500 text-white"
                            : `${categoryColors[category]?.bg || categoryColors.Default.bg} ${categoryColors[category]?.text || categoryColors.Default.text} hover:brightness-95`
                        }`}
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <h3 className="text-sm font-medium text-gray-700 mr-2 flex items-center">
                      <Calendar size={14} className="mr-1" /> Sort by:
                    </h3>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="px-3 py-1 rounded-lg text-sm border border-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    >
                      <option value="default">Default</option>
                      <option value="name-asc">Name (A-Z)</option>
                      <option value="name-desc">Name (Z-A)</option>
                      <option value="water-low">Watering: Low to High</option>
                      <option value="water-high">Watering: High to Low</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-700">
            {isLoading ? (
              <motion.span
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  repeatType: "reverse",
                }}
              >
                Searching for plants...
              </motion.span>
            ) : (
              <>
                {plants?.length === 0 ? (
                  <>
                    <div>fecthing....</div>
                  </>
                ) : (
                  <>
                    Found{" "}
                    <span className="text-emerald-600">
                      {sortedPlants.length}
                    </span>{" "}
                    plants
                    {selectedCategory && (
                      <>
                        {" "}
                        in{" "}
                        <span className="text-emerald-600">
                          {selectedCategory}
                        </span>
                      </>
                    )}
                    {searchTerm && (
                      <>
                        {" "}
                        matching "
                        <span className="text-emerald-600">{searchTerm}</span>"
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </h2>
        </motion.div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <motion.div
              className="relative w-20 h-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-full border-4 border-emerald-200 rounded-full"
                style={{ borderTopColor: "#10b981" }}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <Leaf className="text-emerald-500" size={24} />
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* No results */}
        {sortedPlants.length === 0 && (
          <div className="flex justify-center items-center py-12">
            <motion.div
              className="relative w-20 h-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <motion.div
                className="absolute top-0 left-0 w-full h-full border-4 border-emerald-200 rounded-full"
                style={{ borderTopColor: "#10b981" }}
              />
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <Leaf className="text-emerald-500" size={24} />
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* Plants Grid/List View */}
        <AnimatePresence mode="wait">
          {!isLoading &&
            sortedPlants.length > 0 &&
            (isGridView ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {sortedPlants.map((plant, index) => (
                  <PlantCard
                    key={index}
                    plant={plant}
                    onClick={() => setSelectedPlant(plant)}
                    isFavorite={favorites.includes(plant.id)}
                    onFavoriteToggle={(e) => toggleFavorite(plant.id, e)}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4"
              >
                {sortedPlants.map((plant, index) => (
                  <PlantListItem
                    key={plant.id}
                    plant={plant}
                    onClick={() => setSelectedPlant(plant)}
                    isFavorite={favorites.includes(plant.id)}
                    onFavoriteToggle={(e) => toggleFavorite(plant.id, e)}
                    index={index}
                  />
                ))}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-16 py-8 bg-emerald-900 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Leaf className="inline-block mb-3 text-emerald-300" size={24} />
            <h2 className="text-2xl font-bold mb-2">Greenify Your Space</h2>
            <p className="text-emerald-200 max-w-2xl mx-auto">
              Discover the perfect plants for every corner of your home or
              garden. Breathe life into your spaces with our carefully curated
              selection.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Plant Detail Modal */}
      <AnimatePresence>
        {selectedPlant && (
          <PlantDetailModal
            plant={selectedPlant}
            onClose={() => setSelectedPlant(null)}
            isFavorite={favorites.includes(selectedPlant.id)}
            onFavoriteToggle={(e) => toggleFavorite(selectedPlant.id, e)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Plant Card Component for Grid View
const PlantCard = ({
  plant,
  onClick,
  isFavorite,
  onFavoriteToggle,
  index,
}: {
  plant: Plant;
  onClick: () => void;
  isFavorite: boolean;
  onFavoriteToggle: (e: React.MouseEvent) => void;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer h-full flex flex-col transform-gpu"
      onClick={onClick}
      layoutId={`plant-card-${plant.id}`}
    >
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={plant.url || `/api/placeholder/400/500`}
          alt={plant.common_name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4 }}
        />

        {/* Category tag */}
        <div className="absolute top-3 left-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              categoryColors[plant.category]?.bg || categoryColors.Default.bg
            } ${
              categoryColors[plant.category]?.text ||
              categoryColors.Default.text
            } ${
              categoryColors[plant.category]?.border ||
              categoryColors.Default.border
            } border shadow-sm`}
          >
            {plant.category}
          </motion.div>
        </div>

        {/* Favorite button */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={onFavoriteToggle}
          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow-md"
        >
          <Heart
            size={18}
            className={
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }
          />
        </motion.button>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
          <h3 className="text-white font-bold text-xl">{plant.common_name}</h3>
          <p className="text-gray-200 text-sm italic">
            {plant.scientific_name}
          </p>
        </div>
      </div>

      <div className="p-4 flex-grow">
        <p className="text-gray-600 line-clamp-2 text-sm">
          {plant.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-y-2">
          <div className="w-1/2 flex items-center">
            <Droplets className="text-blue-500 mr-1" size={16} />
            <span className="text-sm text-gray-700">{plant.wateringNeeds}</span>
          </div>
          <div className="w-1/2 flex items-center">
            <Sun className="text-yellow-500 mr-1" size={16} />
            <span className="text-sm text-gray-700">{plant.sunlight}</span>
          </div>
          <div className="w-1/2 flex items-center">
            <Wind className="text-cyan-500 mr-1" size={16} />
            <span className="text-sm text-gray-700">
              {plant.humidityPreference}
            </span>
          </div>
          <div className="w-1/2 flex items-center">
            <BookOpen className="text-purple-500 mr-1" size={16} />
            <span className="text-sm text-gray-700">{plant.plant_Type}</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full mt-4 py-2 rounded-lg border border-emerald-500 text-emerald-500 font-medium flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors"
        >
          <Info size={16} />
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

// Plant List Item Component for List View
const PlantListItem = ({
  plant,
  onClick,
  isFavorite,
  onFavoriteToggle,
  index,
}: {
  plant: Plant;
  onClick: () => void;
  isFavorite: boolean;
  onFavoriteToggle: (e: React.MouseEvent) => void;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ x: 5, backgroundColor: "#f0fdf4" }}
      className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer flex transition-colors"
      onClick={onClick}
      layoutId={`plant-list-${plant.id}`}
    >
      <div className="relative w-32 h-32 sm:w-40 sm:h-40">
        <motion.img
          src={plant.url || `/api/placeholder/400/500`}
          alt={plant.common_name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />

        {/* Category tag */}
        <div className="absolute top-2 left-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              categoryColors[plant.category]?.bg || categoryColors.Default.bg
            } ${
              categoryColors[plant.category]?.text ||
              categoryColors.Default.text
            } ${
              categoryColors[plant.category]?.border ||
              categoryColors.Default.border
            } border shadow-sm`}
          >
            {plant.category}
          </motion.div>
        </div>
      </div>

      <div className="p-4 flex-grow relative">
        {/* Favorite button */}
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={onFavoriteToggle}
          className="absolute top-4 right-4 bg-white p-1.5 rounded-full shadow-sm"
        >
          <Heart
            size={16}
            className={
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-500"
            }
          />
        </motion.button>

        <h3 className="font-bold text-lg text-emerald-800">
          {plant.common_name}
        </h3>
        <p className="text-gray-500 text-sm italic">{plant.scientific_name}</p>
        <p className="text-gray-600 mt-2 line-clamp-2 text-sm">
          {plant.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          <div className="flex items-center">
            <Droplets className="text-blue-500 mr-1" size={14} />
            <span className="text-sm text-gray-700">{plant.wateringNeeds}</span>
          </div>
          <div className="flex items-center">
            <Sun className="text-yellow-500 mr-1" size={14} />
            <span className="text-sm text-gray-700">{plant.sunlight}</span>
          </div>
          <div className="flex items-center">
            <Wind className="text-cyan-500 mr-1" size={14} />
            <span className="text-sm text-gray-700">
              {plant.humidityPreference}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-sm font-medium flex items-center gap-1 hover:bg-emerald-600 transition-colors"
          >
            <Info size={14} />
            Details
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-3 py-1.5 rounded-lg border border-emerald-500 text-emerald-500 text-sm font-medium flex items-center gap-1 hover:bg-emerald-50 transition-colors"
          >
            <ShoppingBag size={14} />
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Plant Detail Modal Component
const PlantDetailModal = ({
  plant,
  onClose,
  isFavorite,
  onFavoriteToggle,
}: {
  plant: Plant;
  onClose: () => void;
  isFavorite: boolean;
  onFavoriteToggle: (e: React.MouseEvent) => void;
}) => {
  // Track scroll position for parallax effect
  const y = useMotionValue(0);
  const headerY = useTransform(y, [0, 100], [0, -50]);
  const headerOpacity = useTransform(y, [0, 100], [1, 0.3]);
  const contentY = useTransform(y, [0, 100], [0, -20]);

  // Spring animation for favorite heart
  const heartScale = useSpring(1, {
    stiffness: 300,
    damping: 10,
  });

  useEffect(() => {
    heartScale.set(isFavorite ? 1.3 : 1);
    setTimeout(() => heartScale.set(1), 300);
  }, [isFavorite, heartScale]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  // Calculate rating based on attributes (just for UI enhancement)
  const calculateRating = () => {
    // Simple algorithm to generate a rating between 3.5 and 5.0
    const hash = plant.common_name
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (3.5 + (hash % 15) / 10).toFixed(1);
  };

  const rating = parseFloat(calculateRating());

  const getCareDifficulty = () => {
    if (
      plant.wateringNeeds.toLowerCase().includes("low") &&
      plant.humidityPreference.toLowerCase().includes("low")
    ) {
      return { label: "Easy", color: "text-green-500" };
    } else if (
      plant.wateringNeeds.toLowerCase().includes("high") ||
      plant.humidityPreference.toLowerCase().includes("high")
    ) {
      return { label: "Difficult", color: "text-red-500" };
    } else {
      return { label: "Moderate", color: "text-yellow-500" };
    }
  };

  const careDifficulty = getCareDifficulty();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        layoutId={`plant-card-${plant.id}`}
        className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="h-[40vh] relative overflow-hidden"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          {/* Hero Image */}
          <img
            src={plant.url || `/api/placeholder/1200/800`}
            alt={plant.common_name}
            className="w-full h-full object-cover"
          />

          {/* Overlay and back button */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 left-4 bg-white/80 rounded-full p-2 z-10"
            onClick={onClose}
          >
            <X size={20} className="text-gray-800" />
          </motion.button>

          {/* Favorite button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{ scale: heartScale }}
            onClick={onFavoriteToggle}
            className="absolute top-4 right-4 bg-white/80 p-2 rounded-full z-10"
          >
            <Heart
              size={20}
              className={
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-800"
              }
            />
          </motion.button>

          {/* Plant title info */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium inline-block mb-2 ${
                categoryColors[plant.category]?.bg || categoryColors.Default.bg
              } ${
                categoryColors[plant.category]?.text ||
                categoryColors.Default.text
              }`}
            >
              {plant.category}
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">
              {plant.common_name}
            </h2>
            <p className="text-lg italic text-white/80">
              {plant.scientific_name}
            </p>

            {/* Rating */}
            <div className="flex items-center mt-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    filled={star <= Math.floor(rating)}
                    halfFilled={
                      star === Math.ceil(rating) && !Number.isInteger(rating)
                    }
                  />
                ))}
              </div>
              <span className="ml-2 text-white font-medium">{rating}</span>
              <span className="mx-2 text-white/50">•</span>
              <span className={`font-medium ${careDifficulty.color}`}>
                {careDifficulty.label} care
              </span>
            </div>
          </div>
        </motion.div>

        {/* Scrollable content */}
        <motion.div
          className="overflow-y-auto max-h-[50vh] p-6"
          style={{ y: contentY }}
          onScroll={(e) => {
            y.set(e.currentTarget.scrollTop);
          }}
        >
          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-emerald-800 mb-3 flex items-center">
              <Info className="mr-2 text-emerald-600" size={20} />
              About this plant
            </h3>
            <p className="text-gray-700 leading-relaxed">{plant.description}</p>
          </div>

          {/* Care instructions */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-emerald-800 mb-4 flex items-center">
              <Leaf className="mr-2 text-emerald-600" size={20} />
              Care Instructions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CareItem
                icon={<Droplets className="text-blue-500" size={22} />}
                title="Watering Needs"
                value={plant.wateringNeeds}
                description={
                  plant.wateringNeeds.toLowerCase().includes("low")
                    ? "Allow soil to dry between waterings"
                    : plant.wateringNeeds.toLowerCase().includes("high")
                      ? "Keep soil consistently moist"
                      : "Water when top 1-2 inches of soil is dry"
                }
              />

              <CareItem
                icon={<Sun className="text-yellow-500" size={22} />}
                title="Sunlight"
                value={plant.sunlight}
                description={
                  plant.sunlight.toLowerCase().includes("full")
                    ? "Place in a bright location with direct sunlight"
                    : plant.sunlight.toLowerCase().includes("partial")
                      ? "Some direct sun, but protected during peak hours"
                      : "Avoid direct sunlight, bright indirect light is best"
                }
              />

              <CareItem
                icon={<Wind className="text-cyan-500" size={22} />}
                title="Humidity"
                value={plant.humidityPreference}
                description={
                  plant.humidityPreference.toLowerCase().includes("high")
                    ? "Mist regularly or use a humidifier"
                    : plant.humidityPreference.toLowerCase().includes("low")
                      ? "Tolerates dry air conditions well"
                      : "Average room humidity is sufficient"
                }
              />

              <CareItem
                icon={<Clock className="text-purple-500" size={22} />}
                title="Life Span"
                value={plant.life_span}
                description={
                  plant.life_span.toLowerCase().includes("annual")
                    ? "Completes lifecycle within one year"
                    : plant.life_span.toLowerCase().includes("biennial")
                      ? "Completes lifecycle over two years"
                      : "Lives for multiple growing seasons"
                }
              />
            </div>
          </div>

          {/* Plant Type */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-emerald-800 mb-3 flex items-center">
              <BookOpen className="mr-2 text-emerald-600" size={20} />
              Plant Classification
            </h3>

            <div className="bg-emerald-50 p-4 rounded-xl">
              <div className="flex items-start mb-3">
                <Tag className="text-emerald-600 mr-3 mt-1" size={18} />
                <div>
                  <h4 className="font-medium text-emerald-800">Plant Type</h4>
                  <p className="text-emerald-700">{plant.plant_Type}</p>
                </div>
              </div>

              {plant.medicinalUses && (
                <div className="flex items-start">
                  <Sparkles className="text-emerald-600 mr-3 mt-1" size={18} />
                  <div>
                    <h4 className="font-medium text-emerald-800">
                      Medicinal Uses
                    </h4>
                    <p className="text-emerald-700">{plant.medicinalUses}</p>
                  </div>
                </div>
              )}

              {plant.culinaryUse && (
                <div className="flex items-start mt-3">
                  <Award className="text-emerald-600 mr-3 mt-1" size={18} />
                  <div>
                    <h4 className="font-medium text-emerald-800">
                      Culinary Use
                    </h4>
                    <p className="text-emerald-700">{plant.culinaryUse}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Companion plants - Just for UI enhancement */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-emerald-800 mb-3 flex items-center">
              <Flower2 className="mr-2 text-emerald-600" size={20} />
              Plants You Might Like
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-lg p-3 flex items-center"
                >
                  <div className="w-12 h-12 bg-emerald-200 rounded-full mr-3 flex items-center justify-center">
                    <Leaf size={16} className="text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Similar Plant {i}
                    </p>
                    <p className="text-xs text-gray-500">Recommended</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <div className="p-4 border-t border-gray-100 flex justify-between">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-lg border border-emerald-500 text-emerald-600 font-medium"
          >
            Save for Later
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-medium flex items-center"
          >
            <PlusCircle size={18} className="mr-2" />
            Add to Collection
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Star rating component
const Star = ({
  filled,
  halfFilled,
}: {
  filled: boolean;
  halfFilled?: boolean;
}) => {
  return (
    <div className="relative w-5 h-5">
      {/* Empty star (background) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 text-white/30"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>

      {/* Full star */}
      {filled && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="absolute inset-0 text-yellow-400"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      )}

      {/* Half star */}
      {halfFilled && (
        <div className="absolute inset-0 overflow-hidden w-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="absolute inset-0 text-yellow-400"
            style={{ width: "200%" }}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
      )}
    </div>
  );
};

// Care item component
const CareItem = ({
  icon,
  title,
  value,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
    >
      <div className="flex items-center mb-2">
        <div className="mr-3">{icon}</div>
        <div>
          <h4 className="font-medium text-gray-800">{title}</h4>
          <p className="text-sm text-emerald-600 font-medium">{value}</p>
        </div>
      </div>
      <p className="text-sm text-gray-600 ml-9">{description}</p>
    </motion.div>
  );
};

export default withAuth(Discover);
