const express = require("express");
const { default: mongoose, mongo } = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.DATABASE_SERVER_URL)
  .then(() => {
    console.log("Database connection successful");
    setupChangeStream();
  })
  .catch((err) => {
    console.error("Database connection error", err);
  });

// Change Stream Setup
function setupChangeStream() {
  try {
    const Category = mongoose.connection.collection("categories");
    const changeStream = Category.watch();

    console.log("Change Stream listening for changes...");

    changeStream.on("change", (change) => {
      console.log(change.operationType);

      if (change.operationType === "insert") {
        console.log("New document inserted: ", change.fullDocument);
      } else if (change.operationType === "update") {
        console.log("Document updated: ", change.documentKey);
      } else if (change.operationType === "delete") {
        console.log("Document deleted: ", change.documentKey);
      } else {
        console.log("Unsupported operation type: ", change.operationType);
      }
    });
  } catch (err) {
    console.error("Error in change stream", err);
  }
}

// Categories Router
const categoriesRouter = require("./routes/categories");
app.use("/api/categories", categoriesRouter);

app.get("/", (req, res) => {
  res.send("Categori API is running!");
});

// Express server
const PORT = process.env.PORT || 5254;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// docker run -it --rm --network=host mongo:latest mongosh "mongodb://localhost:27017/?replicaSet=rs0"

/*

rs.initiate();

cfg = rs.conf() 
cfg.members[0].host = "localhost:27017"  
rs.reconfig(cfg, {force: true})


*/
