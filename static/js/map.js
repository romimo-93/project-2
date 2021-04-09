// Perform a GET request to the query URL
d3.csv(
  "/static/airline_accident_data/airline_accidents.csv",
  function (tableData) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(tableData);
  }
);

function createFeatures(airlinesData) {
  // function onEachLayer(feature) {
  var markerClusters = L.markerClusterGroup();

  for (var i = 0; i < airlinesData.length; ++i) {
    var popup =
      airlinesData[i].Location +
      "<br/>" +
      airlinesData[i]["Event Date"] +
      "<br/>" +
      airlinesData[i]["Aircraft Category"] +
      "<br/>" +
      "<br/><b>Airport:</b>" +
      airlinesData[i]["Airport Name"] +
      "<br/><b>IATA/FAA:</b> " +
      "<br/>" +
      "<br/><b>Fatalities:</b>" +
      airlinesData[i]["Total Fatal Injuries"] +
      "<br/>";

    var m = L.marker([
      airlinesData[i].Latitude,
      airlinesData[i].Longitude,
    ]).bindPopup(popup);

    markerClusters.addLayer(m);
  }

  function transformToGeoJson(data) {
    const limit = data.filter((f) => f.Latitude && f.Longitude);
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

  // // Sending our earthquakes layer to the createMap function
  createMap(markerClusters);
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

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    Satellite: satellitemap,
    "Light Map": light,
    "Dark Map": dark,
  };

  // // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Airlines: airlines,
  };

  // // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map-element", {
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
}
