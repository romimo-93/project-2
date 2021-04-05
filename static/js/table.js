

d3.csv("/static/airline_accident_data/airline_accidents.csv", function(tableData) {
    // var tableData = ("../airline_accident_data/airline_accidents.csv");
        console.log(tableData);



    const tbody = d3.select("tbody");

    function buildTable(csv) {
      // First, clear out any existing data
      tbody.html("");
    
      // Next, loop through each object in the data
      // and append a row and cells for each value in the row
      var event_date = []
      var location = []
      var country = []
      var airplane_code = []
      var airport_name = []
      var injury = []
      var fatal = []

      tableData.forEach((dataRow) => {
        // Append a row to the table body
        const row = tbody.append("tr");
    
        // Loop through each field in the dataRow and add
        // each value as a table cell (td)

        Object.values(dataRow).forEach((val) => {
            if (key === "Event Date"){
                event_date.push(value);
            }
            else if (key === "Location"){
                location.push(value);
            }
            else if (key === "Country"){
                location.push(value);
            }
            else if (key === "Airport Code"){
                location.push(value);
            }
            else if (key === "Airport Name"){
                location.push(value);
            }
            else if (key === "Location"){
                location.push(value);
            }
            let cell = row.append("td").text(event_date);
              cell.text(val);
            }
          );
        });
      }
    //     Object.values(dataRow).forEach((val) => {
    //         if (key === "Event Date"){
    //             event_date.push(value);
    //         }
    //         else if (key === "Location"){
    //             location.push(value);)
    //         }
    //         let cell = row.append("td");
    //             cell.text(val);
    //       });
    //     );
    //   });
    // }

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
buildTable(tableData);

});
