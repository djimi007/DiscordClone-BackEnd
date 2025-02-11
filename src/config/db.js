require("dotenv").config();

const mongoose = require("mongoose");

const { MONGO_DB } = process.env;

const connectToDb = async () => {
  try {
    await mongoose.connect(MONGO_DB);

  } catch (error) {
    console.log("====================================");
    console.log("Error Db Connection " + error);
    console.log("====================================");
  }
};

connectToDb();
