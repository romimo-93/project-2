function circleSize(fatalities) {
  return fatalities ** 1.5;
}

// Create function to set the color for different magnitude
function getColor(fatalities) {
  // Conditionals for magnitude
  if (fatalities >= 50) {
    return "red";
  } else if (fatalities >= 25) {
    return "peru";
  } else if (fatalities >= 15) {
    return "darkorange";
  } else if (fatalities >= 10) {
    return "yellow";
  } else if (fatalities >= 5) {
    return "yellowgreen";
  } else {
    return "green";
  }
}
// Perform a GET request to the query URL
d3.csv(
  "/static/airline_accident_data/airline_accidents.csv",
  function (tableData) {
    console.log("test data", tableData);
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(tableData);
  }
);

function createFeatures(airlinesData) {
  function onEachLayer(feature) {
    return new L.circleMarker([feature["Latitude"], feature["Longitude"]], {
      radius: circleSize(feature["Total Fatal Injuries"]),
      fillOpacity: 3,
      color: getColor["Total Fatal Injuries"],
      fillColor: getColor["Total Fatal Injuries"],
    });
  }

  // // Define a function we want to run once for each feature in the features array
  // // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup(
      "<h3>" +
        feature["Location"] +
        "</h3><hr><p>" +
        new Date(feature["Location"]) +
        "</p><hr><p>" +
        feature["Event Date"] +
        "</p>"
    );
  }

  function transformToGeoJson(data) {
    // TODO: remove slice when ready
    const limit = data.filter((f) => f.Latitude && f.Longitude).slice(0, 500);
    return limit.map((d) => {
      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [+d.Longitude, +d.Latitude],
        },
        properties: d,
      };
    });
  }
  const gjson = transformToGeoJson(airlinesData);

  // // Create a GeoJSON layer containing the features array on the earthquakeData object
  // // Run the onEachFeature function once for each piece of data in the array
  var airlines = L.geoJSON(gjson, {
    // onEachFeature: onEachFeature,
    // pointToLayer: onEachLayer
  });

  // // Sending our earthquakes layer to the createMap function
  createMap(airlines);
}

function createMap(airlines) {
  // // Define satellite, grayscale and outdoor map layers
  var satellitemap = L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: API_KEY,
    }
  );

  var light = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY,
    }
  );

  var dark = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "dark-v10",
      accessToken: API_KEY,
    }
  );

  // var faultLine = new L.LayerGroup();

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    Satellite: satellitemap,
    "Light Map": light,
    "Dark Map": dark,
  };

  // // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Airlines: airlines,
    // Faultline: faultLine
  };

  // // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("mapid", {
    center: [0.0, 0.0],
    zoom: 2,
    layers: [satellitemap, airlines],
  });

  // // Create a layer control
  // // Pass in our baseMaps and overlayMaps
  // // Add the layer control to the map
  L.control
    .layers(baseMaps, overlayMaps, {
      collapsed: true,
    })
    .addTo(myMap);

  // var faultlinequery = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json";

  // // Create the faultlines and add them to the faultline layer
  // d3.json(faultlinequery, function(data) {
  //   L.geoJSON(data, {
  //     style: function() {
  //       return {color: "orange", fillOpacity: 0}
  //     }
  //   }).addTo(faultLine)
  // })

  // // Create a legend to display information about our map
  var info = L.control({
    position: "bottomright",
  });

  // // When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function () {
    var div = L.DomUtil.create("div", "legend"),
      labels = ["0-5", "5-10", "10-15", "15-25", "25-50", "50+"];
    colors = ["green", "greenyellow", "yellowgreen", "yellow", "orange", "red"];

    for (var i = 0; i < labels.length; i++) {
      div.innerHTML +=
        '<i style="background:' + getColor(i) + '"></i> ' + labels[i] + "<br>";
    }
    return div;
  };
  // Add the info legend to the map
  info.addTo(myMap);
}
