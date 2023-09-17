import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllFranchises } from "../../managers/FranchiseManager";
import "./franchise.css";


export const FranchiseList = () => {
  const { id } = useParams();
  const [franchiseList, setFranchiseList] = useState([]);

  useEffect(() => {
    getAllFranchises().then((data) => setFranchiseList(data));
  }, []);

  // Define the number of franchises per row
  const franchisesPerRow = 4; // You can adjust this number as needed

  return (
    <div className="franchise-details">
      <div className="header">
        <h2>All Shows</h2>
        <div className="franchise-list">
          {franchiseList.map((franchise, index) => (
            <section className="franchise-item" key={franchise.id}>
              <Link to={`/franchises/${franchise.id}`}>
                <div className="franchise-item-container">
                  <div className="franchise-pics-container">
                    <img src={franchise?.list_image} alt="franchise-photo" className="franchise-pics" />
                  </div>
                  <div className="franchise-label">{franchise.label}</div>
                </div>
              </Link>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
