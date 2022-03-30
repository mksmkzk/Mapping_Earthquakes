// We create the tile layer that will be the background of our map.
let day = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-day-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  maxZoom: 18,
  accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let night = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  maxZoom: 18,
  accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  'Day Navigation': day,
  'Night Navigation': night
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [30, 30],
  zoom: 2,
  layers: [night]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/mksmkzk/Mapping_Earthquakes/main/torontoRoutes.json";

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  // console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    color: "lightyellow",
    weight: 2
  }).eachLayer(function(layer){
    layer.bindPopup("<h3>Airline: " + layer.feature.properties.airline + "</h3><br>Destination: " + layer.feature.properties.dst + "</br>").addTo(map);
  });

  // geoJSONLayer.eachLayer(function(layer){
  //   layer.bindPopup("<h3>Airport Code: " + layer.feature.properties.faa + "</h3><br>Airport Name: " + layer.feature.properties.name + "</br>")
  
});

