export function generateRoutePoints(start, end, segments = 120) {
  if (!start || !end) return [];

  const points = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;

    const x = start[0] + (end[0] - start[0]) * t;
    const y = start[1] + (end[1] - start[1]) * t;
    const z = start[2] + (end[2] - start[2]) * t;

    const arcHeight = 0.25 * Math.sin(Math.PI * t);

    const length = Math.sqrt(
      x * x +
      y * y +
      z * z
    );

    points.push([
      (x / length) * (1 + arcHeight),
      (y / length) * (1 + arcHeight),
      (z / length) * (1 + arcHeight),
    ]);
  }

  return points;
}