export function calculateSimulationStats(progress, totalDistance) {
  const covered = totalDistance * progress;
  const remaining = totalDistance - covered;

  return {
    covered,
    remaining,
  };
}