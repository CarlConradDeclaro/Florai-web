"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import Image from "next/image";
import { BASEURL } from "@/lib/base";

export default function App() {
  const images = useQuery(api.plants.getPlants);
  const category = useQuery(api.plants.getPlantCategories);
  const plants = useQuery(api.plants.getPlants);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href={BASEURL}
              className="flex items-center text-green-600 hover:text-green-700 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="ml-1">Back to Home</span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-green-600">Plant Gallery</h1>
          <p className="text-gray-600 mt-2">
            Browse through our collection of plants
          </p>
        </div>

        {/* Plant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {category?.map((cate) => {
            const filteredPlants =
              plants?.filter((plant) => plant.category === cate) || [];
            return (
              <div
                key={cate}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-4">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-green-600">
                        {cate}
                      </h3>
                      <button className="text-gray-600 hover:text-green-600 transition-colors">
                        <Link href={`upload/${cate}`}>
                          <span className="text-sm">👁️ View All</span>
                        </Link>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {filteredPlants?.length > 0 ? (
                        filteredPlants.slice(0, 4).map((plant) => (
                          <div
                            key={plant._id}
                            className="relative group cursor-pointer"
                            onClick={() =>
                              setFullscreenImage(plant.url as string)
                            }
                          >
                            <Image
                              width={500} // aspect ratio width
                              height={500}
                              src={plant.url as string}
                              alt={plant.common_name}
                              className="w-full h-32 rounded-lg object-cover transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                            />
                            <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-2">
                                {plant.common_name}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="col-span-2 text-center">
                          No plants found
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Loading State */}
        {!images && (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        )}

        {/* Empty State */}
        {images && images.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold text-gray-800">
              No plants found
            </h3>
            <p className="text-gray-600 mt-2">
              Add some plants to get started!
            </p>
          </div>
        )}
      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <Image
              width={500} // aspect ratio width
              height={500}
              src={fullscreenImage}
              alt="Fullscreen"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
