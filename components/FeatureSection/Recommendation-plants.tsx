"use client";
import React, { useEffect } from "react";
import PlantCard from "./Plant-Card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

const Recommendation_Plants = () => {
  const getPlants = useQuery(api.plants.getPlants);
  const recommendedPlant = getPlants
    ? [...getPlants].sort(() => Math.random() - 0.5).slice(0, 5)
    : [];

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl ">Recommendation Plants</h1>
        <h1 className="text-[#00FF94]">View All</h1>
      </div>

      <div className="flex gap-4 mt-5">
        {getPlants ? (
          recommendedPlant?.map((plant, index) => (
            <PlantCard
              key={index}
              common_name={plant.common_name}
              sunlight={plant.sunlight}
              wateringNeeds={plant.wateringNeeds}
              image={plant.url ? plant.url : require(`@/public/plantTest.png`)}
            />
          ))
        ) : (
          <p>Loading....</p>
        )}
      </div>
    </div>
  );
};

export default Recommendation_Plants;
