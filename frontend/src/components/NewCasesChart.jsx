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

function NewCasesChart({ records = [], startDate = "", endDate = "" }) {
  // Sort records chronologically
  const sortedRecords = [...records].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  // Convert a full date into a shorter label
  const shortDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${Number(month)}/${Number(day)}`;
  };
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${months[Number(month) - 1]} ${Number(day)}`;
  };

  // Calculate increases between consecutive records
  const intervals = sortedRecords
    .slice(1)
    .map((record, index) => ({
      endDate: record.date,

      label: `${formatDate(sortedRecords[index].date)} – ${formatDate(record.date)}`,
      increase: record.confirmed - sortedRecords[index].confirmed,
    }))

    .filter((interval) => {
      const afterStart = !startDate || interval.endDate >= startDate;

      const beforeEnd = !endDate || interval.endDate <= endDate;

      return afterStart && beforeEnd;
    });

  // Prepare the labels and values for Chart.js
  const dates = intervals.map((interval) => interval.label);

  const newCases = intervals.map((interval) => interval.increase);

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
        display: false,
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
    <section className="chart-card">
      <h2>Increase in Confirmed Cases</h2>

      <p>
        Additional confirmed cases recorded between consecutive reporting dates.
      </p>

      {intervals.length > 0 ? (
        <div className="chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>
      ) : (
        <p>Not enough records to calculate increases.</p>
      )}
    </section>
  );
}

export default NewCasesChart;