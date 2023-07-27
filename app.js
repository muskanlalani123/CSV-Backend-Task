const express = require("express");
const {
  fetchDataFromAPI,
  createCSV,
  convertToDifferentDTO,
} = require("./Controllers/dataFetcher.js");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get("/post", async (req, res) => {
  try {
    const apiData = await fetchDataFromAPI();
    const differentDTOData = convertToDifferentDTO(apiData);
    createCSV(differentDTOData);
    res.json("CSV Created");
  } catch (error) {
    console.error("Error in /post endpoint:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
