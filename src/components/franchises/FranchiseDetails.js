import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFranchiseById, getSeasonByFranchise } from "../../managers/FranchiseManager";
import { createProfileEpisode, deleteProfileEpisode, getUserEpisodes } from "../../managers/ProfileEpisodeManager";
import { getFranchiseCast } from "../../managers/SeasonCastManager";
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


export const FranchiseDetails = ({ token }) => {
  const { id } = useParams();
  const [franchiseDetails, setFranchiseDetails] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [userProfileEpisodes, setUserProfileEpisodes] = useState([])
  const [episodeKeys, setEpisodeKeys] = useState([])
  const [franchiseCast, setFranchiseCast] = useState([])

  const newUserProfileEpisodes = () => {
    getUserEpisodes().then((data) => setUserProfileEpisodes(data));
  }

  const newProfileEpisodes = () => {
    getUserEpisodes().then((data) => {
      const episodes = [];
      data.map((profileEpisode) => {
        episodes.push(profileEpisode.episode.id);
      });
      setEpisodeKeys(episodes);
    });
  }

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

  useEffect(() => {

    getFranchiseCast(id).then(data => {
      function getUniqueCastObjects(data) {
        const uniqueCastSet = new Set();
        data.forEach(item => {
          uniqueCastSet.add(JSON.stringify(item.cast));
        });

        const uniqueCastArray = Array.from(uniqueCastSet).map(JSON.parse);
        return uniqueCastArray;
      }

      const uniqueCast = getUniqueCastObjects(data);
      setFranchiseCast(uniqueCast);
    })
  }, [id]);



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
  }



  return (
    <div className="franchise-details">
      <div style={{ width: "100%", overflowX: "scroll" }}>
        <img
          src={franchiseDetails?.banner_image}
          alt="franchise picture"
          style={{ width: "100%" }}
        />
      </div>
      <div
        style={{
          height: "600px",
          overflowY: "auto",
          border: "2px solid #ccc",
          borderRadius: "10px",
          padding: "16px",
          scrollbarWidth: "thin",
          scrollbarColor: "#888 #555",
        }}
      >
        <Container maxWidth="lg">
          {seasons.map((season) => (
            <Accordion key={season.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: "DM Sans, sans- serif",
                    fontWeight: "bold",
                    textTransform: 'uppercase'
                  }}
                >
                  Season {season.season_number}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {renderEpisodes(season)}
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </div>
    </div>
  );
};