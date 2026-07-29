const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export async function getWeather(lat, lon) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    if (!res.ok) {
      throw new Error("Weather fetch failed");
    }

    const data = await res.json();

    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };
  } catch (err) {
    console.error(err);

    return null;
  }
}