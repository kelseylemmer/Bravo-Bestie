import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../managers/AuthManager";
import { getAllFranchises } from "../../managers/FranchiseManager";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

const boxStyle = {
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  padding: "20px",
  borderRadius: "5px",
};

export const Register = ({ setToken }) => {
  const firstName = useRef("");
  const lastName = useRef("");
  const email = useRef("");
  const password = useRef("");
  const bio = useRef("");
  const display_name = useRef("");
  const verifyPassword = useRef("");
  const passwordDialog = useRef("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        bio: bio.current.value,
        display_name: display_name.current.value,
        favorite_franchise: selectedFranchise,
      };

      registerUser(newUser).then((res) => {
        if ("valid" in res && res.valid) {
          setToken(res.token);
        }
        navigate("/login");
      });
    } else {
      passwordDialog.current.showModal();
    }
  };

  const [selectedFranchise, setSelectedFranchise] = useState("");
  const [franchises, setFranchises] = useState([]);
  useEffect(() => {
    getAllFranchises().then((franchiseList) => {
      setFranchises(franchiseList);
    });
  }, []);

  return (
    <Container maxWidth="sm" sx={{ marginTop: "50px" }}>
      <Typography variant="h4" align="center" sx={{ fontFamily: "DM Sans, sans-serif", fontWeight: "bold" }} gutterBottom>
        Bravo Bestie
      </Typography>
      <Typography variant="subtitle1" align="center" sx={{ fontFamily: "DM Sans, sans-serif" }} gutterBottom>
        Create an account
      </Typography>
      <Box style={boxStyle}>
        <form onSubmit={handleRegister}>
          <TextField
            label="First Name"
            fullWidth
            inputRef={firstName}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Last Name"
            fullWidth
            inputRef={lastName}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Display Name"
            fullWidth
            inputRef={display_name}
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Bio"
            fullWidth
            inputRef={bio}
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
            placeholder="Tell us about yourself..."
          />
          <TextField
            label="Email"
            fullWidth
            inputRef={email}
            type="email"
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Password"
            fullWidth
            inputRef={password}
            type="password"
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Verify Password"
            fullWidth
            inputRef={verifyPassword}
            type="password"
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Favorite Bravo Show"
            fullWidth
            select
            value={selectedFranchise}
            onChange={(evt) => {
              setSelectedFranchise(evt.target.value);
            }}
            margin="normal"
            variant="outlined"
          >
            <MenuItem value="">Select Show</MenuItem>
            {franchises.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                color="primary"
                style={{ marginLeft: "8px" }}
              >
                Cancel
              </Button>
            </Link>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  );
};
