const { getImagesFromFolder} = require("../helpers");

const getImages = async (folderName) => {
    const imageUrls = await getImagesFromFolder(folderName);
    return imageUrls
}

module.exports = {
  getImages,
};
