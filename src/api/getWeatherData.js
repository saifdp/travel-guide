import axios from 'axios';

export default async function getWeatherData(latitude, longitude) {
  try {
    const { data } = await axios.get(
      'https://community-open-weather-map.p.rapidapi.com/weather',
      {
        params: {
          lat: latitude,
          lon: longitude,
          units: 'metric',
        },
        headers: {
          'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
          'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
        },
      }
    );
    
    const { name, main, weather } = data;
    return { name, main, weather: weather[0] };
  } catch (err) {
    console.log('Unable to fetch weather data', err);
    return null;
  }
}
