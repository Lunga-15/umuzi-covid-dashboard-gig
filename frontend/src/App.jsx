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

  // Store the selected start and end dates
  const [startDate, setStartDate] = useState("2020-02-01");
  const [endDate, setEndDate] = useState("2020-03-31");

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

  // Check if the start date is after the end date
  const invalidDateRange = startDate && endDate && startDate > endDate;

  // Filter the selected country's records
  const filteredRecords =
    countryData?.data.filter((record) => {
      const afterStart = !startDate || record.date >= startDate;

      const beforeEnd = !endDate || record.date <= endDate;

      return afterStart && beforeEnd;
    }) ?? [];

  return (
    <main className="dashboard">
      {/* Dashboard heading */}
      <header className="dashboard-header">
        <h1>COVID-19 Early Outbreak Dashboard</h1>

        <p className="dashboard-subtitle">
          Explore the early COVID-19 outbreak across countries. February - March
          2020.
        </p>
      </header>

      {/* Country selector */}
      {loading ? (
        <p className="status-message">Loading countries...</p>
      ) : error ? (
        <p className="status-message">Error: {error}</p>
      ) : (
        <div className="country-filter">
          <label htmlFor="country">Select a country:</label>

          <select
            id="country"
            className="country-select"
            value={selectedCountry}
            onChange={(event) => setSelectedCountry(event.target.value)}
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.country}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Date range filter */}
      <div className="date-filter">
        <div className="date-filter-group">
          <label htmlFor="start-date">Start Date:</label>

          <input
            type="date"
            id="start-date"
            value={startDate}
            min="2020-02-01"
            max="2020-03-31"
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>

        <div className="date-filter-group">
          <label htmlFor="end-date">End Date:</label>

          <input
            type="date"
            id="end-date"
            value={endDate}
            min="2020-02-01"
            max="2020-03-31"
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>

        <button
          type="button"
          className="clear-filter"
          onClick={() => {
            setStartDate("2020-02-01");
            setEndDate("2020-03-31");
          }}
        >
          Reset Dates
        </button>
      </div>

      {/* Selected country loading message */}
      {dataLoading && <p className="status-message">Loading country data...</p>}

      {/* Selected country error message */}
      {dataError && <p className="status-message">Error: {dataError}</p>}

      {/* Dashboard content */}

      {countryData && !dataLoading && !dataError && (
        <section className="dashboard-content">
          <h2 className="country-heading">
            {countryData.country} COVID-19 Overview
          </h2>

          {invalidDateRange ? (
            <p className="status-message">
              Start date cannot be after end date.
            </p>
          ) : filteredRecords.length === 0 ? (
            <p className="status-message">
              No recorded data available for this date range.
            </p>
          ) : (
            <>
              <MetricCards records={filteredRecords} />

              <div className="charts-grid">
                <ConfirmedCasesChart records={filteredRecords} />

                <NewCasesChart
                  records={countryData.data}
                  startDate={startDate}
                  endDate={endDate}
                />
              </div>
            </>
          )}
        </section>
      )}
    </main>
  );
}

export default App;
