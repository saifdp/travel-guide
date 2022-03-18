/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { Grid } from '@mui/material';
import { useViewport, useViewportBounds } from '../../contexts/ViewportContext';
import List from '../List';
import Map from '../Map';
import { getPlacesData, getWeatherData } from '../../api';

export default function Main() {
  const viewportBounds = useViewportBounds();
  const viewport = useViewport();
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(0);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [clickedPlace, setClickedPlace] = useState(null);
  const cachedPlaces = useRef({});

  useEffect(() => {
    if (!viewportBounds) return;
    if (cachedPlaces.current[type]) {
      setPlaces(cachedPlaces.current[type]);
      return;
    }
    setIsLoading(true);
    const { sw, ne } = viewportBounds;
    getPlacesData(sw, ne, type).then((data) => {
      cachedPlaces.current[type] = data;
      setIsLoading(false);
      setPlaces(data);
    });
  }, [type]);

  useEffect(() => {
    if (rating === 0) {
      setFilteredPlaces(places);
    } else {
      setFilteredPlaces(
        places.filter((place) => Number(place.rating) > rating)
      );
    }
  }, [places, rating]);

  useEffect(() => {
    if (!viewportBounds) return;

    cachedPlaces.current = {};
    setIsLoading(true);

    const { sw, ne } = viewportBounds;
    getPlacesData(sw, ne, type).then((data) => {
      cachedPlaces.current[type] = data;
      setIsLoading(false);
      setPlaces(data);
    });

    const { latitude, longitude } = viewport;
    getWeatherData(latitude, longitude).then((data) => {
      setWeatherData(data);
    });
  }, [viewportBounds]);

  return (
    <Grid
      container
      height={{ md: 'calc(100vh - 5rem)' }}
      sx={{
        width: '95%',
        marginInline: 'auto',
      }}
    >
      <Grid height={{ xs: '85vh', md: '100%' }} item xs={12} md={4}>
        <List
          rating={rating}
          setRating={setRating}
          type={type}
          setType={setType}
          isLoading={isLoading}
          places={filteredPlaces}
          clickedPlace={clickedPlace}
        />
      </Grid>
      <Grid
        item
        paddingTop={1}
        height={{ xs: '45vh', md: '100%' }}
        xs={12}
        md={8}
      >
        <Map
          setClickedPlace={setClickedPlace}
          places={filteredPlaces}
          weatherData={weatherData}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  );
}
