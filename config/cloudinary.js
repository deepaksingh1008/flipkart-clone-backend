const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();
console.log(
  "process.env.CLOUDINARY_CLOUD_NAME",
  process.env.CLOUDINARY_CLOUD_NAME
);
cloudinary.config({
  cloud_name: "dumn1wliz",
  api_key: "518595795219881",
  api_secret: "9kWvkZYfifUuhTjovgZiUB_o4B8",
});

module.exports = cloudinary;
