const mongoose = require("mongoose");

module.exports = function connect() {
  const connectionString =
    "***REMOVED***";
  mongoose.connect(connectionString);

  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("Database is ready to use!");
  });

  connection.on("error", (error) => {
    console.error("Mongoose connection error:-> ", error);
  });
};
