import React, { useState } from "react";

const DateRangeFilter = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // Example dataset
  const data = [
    { id: 1, name: "Item 1", date: "2025-01-05" },
    { id: 2, name: "Item 2", date: "2025-01-10" },
    { id: 3, name: "Item 3", date: "2025-01-15" },
    { id: 4, name: "Item 4", date: "2025-01-20" },
  ];

  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = data.filter(
        (item) => item.date >= startDate && item.date <= endDate
      );
      setFilteredData(filtered);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Filter Data Between Two Dates</h2>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button onClick={handleFilter} style={{ marginTop: "10px" }}>
        Filter
      </button>
      <div>
        <h3>Filtered Results:</h3>
        {filteredData.length > 0 ? (
          <ul>
            {filteredData.map((item) => (
              <li key={item.id}>
                {item.name} - {item.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found for the selected dates.</p>
        )}
      </div>
    </div>
  );
};

export default DateRangeFilter;
