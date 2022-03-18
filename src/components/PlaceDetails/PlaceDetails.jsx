import React from 'react';
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  LocationOn as LocationOnIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Card elevation={6} sx={{ position: 'relative', margin: 1 }}>
      <div style={{ position: 'relative' }}>
        <CardMedia
          style={{ height: 300 }}
          image={
            place.photo
              ? place.photo.images.large.url
              : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
          }
          title={place.name}
        />
        <Box
          sx={{
            position: 'absolute',
            color: 'white',
            bottom: 0,
            width: '100%',
            paddingInline: 2,
            background:
              'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 65%, rgba(0,0,0,0.5) 85%, rgba(0,0,0,0) 100%)',
          }}
        >
          <Typography variant="h5" mt={2} letterSpacing={2}>
            {place.name}
          </Typography>
          <Box display="flex" justifyContent="space-between" my={1}>
            <Rating value={Number(place.rating)} precision={0.25} readOnly />
            <Typography component="legend">
              out of {place.num_reviews} review{place.num_reviews > 1 && 's'}
            </Typography>
          </Box>
        </Box>
      </div>
      <CardContent sx={{ paddingBottom: 0 }}>
        <Box mb={1} display="flex" justifyContent="space-between">
          <Box display="flex" flexBasis="40%" justifyContent="space-between">
            <Typography component="legend">Price</Typography>
            <Typography
              fontWeight="bold"
              color="textSecondary"
              variant="subtitle1"
            >
              {place.price_level || '!'}
            </Typography>
          </Box>
          <Box display="flex" flexBasis="40%" justifyContent="space-between">
            <Typography component="legend">Ranking</Typography>
            <Typography
              fontWeight="bold"
              color="textSecondary"
              variant="subtitle1"
            >
              {place?.ranking?.substring(0, place.ranking.indexOf(' ')) || '??'}
            </Typography>
          </Box>
        </Box>
        {place?.awards.length > 0 && (
          <Box
            sx={{ height: 40 }}
            mb={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography component="legend">Awards</Typography>
            <AvatarGroup max={6}>
              {place?.awards?.map((award, i) => (
                <Tooltip enterDelay={200} key={i} title={award.display_name}>
                  <Avatar alt={award.display_name} src={award.images.large} />
                </Tooltip>
              ))}
            </AvatarGroup>
          </Box>
        )}
        {place?.cuisine?.length > 0 && (
          <Box display="flex" flexWrap="wrap" rowGap={0.5} columnGap={1} mb={1}>
            {place.cuisine.map(({ name }) => (
              <Chip key={name} size="small" label={name} />
            ))}
          </Box>
        )}
        {place.address && (
          <Box display="flex" columnGap={5} alignItems="center" my={1}>
            <LocationOnIcon color="action" />
            <Typography
              variant="body2"
              flex={1}
              textAlign="right"
              color="textSecondary"
            >
              {place.address}
            </Typography>
          </Box>
        )}
        {place.phone && (
          <Box display="flex" columnGap={5} alignItems="center" my={1}>
            <PhoneIcon color="action" />
            <Typography
              flex={1}
              variant="body2"
              textAlign="right"
              color="textSecondary"
            >
              {place.phone}
            </Typography>
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ paddingX: 2 }}>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.web_url, '_blank')}
        >
          Trip Advisor 🡕
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => window.open(place.website, '_blank')}
        >
          Website 🡕
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlaceDetails;
