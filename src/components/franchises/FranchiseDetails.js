import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFranchiseById, getSeasonByFranchise } from "../../managers/FranchiseManager";
import { createProfileEpisode, deleteProfileEpisode, getCurrentUserEpisodes } from "../../managers/ProfileEpisodeManager";

export const FranchiseDetails = ({ token }) => {
  const { id } = useParams();
  const [franchiseDetails, setFranchiseDetails] = useState({});
  const [seasons, setSeasons] = useState([]);
  const [userProfileEpisodes, setUserProfileEpisodes] = useState([])
  const [profileEpisodeList, setProfileEpisodeList] = useState([])

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
      setProfileEpisodeList(episodes);
    });
  }

  const newUserProfileEpisodes = () => {
    getCurrentUserEpisodes().then((data) => setUserProfileEpisodes(data));
  }

  const addOrRemoveEpisode = (e) => {
    const checkedEpisodeId = parseInt(e.target.value)
    console.log("checkedEpisodeId", checkedEpisodeId)
    if (profileEpisodeList.includes(checkedEpisodeId)) {
      const updatedEpisodes = profileEpisodeList.filter(episodeId => episodeId !== checkedEpisodeId)
      setProfileEpisodeList(updatedEpisodes)
      deleteProfileEpisode(checkedEpisodeId)
      newUserProfileEpisodes()
    } else {
      const copy = [...profileEpisodeList]
      const newProfileEpisode = {
        episode: checkedEpisodeId,
      };
      copy.push(checkedEpisodeId)
      setProfileEpisodeList(copy)
      createProfileEpisode(newProfileEpisode)
      newUserProfileEpisodes()
    }
  }


  // const addOrRemoveEpisode = (e) => {
  //   const checkedEpisodeId = parseInt(e.target.value);
  //   let foundMatch = false;

  //   for (const userProfileEpisode of userProfileEpisodes) {
  //     if (userProfileEpisode.episode === checkedEpisodeId) {
  //       deleteProfileEpisode(userProfileEpisode.id);
  //       newUserProfileEpisodes()
  //       newProfileEpisodes()
  //       foundMatch = true;
  //       break;
  //     }
  //   }
  //   if (foundMatch = false) {
  //     console.log(checkedEpisodeId)
  //     const newProfileEpisode = {
  //       episode: checkedEpisodeId,
  //     };
  //     createProfileEpisode(newProfileEpisode);
  //     profileEpisodeList.push(checkedEpisodeId);

  //   }
  // };


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
              checked={profileEpisodeList.includes(episode.id)}
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