/* eslint-disable react-hooks/exhaustive-deps */
import { createRef, useEffect, useState } from 'react';
import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import PlaceDetails from '../PlaceDetails';
import notFound from './not-found.png';

export default function List({
  rating,
  type,
  places,
  isLoading,
  setRating,
  setType,
  clickedPlace,
}) {
  const [placeRefs, setPlaceRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length ?? 0)
      .fill(null)
      .map((_, i) => placeRefs[i] || createRef());
    setPlaceRefs(refs);
  }, [places]);

  useEffect(() => {
    if (clickedPlace !== null) {
      placeRefs[clickedPlace].current.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }, [clickedPlace]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        width: '100%',
        height: '100%',
        padding: 1,
        paddingBottom: 0,
        overflowY: 'auto',
      }}
    >
      <Box width="100%">
        <Typography variant="h4">Find Places around you</Typography>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="type">Type</InputLabel>
          <Select
            labelId="type"
            id="type"
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="restaurants">Restaurants</MenuItem>
            <MenuItem value="hotels">Hotels</MenuItem>
            <MenuItem value="attractions">Attractions</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="rating">Rating</InputLabel>
          <Select
            labelId="rating"
            id="rating"
            label="Rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <MenuItem value="0">All</MenuItem>
            <MenuItem value="3">Above 3.0</MenuItem>
            <MenuItem value="4">Above 4.0</MenuItem>
            <MenuItem value="4.5">Above 4.5</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        flexGrow={1}
      >
        {isLoading && <CircularProgress sx={{ margin: 'auto' }} size={70} />}
        {!isLoading && places.length > 0 && (
          <Grid container>
            {places?.map((place, index) => (
              <Grid ref={placeRefs[index]} item key={index} xs={12}>
                <PlaceDetails place={place} />
              </Grid>
            ))}
          </Grid>
        )}
        {!isLoading && places.length === 0 && (
          <Box sx={{ width: '60%', margin: 'auto', textAlign: 'center' }}>
            <img
              src={notFound}
              alt=""
              style={{ marginX: 'auto', width: '35%' }}
            />
            <Typography variant="body1">
              Sorry, no places found here, move around or search for different
              area.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
