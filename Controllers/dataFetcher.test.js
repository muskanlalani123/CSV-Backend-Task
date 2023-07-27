const axios = require("axios");
const {
  fetchDataFromAPI,
  createCSV,
  DifferentDTO,
  convertToDifferentDTO,
} = require("../Controllers/dataFetcher");

jest.mock("axios");

describe("fetchDataFromAPI", () => {
  test("should return data from API", async () => {
    const mockData = [
      { id: 1, title: "Post 1", body: "This is post 1" },
      { id: 2, title: "Post 2", body: "This is post 2" },
    ];

    axios.get.mockResolvedValueOnce({ data: mockData });

    const data = await fetchDataFromAPI();

    expect(data).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts"
    );
  });

  test("should handle an API error", async () => {
    const errorMessage = "Network Error";

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
  });
});

describe("createCSV", () => {
  test("should create a CSV file with data", () => {
    const data = [
      { id: 1, title: "Post 1", body: "This is post 1" },
      { id: 2, title: "Post 2", body: "This is post 2" },
    ];

    createCSV(data);
  });
});

describe("convertToDifferentDTO", () => {
  test("should return an array of DifferentDTO objects with id and title", () => {
    const apiData = [
      {
        id: 1,
        title: "First Post",
        body: "This is the body of the first post",
      },
      {
        id: 2,
        title: "Second Post",
        body: "This is the body of the second post",
      },
    ];

    const result = convertToDifferentDTO(apiData);

    // Check if the result is an array
    expect(Array.isArray(result)).toBe(true);

    // Check if the array contains instances of DifferentDTO with id and title properties
    result.forEach((dto) => {
      expect(dto).toBeInstanceOf(DifferentDTO);
      expect(dto).toHaveProperty("id");
      expect(dto).toHaveProperty("title");
    });
  });

  test("should return an empty array for empty input", () => {
    const apiData = [];

    const result = convertToDifferentDTO(apiData);

    expect(result).toEqual([]);
  });
});
