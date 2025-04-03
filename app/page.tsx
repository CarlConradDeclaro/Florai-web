"use client";
import { Modal } from "@/components/Modal";
import { Select } from "@/components/Select";
import { TextField } from "@/components/TextField";
import { UploadButton } from "@/components/UploadButton";
import {
  CATEGORY,
  CULINARY_USE,
  HUMIDITY_PREFERENCE,
  LIFE_SPAN,
  MEDICINAL_USES,
  PLANT_TYPE,
  SUNLIGHT,
  WATERING_NEEDS,
} from "@/constant/list";
import { api } from "@/convex/_generated/api";
import { Button } from "@mui/material";
import { useMutation, useQuery } from "convex/react";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import edit from "../assest/edit.png";
import trash from "../assest/trash.png";
import Image from "next/image";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function Page() {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      autoHideDuration={2000}
    >
      <PlantManagement />
    </SnackbarProvider>
  );
}

function PlantManagement() {
  const [commonName, setCommonName] = useState<string>("");
  const [Scientific, setScientific] = useState<string>("");
  const [Description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [plantType, setPlantType] = useState<string>("");
  const [lifespan, setLifespan] = useState<string>("");
  const [sunlight, setSunlight] = useState<string>("");
  const [wateringNeeds, setWateringNeeds] = useState<string>("");
  const [humidityPreference, setHumidityPreference] = useState<string>("");
  const [medicinalUses, setMedicinalUses] = useState<string>("");
  const [culinaryUse, setCulinaryUse] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const sendPlantDetails = useMutation(api.plants.sendPlantDetails);
  const generateUploadUrl = useMutation(api.plants.generateUploadUrl);
  const deletePlant = useMutation(api.plants.deletePlant);
  const plants = useQuery(api.plants.getPlants);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const imageURL = URL.createObjectURL(files[0]);
      setPreviewImage(imageURL);
      setSelectedImage(files[0]);
    }
  };
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage!.type },
        body: selectedImage,
      });

      const { storageId } = await result.json();

      await sendPlantDetails({
        storageId,
        common_name: commonName,
        scientific_name: Scientific,
        description: Description,
        category: category,
        plant_Type: plantType,
        life_span: lifespan,
        sunlight: sunlight,
        wateringNeeds: wateringNeeds,
        humidityPreference: humidityPreference,
        medicinalUses: medicinalUses,
        culinaryUse: culinaryUse,
      });

      setSelectedImage(null);
      setPreviewImage(null);
      setCommonName("");
      setScientific("");
      setDescription("");
      setCategory("");
      setPlantType("");
      setLifespan("");
      setSunlight("");
      setWateringNeeds("");
      setHumidityPreference("");
      setMedicinalUses("");
      setCulinaryUse("");

      // Replace alert with snackbar
      enqueueSnackbar("Plant added successfully!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Failed to add plant", { variant: "error" });
    }
  }

  const handleDeletePlant = async ({
    plantId,
    plantName,
  }: {
    plantId: any;
    plantName?: string;
  }) => {
    console.log("id: ", plantId);

    try {
      await deletePlant({ id: plantId });
      // Show success message with snackbar
      enqueueSnackbar(`${plantName || "Plant"} deleted successfully`, {
        variant: "success",
      });
    } catch (error) {
      // Show error message with snackbar
      enqueueSnackbar("Error deleting plant", { variant: "error" });
      console.log("error to delete the plant");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-green-600">
            PlantQuest Data Management
          </h1>

          <Link
            href="/upload"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            View All Plants
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - General Info */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              General Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <label className="font-medium text-gray-700 w-32 text-right">
                  Common Name:
                </label>
                <TextField
                  id="outlined-basic"
                  size="small"
                  label="Common Name"
                  value={commonName}
                  onChange={(e) => setCommonName(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="font-medium text-gray-700 w-32 text-right">
                  Scientific Name:
                </label>
                <TextField
                  size="small"
                  label="Scientific Name"
                  value={Scientific}
                  onChange={(e) => setScientific(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="font-medium text-gray-700 w-32 text-right">
                  Description:
                </label>
                <TextField
                  id="outlined-multiline-static"
                  size="small"
                  label="Description"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="font-medium text-gray-700 w-32 text-right">
                  Upload Image:
                </label>
                {previewImage ? (
                  <div className="relative group">
                    <img
                      onClick={() => setImageUrl(previewImage)}
                      src={previewImage}
                      alt="preview"
                      className="w-[200px] h-[200px] object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setPreviewImage(null)}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <UploadButton handleFileChange={handleFileChange} />
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Plant Details */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Plant Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <label className="font-medium text-gray-700 w-32 text-right">
                    Category:
                  </label>
                  <Select
                    items={CATEGORY}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="font-medium text-gray-700 w-32 text-right">
                    Plant Type:
                  </label>
                  <Select
                    items={PLANT_TYPE}
                    value={plantType}
                    onChange={(e) => setPlantType(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="font-medium text-gray-700 w-32 text-right">
                    Lifespan:
                  </label>
                  <Select
                    items={LIFE_SPAN}
                    value={lifespan}
                    onChange={(e) => setLifespan(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <label className="font-medium text-gray-700 w-32 text-right">
                    Sunlight:
                  </label>
                  <Select
                    items={SUNLIGHT}
                    value={sunlight}
                    onChange={(e) => setSunlight(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="font-medium text-gray-700 w-32 text-right">
                    Watering:
                  </label>
                  <Select
                    items={WATERING_NEEDS}
                    value={wateringNeeds}
                    onChange={(e) => setWateringNeeds(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="font-medium text-gray-700 w-32 text-right">
                    Humidity:
                  </label>
                  <Select
                    items={HUMIDITY_PREFERENCE}
                    value={humidityPreference}
                    onChange={(e) => setHumidityPreference(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                variant="contained"
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Plant
              </Button>
            </div>
          </div>
        </div>

        {/* Plant List */}
        <div className="mt-18 ">
          <div className="h-[90vh] rounded-xl shadow-lg overflow-auto  bg-white">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Recent Plants
              </h2>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="grid grid-cols-4 bg-gray-50 border-b border-gray-200">
                  <div className="p-4 font-medium text-gray-700">Image</div>
                  <div className="p-4 font-medium text-gray-700">
                    Common Name
                  </div>
                  <div className="p-4 font-medium text-gray-700">Category</div>
                  <div className="p-4 font-medium text-gray-700">Actions</div>
                </div>
                <div className="divide-y divide-gray-200">
                  {!plants && (
                    <div className="flex items-center justify-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    </div>
                  )}
                  {plants && plants.length === 0 && (
                    <div className="p-4 text-center text-gray-500">
                      No plants found
                    </div>
                  )}
                  {plants
                    ?.slice()
                    .reverse()
                    .map((plant) => (
                      <Item
                        key={plant._id}
                        img={plant.url as string}
                        common_name={plant.common_name}
                        category={plant.category}
                        onDeletePlant={() =>
                          handleDeletePlant({ plantId: plant._id })
                        }
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {imageUrl && (
        <Modal imageUrl={imageUrl} onClose={() => setImageUrl(null)} />
      )}
    </div>
  );
}

const Item = ({
  img,
  common_name,
  category,
  onDeletePlant,
}: {
  img: string;
  common_name: string;
  category: string;
  onDeletePlant: () => void;
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="grid grid-cols-4 items-center p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
          <img
            src={img}
            alt={common_name}
            className="w-full h-full object-cover"
            onClick={() => setOpenModal(true)}
          />
        </div>
      </div>
      <div className="font-bold text-gray-800  ">{common_name}</div>
      <div className="text-gray-600 font-bold">{category}</div>
      <div className="flex gap-2 justify-center">
        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <Image
            src={edit}
            alt="edit"
            className="w-[25px] h-[25px] cursor-pointer"
          />
        </button>
        <button
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={onDeletePlant}
        >
          <Image
            src={trash}
            alt="edit"
            className="w-[30px] h-[30px] cursor-pointer"
          />
        </button>
      </div>

      {openModal && (
        <Modal imageUrl={img} onClose={() => setOpenModal(false)} />
      )}
    </div>
  );
};
