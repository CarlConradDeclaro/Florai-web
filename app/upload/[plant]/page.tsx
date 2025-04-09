"use client";

import { api } from "@/convex/_generated/api";
import { PlantCardProps } from "@/Interface/Plant";
import { BASEURL } from "@/service/base";
import { useQuery } from "convex/react";
import Link from "next/link";
import React, { use } from "react";
import edit from "../../../assest/edit.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

function page({ params }: { params: Promise<{ plant: string }> }) {
  const { plant } = use(params);
  const plantData = useQuery(api.plants.getPlants);
  const getPlantByCategory =
    plantData?.filter((p) => p.category === plant) || [];
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [selectedPlant, setSelectedPlant] = React.useState<Plant | any>(null);

  return (
    <div className="w-full  min-h-screen">
      <div className="max-w-7xl mx-auto mt-9  ">
        <div>
          <Link
            href={BASEURL + "/upload"}
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
        <div className="p-5">
          <h1 className="text-lg text-green-600 font-bold">{plant}</h1>
        </div>
        <div className="p-8 flex gap-3 justify-  flex-wrap">
          {getPlantByCategory ? (
            getPlantByCategory.map((p) => (
              <div key={p._id} onClick={() => setSelectedPlant(p)}>
                <h1>
                  <PlantCard
                    onClose={() => setOpenViewModal(!openViewModal)}
                    common_name={p.common_name}
                    imageId={p.url as string}
                    description={p.description}
                    humidityPreference={p.humidityPreference}
                    life_span={p.life_span}
                    medicinalUses={p.medicinalUses}
                    plant_Type={p.plant_Type}
                    scientific_name={p.scientific_name}
                    sunlight={p.sunlight}
                    wateringNeeds={p.wateringNeeds}
                  />
                </h1>
              </div>
            ))
          ) : (
            <>
              <h1>No Plant Found</h1>
            </>
          )}
          {getPlantByCategory.length === 0 && <h1>Fetching plants...</h1>}
          {openViewModal && (
            <ViewModal
              onClose={() => setOpenViewModal(!openViewModal)}
              plant={selectedPlant}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const PlantCard = ({ onClose, common_name, imageId }: PlantCardProps) => {
  return (
    <div
      className="w-[230px] h-[250px] rounded-2xl transform transition-all shadow-lg hover:scale-105 bg-white overflow-hidden cursor-pointer"
      onClick={onClose}
    >
      <div className="w-full h-[70%]">
        <img
          src={imageId}
          alt={common_name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="h-[30%] flex items-center justify-center p-2 bg-white">
        <h1 className="text-sm font-semibold text-gray-800 text-center">
          {common_name}
        </h1>
      </div>
    </div>
  );
};

interface Plant {
  _id: any;
  common_name: string;
  description: string;
  url: any;
  humidityPreference: string;
  life_span: string;
  medicinalUses: string;
  plant_Type: string;
  scientific_name: string;
  sunlight: string;
  wateringNeeds: string;
}

interface ViewModalProps {
  onClose: () => void;
  plant: Plant;
}

const ViewModal = ({ onClose, plant }: ViewModalProps) => {
  const router = useRouter();
  const updatePlant = () => {
    router.push(`/update/${plant._id}`);
  };

  const renderPlantData = (label: string, description: string) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
      <h3 className="text-lg font-semibold text-gray-700 w-40">{label}:</h3>
      <p className="text-gray-800">{description}</p>
    </div>
  );
  return (
    <div
      className="fixed inset-0  bg-black/20 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white h-[700px] w-[1200px] m-10 rounded-3xl p-3 flex gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-[50%]">
          <h1>{plant.common_name}</h1>
          <img
            src={plant.url as string}
            className="w-full h-[95%] object-fill rounded-2xl"
          />
        </div>
        <div className="w-full md:w-1/2 bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div className="flex justify-between text-3xl font-bold text-green-800 border-b-2 pb-4">
            Plant Details
            <h1></h1>
            <button onClick={updatePlant}>
              <Image
                src={edit}
                alt="Edit"
                className="w-[25px] h-[25px] cursor-pointer"
              />
            </button>
          </div>
          <div className="space-y-4">
            {renderPlantData("Description", plant.description)}
            {renderPlantData("Humidity Preference", plant.humidityPreference)}
            {renderPlantData("Lifespan", plant.life_span)}
            {renderPlantData("Plant Type", plant.plant_Type)}
            {renderPlantData("Scientific Name", plant.scientific_name)}
            {renderPlantData("Sunlight", plant.sunlight)}
            {renderPlantData("Watering Needs", plant.wateringNeeds)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
