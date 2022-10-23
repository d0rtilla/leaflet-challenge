url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function mapDisplay () {


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
    
    d3.json(url, function(data) {
        var eq = data.features;
        for (var i = 0; i < eq.length; i++){
            var lat = eq[i].geometry.coordinates[1];
            var lon = eq[i].geometry.coordinates[0];
            var mag = eq[i].properties.mag;
            L.circleMarker([lat, lon], {
                stroke: true,
                fillOpacity: 0.75,
                color: "black",
                fillColor: color,
                radius: mag * 2,
                weight: 0.5
        }).addTo(earthquakeMap);
    };
  })
}

function mapLegend(map) {

    colors = ["#459E22", "#7FB20E", "#BEBE02", "#B19A0F", "#B54C0B", "#C00000"];


    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function() {
        
        var div = L.Domutil.create('div', 'info legend'),
            categories = ['<1', '1 - <2', '2 - <3', '3 - <4', '4 - <5', '>5'],
            labels= [];

        div.innerHTML += '<strong> Magnitude </strong> <br>'

        for (var i = 0; i < categories.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + ' "></i>' + categories[i] + '<br>';
                
        };
        return div;
    };
    legend.addTo(map);
};    

    function markerStyle(feature) {
        return {
            fillColor: markerColor(feature.propertires.mag),
            radius: 4*feature.properties.mag,
            weight: 2,
            opacity: 1,
            color: markerColor(feature.properties.mag),
            fillOpacity: 0.8
        };
    };

function markerColor(magnitude) {
    if (magnitude<1) {
        return "#459E22"}
      else if (magnitude<2) {
         return "#7FB20E"}
      else if (magnitude<3) {
         return "#BEBE02"}
      else if (magnitude<4) {
         return "#B19A0F"}
      else if (magnitude<5) {
         return "#B54C0B"}
      else if (magnitude>=5) {
         return "#C00000"}
      else {
         return "black"}
     };

mapDisplay();

