d3.csv("/static/airline_accident_data/airline_accidents.csv", function(tableData) {
  // console.log(tableData);
  const tbody = d3.select("tbody");

  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  var fields = ["Event Date", "Location", "Country", "Airport Code", "Airport Name", "Injury Severity", "Total Fatal Injuries"];

  tableData.forEach((dataRow) => {
    // Append a row to the table body
    const row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)

    Object.values(dataRow).forEach((key, value) => {
      if (key in fields) {
        row.append("td", value);
        console.log("true");
      }
    });
  });
});

// get table references


function handleClick() {

  // Grab the datetime value from the filter
  const code = d3.select("Airport Code").property("value");
  let filteredData = tableData;

  // Check to see if a date was entered and filter the
  // data using that date.
  if (code) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    filteredData = filteredData.filter(row => row.planecode === code);
  }

  // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will
  // just be the original tableData.
  buildTable(filteredData);
}

// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
// buildTable(tableData);
