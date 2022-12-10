/* Initial Map */
var mapcenter = [-2.61119,118.65234];
var map = L.map('map').setView(mapcenter,5);

/* Geocoder */
L.Control.geocoder({
  geocoder: L.Control.Geocoder.nominatim(),
  position: 'topleft',
}).addTo(map);

/* Display zoom, latitude, longitude in URL */
var hash = new L.Hash(map);

/* Tile Basemap */
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://unsorry.net" target="_blank">unsorry@2020</a>'
});
basemap.addTo(map);      

/* Map Center Coordinates */
var coordinatesdiv = new L.Control();
coordinatesdiv.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'coordinates-info');
  this._div.innerHTML = 'Center Coordinates<hr><div id="coordinates">-2.61119,118.65234</div><button id="copy" onclick="CopyToClipboard()">Copy Coordinates</button><br><br><div id="zoom">Zoom: 5</div><hr>Bounding Box<hr><div id="bbox">Move the map</div>';
  return this._div;
};
coordinatesdiv.addTo(map);

var customIcon = L.icon({
  iconUrl: 'centericon.svg',
  iconSize: [70, 70],
  iconAnchor: [35, 35]
});
marker = L.marker(mapcenter, {icon: customIcon, interactive: false});
marker.addTo(map);

map.addEventListener('move', mapMovement);

function mapMovement (e) {
  var mapcenter = map.getCenter();
  var precisionLatLng = 7;
  var precisionBbox = 5;

  document.getElementById("coordinates").innerHTML = mapcenter.lat.toFixed(precisionLatLng) + "," + mapcenter.lng.toFixed(precisionLatLng);
  document.getElementById("zoom").innerHTML =  "Zoom: " + map.getZoom();
  document.getElementById("bbox").innerHTML = "Left &nbsp;: " + map.getBounds().getWest().toFixed(precisionBbox) + "<br>Bottom: " + map.getBounds().getSouth().toFixed(precisionBbox) + "<br>Right : " + map.getBounds().getEast().toFixed(precisionBbox) + "<br>Top &nbsp;&nbsp;: " + map.getBounds().getNorth().toFixed(precisionBbox);

  marker.remove();

  marker = L.marker([mapcenter.lat.toFixed(precisionLatLng), mapcenter.lng.toFixed(precisionLatLng)], {icon: customIcon, interactive: false});
  marker.addTo(map);
}

function CopyToClipboard() {
  var text = document.getElementById("coordinates");
  var r = document.createRange();
  r.selectNode(text);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(r);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
  Swal.fire({
    icon: 'success',
		text: 'Coordinates copied to clipboard',
		showConfirmButton: false,
    timer: 1000,
    backdrop: false,
	})
}