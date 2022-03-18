import { Box, Typography } from '@mui/material';
import {
  ArrowDropDown,
  ArrowDropUp,
  Opacity,
  Thermostat,
} from '@mui/icons-material';

export default function WeatherCard({ weatherData }) {
  if (!weatherData) {
    return (
      <Box
        sx={{
          position: 'absolute',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          top: 5,
          right: 5,
          width: '12.5rem',
          height: '6rem',
          padding: '0.75rem',
          backgroundColor: 'white',
          borderRadius: 1,
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}
      >
        {<Typography variant="subtitle2">No data :(</Typography>}
      </Box>
    );
  }
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 1000,
        top: 5,
        right: 5,
        padding: '0.75rem',
        backgroundColor: 'white',
        borderRadius: 1,
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      }}
    >
      <Box display="flex">
        <Box>
          <Typography textAlign="center" variant="h6">
            {weatherData.weather.main}
          </Typography>
          <Box display="flex" alignItems="center">
            <Thermostat sx={{ color: '#6d6d6d' }} />
            <Typography variant="h4">
              {weatherData.main.temp}
              <sup style={{ fontSize: '0.5em' }}>°C</sup>
            </Typography>
          </Box>
        </Box>
        <img
          height="100%"
          src={`http://openweathermap.org/img/wn/${weatherData.weather.icon}@2x.png`}
          alt=""
        />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex">
          <Opacity sx={{ color: '#6d6d6d' }} />
          <Typography marginLeft={1} variant="body1">
            {weatherData.main.humidity}
          </Typography>
        </Box>
        <Box display="flex">
          <ArrowDropDown sx={{ color: '#6d6d6d' }} />
          <Typography marginLeft={1} variant="body1">
            {weatherData.main.temp_min.toFixed(1)}
            <sup style={{ fontSize: '0.7em' }}>°C</sup>
          </Typography>
        </Box>
        <Box display="flex">
          <ArrowDropUp sx={{ color: '#6d6d6d' }} />
          <Typography marginLeft={1} variant="body1">
            {weatherData.main.temp_max.toFixed(1)}
            <sup style={{ fontSize: '0.7em' }}>°C</sup>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
