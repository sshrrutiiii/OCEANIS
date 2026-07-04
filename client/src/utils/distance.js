export function calculateDistance(port1, port2) {
  const R = 6371; // Earth's radius in km

  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(port2.lat - port1.lat);
  const dLng = toRad(port2.lng - port1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(port1.lat)) *
      Math.cos(toRad(port2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}