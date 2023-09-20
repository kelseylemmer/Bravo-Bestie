import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCastById } from "../../managers/CastManager";
import { Container, Typography, Box, IconButton } from "@mui/material";
import { Instagram, Twitter } from "@mui/icons-material";






export const CastDetails = () => {
  const { id } = useParams();
  const [castMember, setCastMember] = useState({});

  useEffect(() => {
    getCastById(id).then((data) => setCastMember(data));
  }, [id]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '40px',
        textAlign: 'center',
      }}
    >
      <img src={castMember.img_url} alt="profile picture" className="profile-pictures" />
      <Typography variant="h5" sx={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 'bold' }}>
        {castMember.name}
      </Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {castMember.twitter && (
          <IconButton
            sx={{ margin: '5px' }}
            aria-label={castMember.twitter}
            onClick={() => window.open(castMember.twitter)}
          >
            <Twitter fontSize="large" sx={{
              color: 'black',
              '&:hover': {
                color: 'blue',
              },
            }} />
          </IconButton>
        )}
        {castMember.instagram && (
          <IconButton
            sx={{ margin: '5px' }}
            aria-label={castMember.instagram}
            onClick={() => window.open(castMember.instagram)}
          >
            <Instagram fontSize="large" sx={{
              color: 'black',
              '&:hover': {
                color: 'fuchsia',
              },
            }} />
          </IconButton>
        )}
      </div>
      <Typography variant="h6" sx={{ fontFamily: 'DM Sans, sans-serif', width: '50%' }}> {castMember.bio} </Typography>
    </Box>
  );
};