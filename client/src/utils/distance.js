export function calculateDistance(port1, port2) {
  const R = 6371; // Earth's radius in km

  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(port2.latitude - port1.latitude);
  const dLng = toRad(port2.longitude - port1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(port1.latitude)) *
      Math.cos(toRad(port2.latitude)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}