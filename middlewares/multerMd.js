const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder;
    if (file.fieldname === 'avatar') {
      folder = 'avatars';
    } 
    return {
      folder: folder,
      allowed_formats: ["jpg", "png"],
      transformation: [
        { width: 350, height: 350 },
        { width: 700, height: 700 },
      ]
    }
  }
});

const upload = multer({ storage });

module.exports = upload;
