const { ctrlWrapper } = require("../helpers");
const {getImages} = require("../services/imageService")


const getDesctopImages = async (req, res) => {
    const fullOriginalUrl = req.originalUrl;
    const endpoint = fullOriginalUrl.split("/");
    const folderName = endpoint[3];
    
    if (folderName === "desctop" ||
        folderName === "tablet"  ||
        folderName === "mobile"  ||
        folderName === "desctopx2" ||
        folderName === "tabletx2"  ||
        folderName === "mobilex2") {
        const imageUrls = await getImages(`react-octopus/${folderName}`);
        res.json({ imageUrls });
    } 

}   

// const getTabletImages = async (req, res) => {
//     const imageUrls = await getImages(res, "tablet");
//     res.json({ imageUrls });
// } 

// const getMobileImages = async (req, res) => {
//     const imageUrls = await getImages(res, "mobile");
//     res.json({ imageUrls });
// } 


module.exports = {
    getDesctopImages: ctrlWrapper(getDesctopImages),
    // getTabletImages: ctrlWrapper(getTabletImages),
    // getMobileImages: ctrlWrapper(getMobileImages)
};
