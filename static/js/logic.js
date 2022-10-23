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
        var coordinates = features[i].geometry.coordinates;
        var latitude = coordinates[1];
        var longitude = coordinates[0];

        var depth = coordinates[2];
        depth_array.push(depth);
        var properties = features[i].properties;
       
        var place = properties.place;
        var magnitude = properties.mag;

    

        circles = L.circleMarker([latitude, longitude], {
            color: "black",
            weight: 1,
            fillColor: colorCircle(depth),
            opactiy: 1,
            fillOpacity: 1,
            radius: sizeCircle(magnitude)
        }).bindPopup(`<h3>${place}</h3><br/>Magnitude: ${magnitude}<br/>Depth: ${depth} km<br/> Coordinates: ${latitude}, ${longitude}`).addTo(earthquakeMap);
    };

    var info = L.control({position:"topright"});

    info.onAdd = function() {
        var div = L.DomUtil.create("div","info");
        var title = "<h1>Earthquakes in the Last 7 Days</h1>"
        div.innerHTML = title;

        return div
    };

    var legend  = L.control({ position : "bottomright"});

    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "legend");
        var limits = [-10, 10, 30, 50, 70, 90];
        var title = "<h2>Depth in km</h2>"

        div.innerHTML = title;

        for (var i = 0; i < limits.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colorCircle(limits[i] + 1) + '"></i> ' +
                limits[i] + (limits[i + 1] ? '&ndash;' + limits[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(earthquakeMap);
    info.addTo(earthquakeMap);
});


