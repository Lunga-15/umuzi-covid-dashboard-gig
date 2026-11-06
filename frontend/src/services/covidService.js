// Use deployed API URL or localhost when developing
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// Get all available countries
export async function getCountries() {

    // Send a request to the backend
    const response = await fetch(`${API_URL}/api/countries`);

    // Check if the request was successful
    if (!response.ok) {
        throw new Error("Failed to fetch countries");
    }

    // Convert the response into JSON
    const data = await response.json();

    return data;
}

// Get COVID-19 data for a specific country
export async function getCountryData(countryCode) {

    // Request data for the selected country
    const response = await fetch(
        `${API_URL}/api/countries/${countryCode}`
    );

    // Check whether the request was successful
    if (!response.ok) {
        throw new Error("Failed to fetch country data");
    }

    // Convert the response into JSON
    const data = await response.json();

    return data;
}