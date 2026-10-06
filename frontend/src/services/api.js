const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const generateCurriculum = async (data) => {
  const response = await fetch(`${API_URL}/curriculum/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error("Failed to generate curriculum");
  return response.json();
};
