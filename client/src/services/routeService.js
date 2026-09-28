import axios from "axios";

const API_URL = "http://localhost:8080/api/routes";

export const findShortestRoute = async (
  sourcePortId,
  destinationPortId
) => {
  try {
    const response = await axios.get(
      `${API_URL}/shortest`,
      {
        params: {
          source: sourcePortId,
          destination: destinationPortId,
        },
      }
    );

    console.log(
      "Shortest route response:",
      response.data
    );

    return response.data;

  } catch (error) {

    console.error(
      "Failed to calculate shortest route:",
      error
    );

    throw error;
  }
};