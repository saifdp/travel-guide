import axios from 'axios';

export default async function getPlacesData(sw, ne, type) {
  try {
    const url = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`;
    const {
      data: { data },
    } = await axios.get(url, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_latitude: ne.lat,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
      },
    });

    return data.filter((item) => !item.ad_position);
  } catch (err) {
    console.log('Failed to get places data');
    console.log(err);
    return [];
  }
}
