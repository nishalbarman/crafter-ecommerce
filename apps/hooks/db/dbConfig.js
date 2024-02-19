const mongoose = require("mongoose");

module.exports = function connect() {
  const connectionString =
    "mongodb+srv://project-playo:Xi2UCKjIEzd2EChFAjZmupCrOlZt7Vp2@project-playo.z9knmzk.mongodb.net/crafter-ecommerce";
  mongoose.connect(connectionString);

  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("Database is ready to use!");
  });

  connection.on("error", (error) => {
    console.error("Mongoose connection error:-> ", error);
  });
};
