/**
 * Weather utility using browser geolocation and Open-Meteo API (no key required)
 */

const getWeatherDescription = (code) => {
  if (code === 0) return { text: 'Clear sky', icon: '☀️', type: 'clear' };
  if ([1, 2, 3].includes(code)) return { text: 'Partly cloudy', icon: '⛅', type: 'cloudy' };
  if ([45, 48].includes(code)) return { text: 'Foggy', icon: '🌫️', type: 'fog' };
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return { text: 'Rainy', icon: '🌧️', type: 'rainy' };
  if ([71, 73, 75, 85, 86].includes(code)) return { text: 'Snowy', icon: '❄️', type: 'snow' };
  if ([95, 96, 99].includes(code)) return { text: 'Thunderstorm', icon: '🌩️', type: 'storm' };
  return { text: 'Fair weather', icon: '🍃', type: 'clear' };
};

export const fetchWeatherByCoords = async (latitude, longitude, locationName = 'Your location') => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );
    if (!response.ok) throw new Error('Weather service unavailable');

    const data = await response.json();
    const current = data.current_weather;
    const weatherInfo = getWeatherDescription(current.weathercode);

    return {
      success: true,
      tempC: Math.round(current.temperature),
      tempF: Math.round((current.temperature * 9) / 5 + 32),
      condition: weatherInfo.text,
      icon: weatherInfo.icon,
      type: weatherInfo.type,
      locationName,
      displayLine: `${weatherInfo.icon} ${Math.round(current.temperature)}°C, ${weatherInfo.text} in ${locationName}`
    };
  } catch (error) {
    console.warn('Weather fetch error:', error.message);
    return null;
  }
};

export const fetchWeatherByCity = async (cityName) => {
  try {
    if (!cityName || !cityName.trim()) return null;
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`
    );
    if (!geoRes.ok) throw new Error('City lookup failed');

    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error(`City "${cityName}" not found`);
    }

    const first = geoData.results[0];
    const locationName = `${first.name}${first.country ? `, ${first.country}` : ''}`;
    return await fetchWeatherByCoords(first.latitude, first.longitude, locationName);
  } catch (error) {
    console.warn('City weather fetch error:', error.message);
    return { error: error.message };
  }
};

export const autoDetectWeather = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const weather = await fetchWeatherByCoords(latitude, longitude, 'Nearby');
        resolve(weather);
      },
      (error) => {
        console.warn('Geolocation permission denied or error:', error.message);
        resolve(null);
      },
      { timeout: 8000 }
    );
  });
};
