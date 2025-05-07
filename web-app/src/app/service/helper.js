const API_URL = "http://localhost:8080"; // Remplacez par l'URL de votre API

// Helpers pour les requêtes fetch

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
};

  
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
};

export { headers, handleResponse , API_URL };