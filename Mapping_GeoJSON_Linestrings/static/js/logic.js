// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  maxZoom: 18,
  accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  maxZoom: 18,
  accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Add streets layer to the map.
streets.addTo(map)

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/mksmkzk/Mapping_Earthquakes/main/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).eachLayer(function(layer){
    layer.bindPopup("<h3>Airport Code: " + layer.feature.properties.faa + "</h3><br>Airport Name: " + layer.feature.properties.name + "</br>").addTo(map);

  // geoJSONLayer.eachLayer(function(layer){
  //   layer.bindPopup("<h3>Airport Code: " + layer.feature.properties.faa + "</h3><br>Airport Name: " + layer.feature.properties.name + "</br>")
  });
});

