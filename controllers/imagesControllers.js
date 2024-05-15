import { ctrlWrapper } from "../helpers/index.js";
import { getImages } from "../services/imageService.js";



const getDesctopImages = async (req, res) => {
    const { type} = req.params;
    if (type === "desctop" ||
        type === "tablet"  ||
        type === "mobile"  ||
        type === "desctopx2" ||
        type === "tabletx2"  ||
        type === "mobilex2") {
        const imageUrls = await getImages(`react-octopus/${folderName}`);
        res.json({ imageUrls });
    } 
}


export default {
    getDesctopImages: ctrlWrapper(getDesctopImages),
};

