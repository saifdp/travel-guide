/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactMapGL from 'react-map-gl';
import debounce from 'lodash.debounce';
import { useMediaQuery } from '@mui/material';
import { useViewport, useViewportUpdate } from '../../contexts/ViewportContext';
import CustomMarker from './CustomMarker';
import WeatherCard from './WeatherCard';

import 'mapbox-gl/dist/mapbox-gl.css';

// workaround for transpiling error of Mapbox GL JS (slows site)
import mapboxgl from 'mapbox-gl';

mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export default function Map({
  places,
  setClickedPlace,
  weatherData,
  isLoading,
}) {
  const viewportContext = useViewport();
  const setViewportContext = useViewportUpdate();
  const [viewport, setViewport] = useState(null);
  const isMobile = useMediaQuery('(max-width: 600px)');

  const debouncedViewportContextSetter = useCallback(
    debounce((data) => {
      setViewportContext(data);
    }, 750),
    []
  );

  useEffect(() => {
    if (!viewportContext) return;
    setViewport(viewportContext);
  }, [viewportContext]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        const currentLocation = { latitude, longitude, zoom: 10 };
        setViewportContext(currentLocation);
        setViewport(currentLocation);
      },
      () => {
        const fallbackViewport = {
          latitude: 34.0161,
          longitude: 75.315,
          zoom: 9,
        };
        setViewportContext(fallbackViewport);
        setViewport(fallbackViewport);
      }
    );
  }, []);

  const markers = useMemo(() => {
    if (!places || isLoading) return null;
    return places.map((place, i) => (
      <CustomMarker
        key={place.location_id}
        index={i}
        setClickedPlace={setClickedPlace}
        place={place}
        isMobile={isMobile}
      />
    ));
  }, [places, isMobile, isLoading]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {viewport && (
        <ReactMapGL
          style={{ position: 'relative' }}
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          zoom={viewport.zoom}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onViewportChange={({ width, height, latitude, longitude, zoom }) => {
            const newViewport = { width, height, latitude, longitude, zoom };
            setViewport(newViewport);
            debouncedViewportContextSetter(newViewport);
          }}
        >
          {markers}
          <WeatherCard weatherData={weatherData} />
        </ReactMapGL>
      )}
    </div>
  );
}
