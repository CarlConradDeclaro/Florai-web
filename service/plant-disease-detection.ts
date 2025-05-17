export async function Predict_Disease(formData: FormData) {
  const response = await fetch("http://localhost:8000/plant_disease/", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to analyze image");
  }

  return response;
}
