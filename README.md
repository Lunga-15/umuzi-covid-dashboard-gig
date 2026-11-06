# COVID-19 Early Outbreak Dashboard

## Overview

An interactive web dashboard designed to visualise the early outbreak of COVID-19 between February and March 2020.

The dashboard allows users to explore confirmed cases, deaths, recoveries, and active cases across five countries, providing insights into how the pandemic developed during its early stages.

The application uses a **React frontend** and a **Node.js/Express backend**, with COVID-19 statistics retrieved from a JSON dataset.

## Features

- **Country Selection:** View COVID-19 statistics for China, Italy, South Korea, United States, and South Africa.
- **Key Metrics:** Display confirmed cases, deaths, recoveries, and calculated active cases.
- **Cumulative Trends:** Interactive line chart showing confirmed cases, deaths, and recoveries over time.
- **New Cases Analysis:** Bar chart showing increases in confirmed cases between consecutive reporting dates.
- **Date Range Filtering:** Filter the dashboard by selecting start and end dates.
- **Responsive Design:** Layout adapts to desktop, tablet, and mobile screens.
- **Data Handling:** Includes loading states, error messages, and handling for unavailable records.

## Technologies Used

### Frontend
- React
- JavaScript
- Vite
- Chart.js
- React Chart.js 2
- date-fns and Chart.js date adapter
- CSS3

### Backend
- Node.js
- Express.js
- CORS

### Version Control
- Git
- GitHub

## Project Structure

```text
covid-dashboard/
│
├── backend/
│   ├── data/
│   │   └── covid-19.json
│   ├── src/
│   │   └── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmedCasesChart.jsx
│   │   │   ├── MetricCards.jsx
│   │   │   └── NewCasesChart.jsx
│   │   ├── services/
│   │   │   └── covidService.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── milestone testing evidence/
│   ├── milestone 1 - setup & data loading/
│   ├── milestone 2 - charts implementation/
│   ├── milestone 3 - all charts & metrics/
│   └── milestone 4 - polish & submission/
│
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

Ensure the following are installed:

- Node.js and npm
- Git
- A modern web browser

### 1. Clone the Repository

```bash
git clone https://github.com/Lunga-15/umuzi-covid-dashboard-gig.git
```

Navigate into the project directory:

```bash
cd umuzi-covid-dashboard-gig
```

### 2. Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the Express server:

```bash
npm start
```

The backend runs at:

`http://localhost:5000`

### 3. Set Up the Frontend

Open a **second terminal** in the project root.

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the application in your browser:

`http://localhost:5173`

**Note:** Both frontend and backend servers must be running for the dashboard to retrieve and display COVID-19 information.

## API Endpoints

The Express backend provides the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Checks whether the backend is running |
| GET | `/api/countries` | Returns the list of available countries |
| GET | `/api/countries/:code` | Returns COVID-19 records for a selected country |

### Example Request

```text
GET http://localhost:5000/api/countries/ZA
```

Returns COVID-19 records for South Africa.

Supported country codes:

- `CN` — China
- `IT` — Italy
- `KR` — South Korea
- `US` — United States
- `ZA` — South Africa

Invalid country codes return an HTTP 404 response with an error message.

## Data Source

The application uses the provided `covid-19.json` dataset, which identifies the **Johns Hopkins University CSSE COVID-19 Data Repository** as its source.

The dataset covers February 1 to March 31, 2020, and contains cumulative confirmed cases, deaths, and recoveries for five countries.

The supplied file contains selected reporting dates rather than complete daily observations.

## Data Calculations

### Active Cases

Active cases are calculated using:

```text
Active Cases = Confirmed Cases - Deaths - Recoveries
```

For example, South Africa on March 31, 2020:

```text
Confirmed:  1,353
Deaths:         5
Recovered:     31

Active = 1,353 - 5 - 31
Active = 1,317
```

The metric cards display values from the latest available record within the selected date range.

### Increase in Confirmed Cases

Additional confirmed cases are calculated by subtracting the previous cumulative total from the current total.

```text
Increase = Current Confirmed - Previous Confirmed
```

For example, Italy:

```text
February 20:   3 cases
February 25: 283 cases

Increase = 283 - 3
Increase = 280 cases
```

**Important:** Because the dataset does not contain observations for every day, these increases represent changes between recorded dates, not exact daily new cases.

The bar chart displays the reporting intervals used for each calculation. When a date filter is applied, an interval ending inside the selected range may use an earlier observation as its baseline.

### Date Range Filtering

The dashboard allows users to filter the timeline between February 1 and March 31, 2020.

- Cumulative charts display records within the selected date range.
- Metric cards display the latest available values in that range.
- The bar chart displays calculated increases for reporting intervals ending within the selected range.
- Invalid date ranges and periods without observations are handled with informative messages.
- The **Reset Dates** button restores the full dataset period.

## Data Visualisation

### Cumulative COVID-19 Trends

The line chart displays three datasets:

- Confirmed cases
- Deaths
- Recoveries

A time-based X-axis positions observations according to their actual reporting dates.

### Increase in Confirmed Cases

The bar chart displays the difference in cumulative confirmed cases between consecutive reporting observations.

Reporting intervals are labelled using abbreviated month names for readability.

## Testing and Validation

Manual testing was performed throughout development to verify the dashboard's functionality and accuracy.

| Test | Expected Result |
|---|---|
| Backend health check | API responds successfully |
| Country loading | All five countries are available |
| Country selection | Metrics and charts update correctly |
| Active cases | Values match calculated results |
| Cumulative line chart | Displays all three data series |
| New cases bar chart | Displays correct interval increases |
| Date filtering | Displays records within the selected range |
| Invalid date range | Displays a validation message |
| Reset Dates | Restores the full reporting period |
| Responsive design | Layout adapts across screen sizes |
| Invalid country code | Backend returns HTTP 404 |

### Key Data Validation

The following observations from the supplied dataset were used during testing:

**China**
- Confirmed cases reached 81,554 by March 31, 2020.
- The largest increase between consecutive supplied reporting dates occurred during February 10–20.

**Italy**
- Confirmed cases increased from 1,128 on March 1 to 105,792 on March 31, demonstrating rapid growth during March.

**South Africa**
- The first recorded case in the supplied dataset appears on March 5, 2020.
- Confirmed cases reached 1,353 by March 31, 2020.

## Testing Evidence

Screenshots of the dashboard, API responses, charts, calculations, and responsive layouts are organised in the `milestone testing evidence` directory.

Evidence is grouped according to the project's four milestones:

1. **Milestone 1 — Setup and Data Loading:** Project setup, API responses, country selection, and data retrieval.
2. **Milestone 2 — Charts Implementation:** Initial cumulative confirmed-cases chart and country switching.
3. **Milestone 3 — All Charts and Metrics:** Metric cards, complete cumulative line chart, and new-cases bar chart.
4. **Milestone 4 — Polish and Submission:** Responsive layouts, date filtering, and final validation.

