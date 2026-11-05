// Import Express
const express = require("express");

// Import CORS
const cors = require("cors");

// Import Node.js file system module
const fs = require("fs");

// Import Node.js path module
const path = require("path");

// Find the location of the COVID-19 dataset
const dataPath = path.join(
    __dirname,
    "..",
    "data",
    "covid-19.json"
);

// Read the COVID-19 JSON file
const fileContents = fs.readFileSync(dataPath, "utf8");

// Convert JSON text into a JavaScript object
const covidData = JSON.parse(fileContents);

// Create Express application
const app = express();

// Allow React frontend to communicate with the backend
app.use(cors({
    origin: "http://localhost:5173"
}));

// Choose the port the server will use
const PORT = 5000;

// Create first API endpoint
app.get("/api/health", (req, res) => {

    res.json({
        message: "COVID-19 Dashboard API is running!"
    });

});

// Get the list of available countries
app.get("/api/countries", (req, res) => {

    const countries = covidData.countries.map((item) => ({
        country: item.country,
        code: item.code
    }));

    res.json(countries);

});

// Get COVID-19 data for a specific country
app.get("/api/countries/:code", (req, res) => {

    // Get the country code from the URL
    const countryCode = req.params.code.toUpperCase();

    // Find the country that matches the code
    const selectedCountry = covidData.countries.find(
        (item) => item.code === countryCode
    );

    // Check whether the country exists
    if (!selectedCountry) {
        return res.status(404).json({
            message: "Country not found"
        });
    }

    // Return the selected country's data
    res.json(selectedCountry);

});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});