export interface PlantItemProps {
  plantId: any;
  img: string;
  common_name: string;
  category: string;
  onDeletePlant: () => void;
}

export interface PlantDeleteParams {
  plantId: any;
  plantName?: string;
}

export interface PlantCardProps {
  onClose: () => void;
  common_name: string;
  description: string;
  imageId: string;
  humidityPreference: string;
  life_span: string;
  medicinalUses: string;
  plant_Type: string;
  scientific_name: string;
  sunlight: string;
  wateringNeeds: string;
}
