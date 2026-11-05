function MetricCards({ records = [] }) {
  // Sort records by date
  const sortedRecords = [...records].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  // Check whether records exist
  if (sortedRecords.length === 0) {
    return <p>No COVID-19 data available.</p>;
  }

  // Get the latest recorded information
  const latestRecord = sortedRecords[sortedRecords.length - 1];

  // Calculate active cases
  const activeCases =
    latestRecord.confirmed - latestRecord.deaths - latestRecord.recovered;

  return (
    <section className="metrics-grid">
      {[
        {
          label: "Confirmed Cases",
          value: latestRecord.confirmed,
        },
        {
          label: "Deaths",
          value: latestRecord.deaths,
        },
        {
          label: "Recoveries",
          value: latestRecord.recovered,
        },
        {
          label: "Active Cases",
          value: activeCases,
        },
      ].map((metric) => (
        <article className="metric-card" key={metric.label}>
          <h3>{metric.label}</h3>

          <p>{metric.value.toLocaleString()}</p>
        </article>
      ))}
    </section>
  );
}

export default MetricCards;
