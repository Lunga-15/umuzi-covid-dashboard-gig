// Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Import the React Line chart
import { Line } from "react-chartjs-2";

// Register the components required by Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

function ConfirmedCasesChart({ records = [] }) {
  // Sort records by date, without modifying the original array
  const sortedRecords = [...records].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  // Extract dates for the X-axis
  const dates = sortedRecords.map((record) => record.date);

  // Extract confirmed cases for the Y-axis
  const confirmedCases = sortedRecords.map((record) => record.confirmed);

  // Extract deaths from each record
  const deaths = sortedRecords.map((record) => record.deaths);

  // Extract recoveries from each record
  const recoveries = sortedRecords.map((record) => record.recovered);
  
  // Prepare the information for Chart.js
  const chartData = {
    // Dates displayed along the X-axis
    labels: dates,

    // The information displayed as lines
    datasets: [
      {
        label: "Confirmed Cases",
        data: confirmedCases,

        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.15)",

        borderWidth: 2,
        pointRadius: 4,
        tension: 0.25,
      },

      {
        label: "Deaths",
        data: deaths,

        borderColor: "#dc5555",
        backgroundColor: "rgba(220, 85, 85, 0.15)",

        borderWidth: 2,
        pointRadius: 4,
        tension: 0.25,
      },

      {
        label: "Recoveries",
        data: recoveries,

        borderColor: "#269b68",
        backgroundColor: "rgba(38, 155, 104, 0.15)",

        borderWidth: 2,
        pointRadius: 4,
        tension: 0.25,
      },
    ],
  };

  // Configure how the chart should look
  const chartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      title: {
        display: true,
        text: "COVID-19 Cases Over Time",
      },

      legend: {
        display: true,
        position: "top",
      },

      tooltip: {
        enabled: true,
      },
    },

    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },

      y: {
        beginAtZero: true,

        title: {
          display: true,
          text: "Confirmed Cases",
        },
      },
    },
  };

  return (
    <section>
      <h2>Confirmed Cases Over Time</h2>

      {records.length > 0 ? (
        <div style={{ height: "400px" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p>No COVID-19 records available.</p>
      )}
    </section>
  );
}

export default ConfirmedCasesChart;