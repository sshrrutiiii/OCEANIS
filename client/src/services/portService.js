const API_URL = "https://oceanis-1jdp.onrender.com/api/ports";

export async function getAllPorts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch ports");
  }

  return response.json();
}