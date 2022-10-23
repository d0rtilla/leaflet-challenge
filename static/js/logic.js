url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var earthquakeMap = L.map('map', {
        center: [0,0],
        zoom: 3,
        worldCopyJump: true

    });

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        tileSize:512,
        maxZoom: 10,
        zoomOffset: -1,
        }).addTo(earthquakeMap);

function sizeCircle(magnitude) {
    return magnitude * 4;
};

function colorCircle(depth) {
    if (depth>=90) {
        color = "#bd0026";
    }
    else if (depth < 90 && depth >= 70) {
        color = "#f03b20";
    }
    else if (depth < 70 && depth >= 50) {
        color = "#fd8d3c";
    }
    else if (depth < 50 && depth >= 30) {
        color = "#feb24c";
    }   
     else if (depth < 30 && depth >= 10) {
        color = "#fed976";
    }
    else if (depth < 10 && depth >= -10) {
        color = "#ffffb2";
    };
    return color;
};

d3.json(url).then(data => {
    console.log(data);

    var features = data.features;
    var depth_array = [];

    for (var i = 0; i < features.length; i++) {
        var coordinates = features[1].geometry.coordinates;
        var latitude = coordinates[1];
        var longitude = coordinates[0];

        var depth = coordinates[2];
        depth_array.push(depth);
    }
})


