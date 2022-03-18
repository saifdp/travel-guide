import { LocationOn } from '@mui/icons-material';
import { Paper, Rating, Tooltip, Typography } from '@mui/material';
import { Marker } from 'react-map-gl';
import './CustomMarker.css';

export default function CustomMarker({
  place,
  index,
  setClickedPlace,
  isMobile,
}) {
  return (
    <Marker
      key={place.location_id}
      longitude={Number(place.longitude)}
      latitude={Number(place.latitude)}
      captureClick
      className="marker"
    >
      {isMobile ? (
        <Tooltip disableInteractive placement="top" title={place.name}>
          <LocationOn
            onClick={() => setClickedPlace(index)}
            elevation={4}
            fontSize="large"
            color="error"
          />
        </Tooltip>
      ) : (
        <Paper
          elevation={2}
          onClick={() => setClickedPlace(index)}
          sx={{
            width: 104,
            paddingX: 1,
            backgroundColor: 'white',
          }}
        >
          <Tooltip disableInteractive placement="top" title={place.name}>
            <Typography
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
              variant="subtitle2"
            >
              {place.name}
            </Typography>
          </Tooltip>

          <img
            style={{ objectFit: 'cover', width: '100%', maxHeight: 70 }}
            src={
              place?.photo
                ? place.photo.images.large.url
                : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
            }
            alt={place.name}
          />

          <Rating
            size="small"
            value={Number(place.rating)}
            precision={0.2}
            readOnly
          />
        </Paper>
      )}
    </Marker>
  );
}
