const path = require("path");
const express = require("express");
const cloudinary = require("./config/cloudinary");
const app = require("./app");
const connectDatabase = require("./config/database");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
//const app = require('./app');
//const port = process.env.PORT || 3000;
//const server = http.createServer(app);
//server.listen(port,()=>{console.log('this app is running on '+port)});
dotenv.config();
const PORT = process.env.PORT || 4000;

// UncaughtException Error
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});

connectDatabase();
// console.log("pr->", process.env.COOKIE_EXPIRE);
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// deployment
// __dirname = path.resolve();
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '/frontend/build')))

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//     });
// } else {
//     app.get('/', (req, res) => {
//         res.send('Server is Running! 🚀');
//     });
// }
// app.get("*/", (req, res) => {
//   res.send({ message: "sucessfully" });
// });

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log("this app is running on " + port);
});

// const server = app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
