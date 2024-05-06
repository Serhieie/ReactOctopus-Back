import { v2 as cloudinary } from "cloudinary";
import httpError from "./httpError.js";

cloudinary.config({
  cloud_name: "YOUR_CLOUD_NAME",
  api_key: "YOUR_API_KEY",
  api_secret: "YOUR_API_SECRET"
});

const getImagesFromFolder = async (folderName) => {
  try {
    const { resources } = await cloudinary.api.resources({
      type: "upload",
        prefix: folderName,
        max_results: 15,
        context: true,
    });
    const imageUrls = resources.map(resource => resource.url);
    return imageUrls;
  } catch (error) {
    throw httpError(404);
  }
}

export { getImagesFromFolder };

