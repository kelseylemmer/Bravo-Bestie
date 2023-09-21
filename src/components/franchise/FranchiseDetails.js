import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFranchiseById, getSeasonByFranchise } from "../../managers/FranchiseManager";
import { getFranchiseCast } from "../../managers/FranchiseCastManager";
import { createProfileEpisode, deleteProfileEpisode, getUserEpisodes } from "../../managers/ProfileEpisodeManager";
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


export const FranchiseDetails = () => {
  const { id } = useParams();
  const [franchiseDetails, setFranchiseDetails] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [userProfileEpisodes, setUserProfileEpisodes] = useState([])
  const [episodeKeys, setEpisodeKeys] = useState([])
  const [franchiseCast, setFranchiseCast] = useState([])

  useEffect(() => {
    getFranchiseById(id).then((data) => setFranchiseDetails(data));
  }, [id]);

  useEffect(() => {
    getSeasonByFranchise(id).then((data) => setSeasons(data));
  }, []);

  useEffect(() => {
    getFranchiseCast(id).then((data) => setFranchiseCast(data));
  }, []);

  useEffect(() => {
    newUserProfileEpisodes()
  }, []);

  useEffect(() => {
    newProfileEpisodes()
  }, []);

  const newProfileEpisodes = () => {
    getUserEpisodes().then((data) => {
      const episodes = [];
      data.map((profileEpisode) => {
        episodes.push(profileEpisode.episode.id);
      });
      setEpisodeKeys(episodes);
    });
  }

  const newUserProfileEpisodes = () => {
    getUserEpisodes().then((data) => setUserProfileEpisodes(data));
  }


  const addOrRemoveEpisode = (e) => {
    const checkedEpisodeId = parseInt(e.target.value);
    //what is the current state of this checkbox - checked or unchecked
    if (e.target.checked) {
      //if checked POST request to API with : current profile id and episode id
      const newProfileEpisode = {
        episode: checkedEpisodeId,
      };
      //fetch all profile episodes and update state variable
      createProfileEpisode(newProfileEpisode)
      newUserProfileEpisodes()
      newProfileEpisodes()
    } else {
      //if unchecked DELETE operation to API and send pk 
      for (const userProfileEpisode of userProfileEpisodes) {
        if (userProfileEpisode.episode.id === checkedEpisodeId) {
          deleteProfileEpisode(userProfileEpisode.id);
          //fetch all profile episodes and update state
          newUserProfileEpisodes()
          newProfileEpisodes()
        }
      }
    }
  }


  // Create a separate function to map over episodes
  const renderEpisodes = (season) => {
    return season.episodes.map((episode) => (
      <div key={episode.id}>
        <label style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            value={episode.id}
            checked={episodeKeys.includes(episode.id)}
            onChange={(e) => addOrRemoveEpisode(e)}
          />
          <Typography variant='h5' sx={{ fontFamily: 'DM Sans, sans-serif', marginLeft: '8px', fontWeight: 'bold' }}>
            Episode {episode.episode}: {episode.title}
          </Typography>
        </label>
        <Typography variant='p' sx={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 'bold' }}>
          {episode.synopsis}
        </Typography> <br></br>
        <Typography variant='p' sx={{ fontFamily: 'DM Sans, sans-serif', marginTop: '10px' }}>
          Air Date: {episode.air_date}
        </Typography>
      </div>
    ));
  };


  const castContainerStyle = {
    display: "flex",
    overflowX: "auto",
    flexDirection: "row",
    height: "250px"

  };

  const castBoxStyle = {
    width: "200px",
    height: "200px",
    marginX: "8px",
    borderRadius: "50%",
    flex: "0 0 auto",
  };

  const titleStyle = {
    fontFamily: "DM Sans, sans-serif",
    fontWeight: "bold",
    fontStyle: "italic",
    textTransform: "uppercase",
    marginTop: "30px",
    marginBottom: "30px",
    marginLeft: "30px",
  };

  const episodeContainerStyle = {
    height: "600px",
    overflowY: "auto",
    borderRadius: "10px",
    padding: "16px",
    scrollbarWidth: "thin",
    scrollbarColor: "#888 #555",
  };


  return (<div className="franchise-details">
    <div style={{ width: "100%", overflowX: "scroll" }}>
      <img
        src={franchiseDetails?.banner_image}
        alt="franchise picture"
        style={{ width: "100%" }}
      />
    </div>
    <Box sx={{ display: 'Flex', flexDirection: 'column' }}>
      <Typography variant="h3" sx={titleStyle}>
        Cast
      </Typography>
      <Box sx={castContainerStyle}>
        {franchiseCast.map((cast) => (
          <Box key={cast.id} sx={castBoxStyle}>
            <a key={cast.id} href={`/cast/${cast.cast.id}`}>
              <img
                src={`${cast.cast.img_url}?w=100&h=100&fit=crop&auto=format`}
                srcSet={`${cast.cast.img_url}?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
                alt={cast.cast.name}
                loading="lazy"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%"
                }}
              />
            </a>
          </Box>
        ))}
      </Box>
    </Box>
    <Typography variant="h3" sx={titleStyle}>
      Episodes
    </Typography>
    <br></br>
    <div style={episodeContainerStyle}>
      <Container maxWidth="lg">
        {seasons.map((season) => (
          <Accordion key={season.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "DM Sans, sans-serif",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Season {season.season_number}
              </Typography>
            </AccordionSummary>
            <AccordionDetails x={{ fontFamily: "DM Sans, sans-serif", marginLeft: "150px" }}>
              check box to add or remove from watched
            </AccordionDetails>
            <AccordionDetails>{renderEpisodes(season)}</AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </div>
  </div>
  );
}