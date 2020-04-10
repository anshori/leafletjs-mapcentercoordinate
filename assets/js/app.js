/* Initial Map */
var mapcenter = [-2.61119,118.65234];
var map = L.map('map').setView(mapcenter,5);

/* Tile Basemap */
var basemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | <a href="https://unsorry.net" target="_blank">unsorry@2020</a>'
});
basemap.addTo(map);      

/* Map Center Coordinates */
var coordinatesdiv = new L.Control();
coordinatesdiv.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'coordinates-info');
  this._div.innerHTML = 'Center coordinates<hr><div id="coordinates">Move the map</div>';
  return this._div;
};
coordinatesdiv.addTo(map);

var customIcon = L.icon({
  iconUrl: 'centericon.svg',
  iconSize: [60, 60],
  iconAnchor: [30, 30]
});
marker = L.marker(mapcenter, {icon: customIcon, interactive: false});
marker.addTo(map);

map.addEventListener('move', mapMovement);

function mapMovement (e) {
  var mapcenter = map.getCenter();
  document.getElementById("coordinates").innerHTML = "Lat : " + mapcenter.lat.toFixed(7) + "<br>Long: " + mapcenter.lng.toFixed(7) + "<br>Zoom: " + map.getZoom() + "<hr>Bounding Box:<br>" + map.getBounds().getWest().toFixed(3) + ", " + map.getBounds().getSouth().toFixed(3) + ", " + map.getBounds().getEast().toFixed(3) + ", " + map.getBounds().getNorth().toFixed(3);

  marker.remove();

  marker = L.marker([mapcenter.lat.toFixed(7), mapcenter.lng.toFixed(7)], {icon: customIcon, interactive: false});
  marker.addTo(map);
}