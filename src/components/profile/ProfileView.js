import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCurrentUserEpisodes } from "../../managers/ProfileEpisodeManager";
import { getCurrentUserProfile } from "../../managers/ProfileManager";
import "./profile.css";
import { Box, Button, Container, Typography, Card, CardContent, List, ListItem, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


export const ProfileDetails = ({ token }) => {
  const [profile, setProfile] = useState({});
  const [userProfileEpisodes, setUserProfileEpisodes] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    getCurrentUserProfile(token).then((data) => setProfile(data));
  }, [token]);


  const constructFranchiseHierarchy = (data) => {
    const franchises = [];
    // Loop through all the items in data to populate the franchises array
    data.forEach((d) => {
      const doesFranchiseExist = franchises.find((f) => f.id === d.franchise.id);
      // If the franchise is not in the array, push it
      if (!doesFranchiseExist) {
        franchises.push({ ...d.franchise, seasons: [] });
      }
    });
    // Loop through all the items in data to populate the seasons array
    data.forEach((d) => {
      const currFranchise = franchises.find((f) => f.id === d.franchise.id);
      const doesSeasonExist = currFranchise?.seasons.find(
        (s) => s.season_number === d.season.season_number
      );
      // If the season is not in the array, push it
      if (!doesSeasonExist) {
        currFranchise?.seasons.push({ ...d.season, episodes: [] });
      }
    });
    // Loop through all the items in data to populate the episodes array
    data.forEach((d) => {
      const currFranchise = franchises.find((f) => f.id === d.franchise.id);
      const currSeason = currFranchise?.seasons.find(
        (s) => s.season_number === d.season.season_number
      );
      const doesEpisodeExist = currSeason?.episodes.find(
        (s) => s.title === d.episode.title
      );
      // If the episode is not in the array, push it
      if (!doesEpisodeExist) {
        currSeason?.episodes.push(d.episode);
      }
    });
    return franchises;
  };

  useEffect(() => {
    getCurrentUserEpisodes()
      .then((data) => {
        const processedData = constructFranchiseHierarchy(data);
        setUserProfileEpisodes(processedData);
      });
  }, []);

  const cardStyle = {
    height: '400px',
    overflow: 'auto',
    border: '1px solid',
  };

  const franchiseTitleStyle = {
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: '800',
    textTransform: 'uppercase',
  };

  const episodeCountStyle = {
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: '800',
    color: 'blue',
    marginLeft: '20px',
  };

  const profileBoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    height: '500px',
    width: '500px',
  };

  const favoriteFranchiseStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '500px',
    width: '500px',
  };

  const headerTextStyle = {
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: '800',
  };

  const episodesWatchedStyle = {
    fontFamily: 'DM Sans, sans-serif',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textTransform: 'uppercase',
    marginLeft: '-170px',
  };

  const CenteredContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    marginTop: '50px'
  };

  const ContentContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '30px'
  }


  const EpisodeList = ({ episodes }) => {
    return (
      <List sx={{ fontFamily: 'DM Sans, sans-serif', fontWeight: '800' }}>
        {episodes.map((episode) => (
          <ListItem key={episode.id}>
            E{episode.episode}: {episode.title}
          </ListItem>
        ))}
      </List>
    );
  };

  const SeasonAccordion = ({ seasons }) => {
    return (
      <>
        {seasons.map((season) => (
          <Accordion key={season.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontWeight: '800',
                  marginTop: '5px'
                }}
              >
                Season {season.season_number}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <EpisodeList episodes={season.episodes} />
            </AccordionDetails>
          </Accordion>
        ))}
      </>
    );
  };

  const calculateEpisodeCount = (franchise) => {
    let episodeCount = 0;
    franchise.seasons.forEach((season) => {
      episodeCount += season.episodes.length;
    });
    return episodeCount;
  };

  const FranchiseBox = ({ franchise }) => {
    const episodeCount = calculateEpisodeCount(franchise);

    return (
      <Card style={cardStyle}>
        <CardContent>
          <Link to={`/franchises/${franchise.id}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Typography variant="h4" sx={franchiseTitleStyle}>
              {franchise.label}
            </Typography>
          </Link>
          <SeasonAccordion seasons={franchise.seasons} />
          <Typography variant="h6" sx={episodeCountStyle}>
            <span sx={{ fontWeight: 'bold' }}>episodes watched:</span> {episodeCount}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Container sx={CenteredContainer}>
      <Box sx={ContentContainer}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box sx={profileBoxStyle}>
            <Typography variant="h2" sx={headerTextStyle}>{profile.display_name}</Typography>
            <img src={profile.picture} alt="profile picture" className="profile-pictures" /> <br></br>
            <Typography variant="h6" sx={{ fontFamily: 'DM Sans, sans- serif' }}>{profile.bio}</Typography>
          </Box>
          <Box sx={favoriteFranchiseStyle}>
            <Typography variant="h5" sx={headerTextStyle}>Favorite Franchise:</Typography>
            <a key={profile.franchise?.id} href={`/franchises/${profile.favorite_franchise?.id}`}>
              <img src={profile?.favorite_franchise?.list_image} alt="franchise-photo" className="franchise-pics hover-container" />
            </a><br></br>
          </Box>
        </Box>
        <Container>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: '50px', marginBottom: '30px' }}>
            </Box>
            {userProfileEpisodes.length > 0 && (
              <>
                <Typography variant="h3" sx={episodesWatchedStyle}>Episodes Watched</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  {userProfileEpisodes.map((franchise) => (
                    <Box key={franchise.id} sx={{ width: '350px', marginBottom: '20px', marginTop: '20px' }}>
                      <FranchiseBox franchise={franchise} />
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </Box>
        </Container>
        <Button variant="outlined" color="primary" size="small" onClick={() => navigate({ pathname: "/myProfile/edit" })}>
          Edit Profile
        </Button>
      </Box>
    </Container>
  );
}