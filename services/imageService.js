import { getImagesFromFolder } from "../helpers/index.js";


const getImages = async (folderName) => {
    const imageUrls = await getImagesFromFolder(folderName);
    return imageUrls
}

export {
  getImages
};