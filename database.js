const mongoose = require("mongoose");

const connectionString = require("./config");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(connectionString);
    console.log(`mongo connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(`error connecting to DB - trying again - ${e.message} `);
  }
};

module.exports = connectDB;
