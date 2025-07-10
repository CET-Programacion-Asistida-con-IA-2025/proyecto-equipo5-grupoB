let mapa, marcador;

function iniciarMapa() {
  mapa = L.map('map').setView([-34.6037, -58.3816], 13); // Centro en Buenos Aires

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapa);
}

function buscarDireccion() {
  const direccion = document.getElementById('direccion').value;
  if (!direccion) return;

  if (!window.Geocoder) {
    alert("Geocoder no cargado");
    return;
  }

  L.Control.Geocoder.nominatim().geocode(direccion, function(results) {
    if (results.length === 0) {
      alert("Dirección no encontrada");
      return;
    }

    const resultado = results[0];
    mapa.setView(resultado.center, 15);

    if (marcador) mapa.removeLayer(marcador);
    marcador = L.marker(resultado.center).addTo(mapa)
      .bindPopup("Tu búsqueda").openPopup();

    mostrarUniversidadesCercanas(resultado.center);
  });
}

function usarUbicacion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = [pos.coords.latitude, pos.coords.longitude];
      mapa.setView(coords, 15);

      if (marcador) mapa.removeLayer(marcador);
      marcador = L.marker(coords).addTo(mapa)
        .bindPopup("Tu ubicación").openPopup();

      mostrarUniversidadesCercanas(coords);
    }, () => {
      alert("No se pudo obtener la ubicación.");
    });
  } else {
    alert("Tu navegador no soporta geolocalización.");
  }
}

function mostrarUniversidadesCercanas(centro) {
  // Universidades simuladas (podés reemplazar con una API real)
  const universidades = [
    { nombre: "UBA", coords: [-34.5997, -58.3926] },
    { nombre: "UTN", coords: [-34.6030, -58.3844] },
    { nombre: "UADE", coords: [-34.6167, -58.3842] }
  ];

  universidades.forEach(u => {
    const distancia = mapa.distance(centro, u.coords);
    if (distancia < 3000) { // 3 km
      L.marker(u.coords).addTo(mapa)
        .bindPopup(u.nombre);
    }
  });
}
document.addEventListener("DOMContentLoaded", iniciarMapa);
