/* eslint-disable no-undef */
const locations = JSON.parse(document.getElementById('map').dataset.locations);

mapboxgl.accessToken =
  'pk.eyJ1IjoiY2hlZW1hMTIiLCJhIjoiY21hbWR5dGVpMGdyNzJsczE4ZGVkNXNxNiJ9.uJgOchghkxQZ6ubksVzHbA';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/cheema12/cmameap3z01ey01sk4j6qdtyb',
  scrollZoom: false,
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  const el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  new mapboxgl.Popup({
    offset: 30,
  })
    .setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map);
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 150,
    left: 100,
    right: 100,
  },
});
