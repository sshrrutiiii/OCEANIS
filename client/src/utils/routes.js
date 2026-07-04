export function generateRoute(source, destination) {
  // Routes that generally pass through Suez Canal
  const suezPorts = [
    "Mumbai",
    "Dubai",
    "Rotterdam",
    "Hamburg",
  ];

  if (
    suezPorts.includes(source) &&
    suezPorts.includes(destination)
  ) {
    return [source, "Suez Canal", destination];
  }

  // Pacific Route
  if (
    (source === "Tokyo" && destination === "Los Angeles") ||
    (source === "Los Angeles" && destination === "Tokyo")
  ) {
    return [source, "Pacific Ocean", destination];
  }

  // Australia Route
  if (
    source === "Sydney" ||
    destination === "Sydney"
  ) {
    return [source, "Indian Ocean", destination];
  }

  // Default
  return [source, destination];
}