import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editProfile, getCurrentUserProfile } from "../../managers/ProfileManager";
import { getAllFranchises } from "../../managers/FranchiseManager";
import "./profile.css";
import { FormControl, Grid, Paper, Typography, InputLabel, TextField, Select, MenuItem, Button, Box } from "@mui/material";


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
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "90vh" }}
    >
      <Grid item>
        <Box
          component="form"
          sx={{
            '& .MuiFormControl-root': { marginBottom: '20px' }, // Add margin-bottom to FormControl
            '& .MuiTextField-root': { width: '100%' }, // Expand the text fields to full width
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h4" component="h2" align="center" marginBottom={"7px"}>
            Edit Profile
          </Typography>

          <FormControl fullWidth>
            <InputLabel htmlFor="display_name" shrink={Boolean(currentProfile.display_name)}>
              Display Name
            </InputLabel>
            <TextField
              required
              autoFocus
              type="text"
              id="display_name"
              value={currentProfile.display_name}
              onChange={changeProfileState}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="bio" shrink={Boolean(currentProfile.bio)}>
              Bio
            </InputLabel>
            <TextField
              required
              autoFocus
              type="text"
              id="bio"
              value={currentProfile.bio}
              onChange={changeProfileState}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="picture" shrink={Boolean(currentProfile.picture)}>
              Profile Picture
            </InputLabel>
            <TextField
              required
              autoFocus
              type="text"
              id="picture"
              value={currentProfile.picture}
              onChange={changeProfileState}
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel htmlFor="favorite_franchise" shrink={Boolean(currentProfile?.favorite_franchise?.id)}>
              Favorite Show
            </InputLabel>
            <Select
              required
              autoFocus
              id="favorite_franchise"
              value={currentProfile?.favorite_franchise?.id}
              onChange={(evt) => {
                setSelectedFranchise(parseInt(evt.target.value));
              }}
            >
              <MenuItem value="" disabled>
                Select a show
              </MenuItem>
              {franchises.map((franchise) => (
                <MenuItem value={franchise.id} key={franchise.id}>
                  {franchise.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={evt => {
              evt.preventDefault()
              const profile = {
                display_name: currentProfile.display_name,
                bio: currentProfile.bio,
                favorite_franchise: selectedFranchise,
                picture: currentProfile.picture
              }
              editProfile(id, profile, token)
                .then(() => navigate("/myProfile"))
            }}
          >
            Update Profile
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};