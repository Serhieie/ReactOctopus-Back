import { ctrlWrapper } from "../helpers/index.js";
import { getImages } from "../services/imageService.js";



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


export default {
    getDesctopImages: ctrlWrapper(getDesctopImages),
};

