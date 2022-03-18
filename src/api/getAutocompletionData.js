import axios from 'axios';

export default async function getAutocompletionData(searchText) {
  try {
    const {
      data: { features },
    } = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json`,
      {
        params: {
          access_token:
            process.env.REACT_APP_MAPBOX_TOKEN ||
            'pk.eyJ1IjoiYmhhcmR3YWotc25pZ2RoIiwiYSI6ImNrdWdyd2F3cjA1cXAyb296d2VvMDl2bTkifQ.A4CVuSs63CM-_EPPaoQtvA',
          autocomplete: true,
          types: [
            'country',
            'region',
            'postcode',
            'district',
            'place',
            'locality',
          ],
        },
      }
    );

    return features.map((feature) => {
      const { place_name, center } = feature;
      return {
        label: place_name,
        longitude: center[0],
        latitude: center[1],
      };
    });
  } catch (err) {
    console.log('Failed to retrieve autocompletion data');
    console.log(err);
    return [];
  }
}
