import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFranchiseById, getSeasonByFranchise } from "../../managers/FranchiseManager";
import { createProfileEpisode, deleteProfileEpisode, getCurrentUserEpisodes } from "../../managers/ProfileEpisodeManager";
import { Container, Grid, Paper, Typography, Checkbox, FormControlLabel } from "@mui/material"; // Import Material-UI components

export const FranchiseDetails = ({ token }) => {
  const { id } = useParams();
  const [franchiseDetails, setFranchiseDetails] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [userProfileEpisodes, setUserProfileEpisodes] = useState([])
  const [episodeKeys, setEpisodeKeys] = useState([])

  useEffect(() => {
    getFranchiseById(id).then((data) => setFranchiseDetails(data));
  }, [id]);

  useEffect(() => {
    getSeasonByFranchise(id).then((data) => setSeasons(data));
  }, []);

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
        episodes.push(profileEpisode.episode.id);
      });
      setEpisodeKeys(episodes);
    });
  }

  const newUserProfileEpisodes = () => {
    getCurrentUserEpisodes().then((data) => setUserProfileEpisodes(data));
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
      //if unchecked DELETE operation to API and send pk ----HOW DO WE GET THE PK!!!!!!!!!!!!!!!!!!!!!
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
    const episodeList = [];
    for (const episode of season.episodes) {
      episodeList.push(
        <div key={episode.id}>
          <label>
            <input
              type="checkbox"
              value={episode.id}
              checked={episodeKeys.includes(episode.id)}
              onChange={(e) => addOrRemoveEpisode(e)}
            />
            <h3>Episode {episode.episode}: {episode.title}</h3>
            <p>{episode.synopsis}</p>
            <p>Air Date: {episode.air_date}</p>
          </label>
        </div>
      );
    }
    return episodeList;
  };


  return (
    <Container maxWidth="lg" className="franchise-details">
      <Grid container spacing={3} alignItems="flex-start"> {/* Add alignItems="flex-start" */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} className="franchise-pic">
            <img src={franchiseDetails?.list_image} alt="franchise picture" style={{ width: "100%" }} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h2">{franchiseDetails.label}</Typography>
          <Paper style={{
            height: "400px", overflow: "auto", border: "2px solid #ccc", borderRadius: "10px", padding: "16px", scrollbarWidth: "thin", scrollbarColor: "#888 #555"
          }}>
            {seasons.map((season) => (
              <div key={season.id}>
                <Typography variant="h4">Season {season.season_number}</Typography>
                {renderEpisodes(season)}
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );

};
