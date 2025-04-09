"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { TextField } from "@/components/TextField";
import { Select } from "@/components/Select";
import { UploadButton } from "@/components/UploadButton";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import {
  CATEGORY,
  HUMIDITY_PREFERENCE,
  LIFE_SPAN,
  PLANT_TYPE,
  SUNLIGHT,
  WATERING_NEEDS,
} from "@/constant/list";
import Image from "next/image";

export default function PlantUpdateForm() {
  const params = useParams();
  const router = useRouter();
  const plantId = params.plantId as any;

  // State for form data
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

  // State for image handling
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);

  // Loading and submission states
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Convex API hooks
  const getPlant = useQuery(api.plants.getPlantById, { id: plantId });
  const updatePlant = useMutation(api.plants.updatePlantDetails);
  const generateUploadUrl = useMutation(api.plants.generateUploadUrl);

  // Load plant data when component mounts
  useEffect(() => {
    if (getPlant) {
      setFormData({
        commonName: getPlant.common_name || "",
        scientific: getPlant.scientific_name || "",
        description: getPlant.description || "",
        category: getPlant.category || "",
        plantType: getPlant.plant_Type || "",
        lifespan: getPlant.life_span || "",
        sunlight: getPlant.sunlight || "",
        wateringNeeds: getPlant.wateringNeeds || "",
        humidityPreference: getPlant.humidityPreference || "",
        medicinalUses: getPlant.medicinalUses || "",
        culinaryUse: getPlant.culinaryUse || "",
      });

      if (getPlant.url) {
        setPreviewImage(getPlant.url as string);
        setOriginalImageUrl(getPlant.url as string);
      }

      setIsLoading(false);
    }
  }, [getPlant]);

  // Handle form field changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle file selection
  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const imageURL = URL.createObjectURL(files[0]);
      setPreviewImage(imageURL);
      setSelectedImage(files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Prepare update data
      const updateData: any = {
        id: plantId,
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
      };

      // If new image is selected, upload it
      if (selectedImage && previewImage !== originalImageUrl) {
        const postUrl = await generateUploadUrl();

        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": selectedImage.type },
          body: selectedImage,
        });

        const { storageId } = await result.json();
        updateData.storageId = storageId;
      }

      // Update plant details
      await updatePlant(updateData);

      alert("Plant updated successfully!");
      router.push("http://localhost:3000"); // Redirect to main page after update
    } catch (error) {
      console.error("Error updating plant:", error);
      alert("Failed to update plant");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel update and go back
  const handleCancel = () => {
    router.back();
  };

  // Render form field (reusable component)
  const renderFormField = (
    label: string,
    fieldName: keyof typeof formData,
    component: "textfield" | "select",
    options?: string[]
  ) => (
    <div className="flex items-center gap-4 mb-4">
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-green-600">Update Plant</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                General Information
              </h2>
              {renderFormField("Common Name", "commonName", "textfield")}
              {renderFormField("Scientific Name", "scientific", "textfield")}
              {renderFormField("Description", "description", "textfield")}

              <div className="flex items-center gap-4 mb-4">
                <label className="font-medium text-gray-700 w-32 text-right">
                  Plant Image:
                </label>
                {previewImage ? (
                  <div className="relative group">
                    <Image
                      width={500} // aspect ratio width
                      height={500}
                      src={previewImage}
                      alt="Plant preview"
                      className="w-[150px] h-[150px] object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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

            {/* Right Column */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Plant Details
              </h2>
              {renderFormField("Category", "category", "select", CATEGORY)}
              {renderFormField("Plant Type", "plantType", "select", PLANT_TYPE)}
              {renderFormField("Lifespan", "lifespan", "select", LIFE_SPAN)}
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

          <div className="flex justify-end gap-4 mt-8">
            <Button
              type="button"
              variant="outlined"
              onClick={handleCancel}
              className="text-gray-600 border-gray-400"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Plant"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
