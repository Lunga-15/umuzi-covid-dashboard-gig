// Import Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Import the React Bar chart
import { Bar } from "react-chartjs-2";

// Register the components required by Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

function NewCasesChart({ records = [] }) {
  // Sort records chronologically
  const sortedRecords = [...records].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  // Calculate increases between consecutive records
  const newCases = sortedRecords
    .slice(1)
    .map((record, index) => record.confirmed - sortedRecords[index].confirmed);

  // Create labels showing the reporting intervals
  const dates = sortedRecords
    .slice(1)
    .map((record, index) => `${sortedRecords[index].date} to ${record.date}`);

  // Prepare data for Chart.js
  const chartData = {
    // Reporting intervals displayed on the X-axis
    labels: dates,

    // Information displayed in the bar chart
    datasets: [
      {
        label: "Increase in Confirmed Cases",

        data: newCases,

        backgroundColor: "rgba(37, 99, 235, 0.65)",

        borderColor: "#2563eb",

        borderWidth: 1,

        borderRadius: 6,
      },
    ],
  };

  // Configure the appearance of the bar chart
  const chartOptions = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      title: {
        display: true,
        text: "Increase in Confirmed Cases Between Reported Dates",
      },

      legend: {
        display: false,
      },

      tooltip: {
        enabled: true,
      },
    },

    scales: {
      x: {
        title: {
          display: true,
          text: "Reporting Interval",
        },
      },

      y: {
        beginAtZero: true,

        title: {
          display: true,
          text: "Additional Confirmed Cases",
        },
      },
    },
  };

  return (
    <section>
      <h2>Increase in Confirmed Cases</h2>

      <p>
        Additional confirmed cases recorded between consecutive reporting dates.
      </p>

      {records.length > 1 ? (
        <div style={{ height: "400px" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p>Not enough records to calculate increases.</p>
      )}
    </section>
  );
}

export default NewCasesChart;