const cron = require("node-cron");
const axios = require("axios");
const fs = require("fs");
const fastcsv = require("fast-csv");

class DifferentDTO {
  constructor(id, title, body) {
    this.id = id;
    this.title = title;
    this.body = body;
  }
}

const folder = "PostCSV";

if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

const fetchDataFromAPI = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  } catch (error) {
    throw new error();
  }
};

const convertToDifferentDTO = (apiData) => {
  return apiData.map(
    (item) => new DifferentDTO(item.id, item.title, item.body)
  );
};

const createCSV = (data) => {
  const date = Date.now();
  const filename = `${folder}/post-${date}.csv`;
  const csvStream = fastcsv.format({ headers: true });
  const writableStream = fs.createWriteStream(filename);
  csvStream.pipe(writableStream);

  if (data && data.length > 0) {
    data.forEach((row) => csvStream.write(row));
  }
  csvStream.end();
};

//background worker ->extract data in every 5 minutes
cron.schedule("5 * * * *", fetchDataFromAPI);

module.exports = { fetchDataFromAPI, createCSV, convertToDifferentDTO };
