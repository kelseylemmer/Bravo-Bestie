import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFranchiseById, getSeasonByFranchise } from "../../managers/FranchiseManager";
import { createProfileEpisode, deleteProfileEpisode, getCurrentUserEpisodes } from "../../managers/ProfileEpisodeManager";
import { getCurrentUserProfile } from "../../managers/ProfileManager";
import "./profile.css";

export const ProfileDetails = ({ token }) => {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [franchiseDetails, setFranchiseDetails] = useState({});
  const [seasons, setSeasons] = useState([]);
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


  const addOrRemoveEpisode = (e) => {
    const checkedEpisodeId = parseInt(e.target.value);
    let foundMatch = false;

    for (const userProfileEpisode of userProfileEpisodes) {
      if (userProfileEpisode.episode === checkedEpisodeId) {
        deleteProfileEpisode(userProfileEpisode.id);
        newUserProfileEpisodes();
        newProfileEpisodes()
        foundMatch = true;
        break;
      }
    }
    if (!foundMatch) {
      const newProfileEpisode = {
        episode: checkedEpisodeId,
      };
      createProfileEpisode(newProfileEpisode);
      profileEpisodeList.push(checkedEpisodeId);
      newUserProfileEpisodes();
      newProfileEpisodes()
    }
  };


  // // Create a separate function to map over episodes
  // const renderEpisodes = (season) => {
  //   const episodeList = [];
  //   for (const episode of season.episodes) {
  //     episodeList.push(
  //       <div key={episode.id}>
  //         <label>
  //           <input
  //             type="checkbox"
  //             value={episode.id}
  //             checked={profileEpisodeList.includes(episode.id)}
  //             onChange={(e) => addOrRemoveEpisode(e)}
  //           />
  //           <h3>Episode {episode.episode}: {episode.title}</h3>
  //           <p>{episode.synopsis}</p>
  //           <p>Air Date: {episode.air_date}</p>
  //         </label>
  //       </div>
  //     );
  //   }
  //   return episodeList;
  // };

  return (
    <div className="Profile-details">
      <div className="header">
        <h2>{profile.display_name}</h2>
        <img src={profile.picture} alt="profile picture" className="profile-pictures" />
        <button className="btn btn-2 btn-sep icon-create"
          onClick={() => {
            navigate({ pathname: "/myProfile/edit" })
          }}
        >Edit Profile</button>
      </div>
    </div>
  );
};