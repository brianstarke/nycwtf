var map;

function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(40.7142, -74.0064),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    loadIncidents();
}
google.maps.event.addDomListener(window, 'load', initialize);

function loadIncidents() {
    $.get('/incidents', function (data) {
        for (i in data) {
            addIncidentToMap(data[i]);
        }
    });
}

function addIncidentToMap(incident) {
    console.log(incident);
    var myLatlng = new google.maps.LatLng(incident.geoLat, incident.geoLng);

    var contentString = '<div id="bodyContent">' +
        '<p>' + incident.description + '</p>' +
        '<p>' + incident.createdAt + '</p>' +
        '<p>Source <b>' + incident.source + '</b></p>' +
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 260
    });

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(map, marker);
    });
}

