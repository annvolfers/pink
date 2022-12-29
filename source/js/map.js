const contactsMap = document.querySelector('.contacts__map');

if (contactsMap) {
  const CenterMapCoordinates = {
    LAT: 59.936577,
    LNG: 30.321079,
  };
  const PinMarkerCoordinates = {
    LAT: 59.936244,
    LNG: 30.321055,
  };

  const map = L.map('map');
  const MAP_ZOOM = 16;

  const pinIcon = L.icon({
    iconUrl: './img/index/pin.svg',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });

  const pinMarker = L.marker(
    {
      lat: PinMarkerCoordinates.LAT,
      lng: PinMarkerCoordinates.LNG,
    },
    {
      icon: pinIcon,
    }
  );

  contactsMap.classList.remove('contacts__map--nojs');

  map.setView({
    lat: CenterMapCoordinates.LAT,
    lng: CenterMapCoordinates.LNG,
  }, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  pinMarker.addTo(map);
}
