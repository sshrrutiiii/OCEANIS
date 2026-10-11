const API_URL = "https://oceanis-1jdp.onrender.com/api/voyages";

export async function saveVoyage(voyage) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(voyage),
  });

  if (!response.ok) {
    throw new Error("Failed to save voyage");
  }

  return response.json();
}

export async function getAllVoyages() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch voyages");
  }

  return response.json();
}