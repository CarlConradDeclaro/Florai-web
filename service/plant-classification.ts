export async function Classify_Plant(formData: FormData) {
  const response = await fetch("http://localhost:8000/classify/", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Classification request failed");
  }

  return response;
}

export async function Get_Predicted_Plant(flowerName: string) {
  const response = await fetch(
    "http://localhost:8000/predicted_image_details/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: flowerName }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch predicted image details");
  }

  return response;
}
