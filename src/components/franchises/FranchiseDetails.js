import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFranchiseById, getSeasonByFranchise } from "../../managers/FranchiseManager";
import { getCurrentUserEpisodes } from "../../managers/ProfileEpisodeManager";

export const FranchiseDetails = ({ token }) => {
  const { id } = useParams();
  const [franchiseDetails, setFranchiseDetails] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [userProfileEpisodes, setUserProfileEpisodes] = useState([])

  useEffect(() => {
    getFranchiseById(id).then((data) => setFranchiseDetails(data));
  }, [id]);

  useEffect(() => {
    getSeasonByFranchise(id).then((data) => setSeasons(data));
  }, []);

  useEffect(() => {
    getCurrentUserEpisodes(token).then((data) => setUserProfileEpisodes(data));
  }, [token]);


  const addOrRemoveEpisode = (e) => {
    const checkedEpisodeId = parseInt(e.target.value)
    if (episodesOnProfile.includes(episode.checkedEpisodeId)) {
      // const updatedEpisodes = episodesOnProfile.filter(episodeId => episodeId !== checkedEpisodeId)
      // updateEpisodesOnProfile(updatedEpisodes)
    } else {
      const copy = [...episodesOnProfile]
      // copy.push(checkedEpisodeId)
      // updateEpisodesOnProfile(copy)
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
              checked={episodesOnProfile.includes(episode.id)}
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
    <div className="franchise-details">
      <div className="header">
        <h2>{franchiseDetails.label}</h2>
        <div className="top-left">
          <img src={franchiseDetails?.image} alt="franchise picture" className="franchise-pic" />
        </div>
      </div>
      <div className="top-right">
        {seasons.map((season) => (
          <div key={season.id}>
            <h2>Season {season.season_number}</h2>
            <ul>{renderEpisodes(season)}</ul>
          </div>
        ))}
      </div>
    </div>
  );
};
