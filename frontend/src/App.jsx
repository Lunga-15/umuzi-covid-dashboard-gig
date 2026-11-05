// Import React hooks
import { useState, useEffect } from "react";

// Import API service
import { getCountries, getCountryData } from "./services/covidService";

// Import CSS
import "./App.css";

import ConfirmedCasesChart from "./components/ConfirmedCasesChart";

import MetricCards from "./components/MetricCards";

import NewCasesChart from "./components/NewCasesChart";

function App() {
  // Store the available countries
  const [countries, setCountries] = useState([]);

  // Store the currently selected country
  const [selectedCountry, setSelectedCountry] = useState("");

  // Track whether data is still loading
  const [loading, setLoading] = useState(true);

  // Store any error messages
  const [error, setError] = useState("");

  // Store the selected country's COVID-19 information
  const [countryData, setCountryData] = useState(null);

  // Track whether country data is loading
  const [dataLoading, setDataLoading] = useState(false);

  // Store errors when fetching country data
  const [dataError, setDataError] = useState("");

  // Fetch countries when the component first loads
  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await getCountries();

        setCountries(data);

        // Select the first country by default
        if (data.length > 0) {
          setSelectedCountry(data[0].code);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  // Fetch data whenever the selected country changes
  useEffect(() => {
    // Don't fetch anything if no country is selected
    if (!selectedCountry) {
      return;
    }

    const loadCountryData = async () => {
      setDataLoading(true);
      setDataError("");

      try {
        // Request the selected country's information
        const data = await getCountryData(selectedCountry);

        // Store the returned information
        setCountryData(data);
      } catch (error) {
        setDataError(error.message);
        setCountryData(null);
      } finally {
        setDataLoading(false);
      }
    };

    loadCountryData();
  }, [selectedCountry]);

  return (
    <main>
      <h1>COVID-19 Early Outbreak Dashboard</h1>

      <p>Explore COVID-19 statistics across countries.</p>

      {loading ? (
        <p>Loading countries...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <label htmlFor="country">Select a country:</label>

          <select
            id="country"
            value={selectedCountry}
            onChange={(event) => setSelectedCountry(event.target.value)}
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.country}
              </option>
            ))}
          </select>

          <p>Selected country code: {selectedCountry}</p>

          {dataLoading && <p>Loading country data...</p>}

          {dataError && <p>Error: {dataError}</p>}

          {countryData && !dataLoading && (
            <section>
              <h2>{countryData.country} COVID-19 Trends</h2>

              <MetricCards records={countryData.data} />

              <ConfirmedCasesChart records={countryData.data} />

              <NewCasesChart records={countryData.data} />
            </section>
          )}
        </div>
      )}
    </main>
  );
}

export default App;
