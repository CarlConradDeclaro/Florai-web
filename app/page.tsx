"use client";
import { Modal } from "@/components/Modal";
import { Select } from "@/components/Select";
import { TextField } from "@/components/TextField";
import { UploadButton } from "@/components/UploadButton";
import {
  CATEGORY,
  HUMIDITY_PREFERENCE,
  LIFE_SPAN,
  PLANT_TYPE,
  SUNLIGHT,
  WATERING_NEEDS,
} from "@/constant/list";
import { api } from "@/convex/_generated/api";
import { Button } from "@mui/material";
import { useMutation, useQuery } from "convex/react";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SnackbarProvider, useSnackbar } from "notistack";
import PlantItem from "@/components/PlantItem";
import { PlantDeleteParams } from "@/types/Plant";

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
  // Form state hooks
  const [formData, setFormData] = useState({
    commonName: "",
    scientific: "",
    description: "",
    category: "",
    plantType: "",
    lifespan: "",
    sunlight: "",
    wateringNeeds: "",
    humidityPreference: "",
    medicinalUses: "",
    culinaryUse: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  // Image state hooks
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Convex API hooks
  const sendPlantDetails = useMutation(api.plants.sendPlantDetails);
  const generateUploadUrl = useMutation(api.plants.generateUploadUrl);
  const deletePlant = useMutation(api.plants.deletePlant);
  const plants = useQuery(api.plants.getPlants);
  const { enqueueSnackbar } = useSnackbar();

  // Handle form field changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const imageURL = URL.createObjectURL(files[0]);
      setPreviewImage(imageURL);
      setSelectedImage(files[0]);
    }
  };

  const resetForm = () => {
    setFormData({
      commonName: "",
      scientific: "",
      description: "",
      category: "",
      plantType: "",
      lifespan: "",
      sunlight: "",
      wateringNeeds: "",
      humidityPreference: "",
      medicinalUses: "",
      culinaryUse: "",
    });
    setSelectedImage(null);
    setPreviewImage(null);
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!selectedImage) {
      enqueueSnackbar("Please select an image", { variant: "warning" });
      return;
    }
    setSubmitLoading(true);

    try {
      const postUrl = await generateUploadUrl();

      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage.type },
        body: selectedImage,
      });

      const { storageId } = await result.json();

      await sendPlantDetails({
        storageId,
        common_name: formData.commonName,
        scientific_name: formData.scientific,
        description: formData.description,
        category: formData.category,
        plant_Type: formData.plantType,
        life_span: formData.lifespan,
        sunlight: formData.sunlight,
        wateringNeeds: formData.wateringNeeds,
        humidityPreference: formData.humidityPreference,
        medicinalUses: formData.medicinalUses,
        culinaryUse: formData.culinaryUse,
      });

      resetForm();
      enqueueSnackbar("Plant added successfully!", { variant: "success" });
      setSubmitLoading(false);
    } catch (error) {
      console.error("Error adding plant:", error);
      enqueueSnackbar("Failed to add plant", { variant: "error" });
    }
  }

  const handleDeletePlant = async ({
    plantId,
    plantName,
  }: PlantDeleteParams) => {
    try {
      await deletePlant({ id: plantId });
      enqueueSnackbar(`${plantName || "Plant"} deleted successfully`, {
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting plant:", error);
      enqueueSnackbar("Error deleting plant", { variant: "error" });
    }
  };

  const renderFormField = (
    label: string,
    fieldName: keyof typeof formData,
    component: "textfield" | "select",
    options?: string[]
  ) => (
    <div className="flex items-center gap-4">
      <label className="font-medium text-gray-700 w-32 text-right">
        {label}:
      </label>
      {component === "textfield" ? (
        <TextField
          size="small"
          label={label}
          value={formData[fieldName]}
          onChange={(e) => handleInputChange(fieldName, e.target.value)}
        />
      ) : (
        <Select
          items={options || []}
          value={formData[fieldName]}
          onChange={(e) => handleInputChange(fieldName, e.target.value)}
        />
      )}
    </div>
  );

  const isLoading = plants === undefined;

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
              {renderFormField("Common Name", "commonName", "textfield")}
              {renderFormField("Scientific Name", "scientific", "textfield")}
              {renderFormField("Description", "description", "textfield")}

              <div className="flex items-center gap-4">
                <label className="font-medium text-gray-700 w-32 text-right">
                  Upload Image:
                </label>
                {previewImage ? (
                  <div className="relative group">
                    <Image
                      width={500} // aspect ratio width
                      height={500}
                      onClick={() => setImageUrl(previewImage)}
                      src={previewImage}
                      alt="preview"
                      className="w-[200px] h-[200px] object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setPreviewImage(null)}
                      type="button"
                      aria-label="Remove image"
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
                {renderFormField("Category", "category", "select", CATEGORY)}
                {renderFormField(
                  "Plant Type",
                  "plantType",
                  "select",
                  PLANT_TYPE
                )}
                {renderFormField("Lifespan", "lifespan", "select", LIFE_SPAN)}
              </div>
              <div className="space-y-6">
                {renderFormField("Sunlight", "sunlight", "select", SUNLIGHT)}
                {renderFormField(
                  "Watering",
                  "wateringNeeds",
                  "select",
                  WATERING_NEEDS
                )}
                {renderFormField(
                  "Humidity",
                  "humidityPreference",
                  "select",
                  HUMIDITY_PREFERENCE
                )}
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <Button
                variant="contained"
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
                disabled={!selectedImage}
              >
                {submitLoading ? "Submitting..." : "Submit Plant"}
              </Button>
            </div>
          </div>
        </div>

        {/* Plant List */}
        <div className="mt-8">
          <div className="h-[90vh] rounded-xl shadow-lg overflow-auto bg-white">
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
                  {isLoading && (
                    <div className="flex items-center justify-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                    </div>
                  )}
                  {plants && plants.length === 0 && (
                    <div className="p-4 text-center text-gray-500">
                      No plants found
                    </div>
                  )}
                  {plants &&
                    plants.length > 0 &&
                    [...plants].reverse().map((plant) => (
                      <PlantItem
                        key={plant._id}
                        plantId={plant._id}
                        img={plant.url as string}
                        common_name={plant.common_name}
                        category={plant.category}
                        onDeletePlant={() =>
                          handleDeletePlant({
                            plantId: plant._id,
                            plantName: plant.common_name,
                          })
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
