const API_URL = "https://oceanis-1jdp.onrender.com/api/ports";

export async function getAllPorts() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch ports: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching ports:", error);
    throw error;
  }
}