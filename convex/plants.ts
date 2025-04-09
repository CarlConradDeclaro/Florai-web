import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const sendPlantDetails = mutation({
  args: {
    storageId: v.id("_storage"),
    common_name: v.string(),
    scientific_name: v.string(),
    description: v.string(),
    category: v.string(),
    plant_Type: v.string(),
    life_span: v.string(),
    sunlight: v.string(),
    wateringNeeds: v.string(),
    humidityPreference: v.string(),
    medicinalUses: v.string(),
    culinaryUse: v.string(),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("plants", {
      category: args.category,
      common_name: args.common_name,
      culinaryUse: args.culinaryUse,
      description: args.description,
      humidityPreference: args.humidityPreference,
      imageId: args.storageId,
      life_span: args.life_span,
      medicinalUses: args.medicinalUses,
      plant_Type: args.plant_Type,
      scientific_name: args.scientific_name,
      sunlight: args.sunlight,
      wateringNeeds: args.wateringNeeds,
    });
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getPlantCategories = query({
  handler: async (ctx) => {
    const category = await ctx.db
      .query("plants")
      .filter((q) => q.neq(q.field("category"), undefined)) // Ensure "category" field is present
      .collect();
    const categories = [...new Set(category.map((plant) => plant.category))];
    return categories;
  },
});

export const getPlantByCategory = query({
  args: {
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const plants = await ctx.db
      .query("plants")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();
    return plants;
  },
});

export const getPlants = query({
  handler: async (ctx) => {
    const plants = await ctx.db.query("plants").collect();

    // Generate URLs for each image
    return await Promise.all(
      plants.map(async (plant) => ({
        _id: plant._id,
        common_name: plant.common_name,
        category: plant.category,
        url: await ctx.storage.getUrl(plant.imageId),
        culinaryUse: plant.culinaryUse,
        description: plant.description,
        humidityPreference: plant.humidityPreference,
        life_span: plant.life_span,
        medicinalUses: plant.medicinalUses,
        plant_Type: plant.plant_Type,
        scientific_name: plant.scientific_name,
        sunlight: plant.sunlight,
        wateringNeeds: plant.wateringNeeds,
      }))
    );
  },
});

export const deletePlant = mutation({
  args: { id: v.id("plants") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getPlantById = query({
  args: { id: v.id("plants") },
  handler: async (ctx, args) => {
    const plant = await ctx.db.get(args.id);

    if (!plant) {
      throw new Error("Plant not found");
    }

    // Generate URL for the image if the plant exists
    return {
      _id: plant._id,
      common_name: plant.common_name,
      scientific_name: plant.scientific_name,
      description: plant.description,
      category: plant.category,
      plant_Type: plant.plant_Type,
      life_span: plant.life_span,
      sunlight: plant.sunlight,
      wateringNeeds: plant.wateringNeeds,
      humidityPreference: plant.humidityPreference,
      medicinalUses: plant.medicinalUses,
      culinaryUse: plant.culinaryUse,
      url: plant.imageId ? await ctx.storage.getUrl(plant.imageId) : null,
      imageId: plant.imageId,
    };
  },
});

// Update plant details
export const updatePlantDetails = mutation({
  args: {
    id: v.id("plants"),
    storageId: v.optional(v.id("_storage")),
    common_name: v.string(),
    scientific_name: v.string(),
    description: v.string(),
    category: v.string(),
    plant_Type: v.string(),
    life_span: v.string(),
    sunlight: v.string(),
    wateringNeeds: v.string(),
    humidityPreference: v.string(),
    medicinalUses: v.string(),
    culinaryUse: v.string(),
  },
  handler: async (ctx, args) => {
    // First, check if the plant exists
    const existing = await ctx.db.get(args.id);

    if (!existing) {
      throw new Error("Plant not found");
    }

    // Create update object
    const updateData: any = {
      common_name: args.common_name,
      scientific_name: args.scientific_name,
      description: args.description,
      category: args.category,
      plant_Type: args.plant_Type,
      life_span: args.life_span,
      sunlight: args.sunlight,
      wateringNeeds: args.wateringNeeds,
      humidityPreference: args.humidityPreference,
      medicinalUses: args.medicinalUses,
      culinaryUse: args.culinaryUse,
    };

    // If a new image was uploaded, update the imageId
    if (args.storageId) {
      updateData.imageId = args.storageId;
    }

    // Update the plant in the database
    await ctx.db.patch(args.id, updateData);

    return { success: true };
  },
});
