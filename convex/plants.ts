import { mutation,query } from "./_generated/server";
import { v } from "convex/values";


 
export const sendPlantDetails = mutation({
  args:{
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
    culinaryUse: v.string()},
    
  handler: async (ctx, args) => {
    await ctx.db.insert("plants",{
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
    })
   }
});



export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  });



export const getPlants = query({
    handler: async (ctx) => {
      const images = await ctx.db
        .query("plants")
        .collect();
  
      // Generate URLs for each image
      return await Promise.all(
        images.map(async (image) => ({
          _id: image._id,
          common_name: image.common_name,
          category: image.category,
          url: await ctx.storage.getUrl(image.imageId), // Convert storageId to a URL
        }))
      );
    },
  });

 