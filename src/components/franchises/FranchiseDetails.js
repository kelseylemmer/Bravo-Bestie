import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFranchiseById, getSeasonByFranchise } from "../../managers/FranchiseManager";


export const FranchiseDetails = () => {
  const { id } = useParams();
  const [franchiseDetails, setFranchiseDetails] = useState({});
  const [seasons, setSeasons] = useState([]);


  useEffect(() => {
    getFranchiseById(id).then(data => setFranchiseDetails(data))

  }, [id]);


  useEffect(() => {

    getSeasonByFranchise(id)
      .then(data => setSeasons(data))

  }, []);

  return (
    <div className="franchise-details">
      <div className="header">
        <h2>{franchiseDetails.label}</h2>
        <div className="top-left">
          <img src={franchiseDetails?.image} alt="franchise picture" className="franchise-pic" />
        </div>
      </div>
      <div className="top-right">
        {seasons.map(season => (
          <div key={season.id}>
            <h2>Season {season.season_number}</h2>
            <ul>
              {season.episodes.map(episode => (
                <li key={episode.id}>
                  <h3>Episode {episode.episode}</h3>
                  <p>Title: {episode.title}</p>
                  <p>Synopsis: {episode.synopsis}</p>
                  <p>Air Date: {episode.air_date}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
