// Commission Calculator API functions
// Add API call logic here after extracting from App.js

export async function calculateCommission(data) {
  const response = await fetch("https://localhost:5000/Commision", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to calculate commission");
  }

  return await response.json();
}
