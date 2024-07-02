const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
let MONGO_URI = process.env.MONGO_URI;

const connectDatabase = () => {
  // MONGO_URI =
  //   "mongodb+srv://ds4850716:deepak987@cluster0.dvuqvyh.mongodb.net/flipkart_clone?retryWrites=true&w=majority&appName=Cluster0";
  console.log("mogo->", MONGO_URI);
  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Mongoose Connected");
    });
};

module.exports = connectDatabase;
