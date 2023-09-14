import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editProfile, getCurrentUserProfile } from "../../managers/ProfileManager";
import { getAllFranchises } from "../../managers/FranchiseManager";
import "./profile.css";

export const EditProfile = ({ token }) => {
  const navigate = useNavigate()
  const [currentProfile, setCurrentProfile] = useState({});
  const [franchises, setFranchises] = useState([])
  const [selectedFranchise, setSelectedFranchise] = useState()

  const id = currentProfile.id

  useEffect(() => {
    getCurrentUserProfile(token)
      .then((data) => {
        setCurrentProfile(data);
        setSelectedFranchise(data.favorite_franchise.id)
      });
  }, [token]);

  useEffect(() => {
    getCurrentUserProfile(token).then((data) => setCurrentProfile(data));
  }, [token]);

  useEffect(() => {
    getAllFranchises()
      .then((franchiseList) => {
        setFranchises(franchiseList);
      });
  }, []);

  const changeProfileState = (event) => {
    const { name, value } = event.target;
    setCurrentProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  return (
    <form className="profileForm">
      <h2 className="profileForm__title">Edit Profile</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="display_name">Display Name: </label>
          <input
            type="text"
            name="display_name"
            required autoFocus
            className="form-control"
            value={currentProfile.display_name}
            onChange={changeProfileState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="bio">Bio: </label>
          <input
            type="text"
            name="bio"
            required autoFocus
            className="form-control"
            value={currentProfile.bio}
            onChange={changeProfileState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="favorite_franchise">Favorite Franchise: </label>
          <select
            name="favorite_franchise"
            required autoFocus
            className="form-control"
            value={currentProfile?.favorite_franchise?.id}
            onChange={(evt) => {
              setSelectedFranchise(parseInt(evt.target.value))
            }}
          >
            <option value="">Select Franchise</option>
            {franchises.map((franchise) => (
              <option key={franchise.id} value={franchise.id}>
                {franchise.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="picture">Profile Picture: </label>
          <input
            type="text"
            name="picture"
            required autoFocus
            className="form-control"
            value={currentProfile.picture}
            onChange={changeProfileState}
          />
        </div>
      </fieldset>
      <button type="submit"
        onClick={evt => {
          // Prevent form from being submitted
          evt.preventDefault()

          const profile = {
            display_name: currentProfile.display_name,
            bio: currentProfile.bio,
            favorite_franchise: selectedFranchise,
            picture: currentProfile.picture
          }

          // Send POST request to your API
          editProfile(id, profile, token)
            .then(() => navigate("/myProfile"))
        }}
        className="btn btn-primary">Update Profile</button>
    </form>
  )
} 