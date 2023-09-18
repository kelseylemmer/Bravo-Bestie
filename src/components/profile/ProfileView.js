import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFranchiseById, getSeasonByFranchise } from "../../managers/FranchiseManager";
import { createProfileEpisode, deleteProfileEpisode, getCurrentUserEpisodes } from "../../managers/ProfileEpisodeManager";
import { getCurrentUserProfile } from "../../managers/ProfileManager";
import "./profile.css";
import { Box, Button, Container, Typography } from "@mui/material";
import { CenterFocusStrong } from "@mui/icons-material";

export const ProfileDetails = ({ token }) => {
  const [profile, setProfile] = useState({});
  const [userProfileEpisodes, setUserProfileEpisodes] = useState([])
  const [profileEpisodeList, setProfileEpisodeList] = useState([])

  const navigate = useNavigate()


  useEffect(() => {
    getCurrentUserProfile(token).then((data) => setProfile(data));
  }, [token]);



  useEffect(() => {
    newUserProfileEpisodes()
  }, []);

  useEffect(() => {
    newProfileEpisodes()
  }, []);

  const newProfileEpisodes = () => {
    getCurrentUserEpisodes().then((data) => {
      const episodes = [];
      data.map((profileEpisode) => {
        episodes.push(profileEpisode.episode);
      });
      setProfileEpisodeList(episodes);
    });
  }
  const newUserProfileEpisodes = () => {
    getCurrentUserEpisodes().then((data) => setUserProfileEpisodes(data));
  }


  return (
    <Container>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            borderRadius: '10px',
            height: '500px',
            width: '500px'
          }}>
            <Typography variant="h2">{profile.display_name}</Typography>
            <img src={profile.picture} alt="profile picture" className="profile-pictures" /> <br></br>
            {profile.bio}
          </Box>
          <Box sx={{
            alignItems: 'center',
            height: '500px',
            width: '500px'
          }}>
            <Typography variant="h5">Favorite Franchise:</Typography>
            <img src={profile?.favorite_franchise?.list_image} alt="franchise-photo" className="franchise-pics" /><br></br>
            <Button variant="outlined" color="primary" size="small"
              onClick={() => {
                navigate({ pathname: "/myProfile/edit" })
              }}
            >Edit Profile</Button>
          </Box>
        </Box>
        <Box>
          <Typography variant="h5">Episodes Watched:</Typography>
          {userProfileEpisodes.map((episodeItem) => (
            <ul>
              <Typography variant="p" key={episodeItem.id}>{episodeItem?.episode?.season?.franchise?.label} S{episodeItem?.episode?.season?.season_number}E{episodeItem?.episode?.episode}</Typography>
            </ul>
          ))}
        </Box>
      </Box>
    </Container >
  );
};