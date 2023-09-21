import React, { useRef, useState } from 'react';
import { Button, Container, TextField, Typography, Grid } from '@mui/material';
import { loginUser } from '../../managers/AuthManager';
import { Link, useNavigate } from 'react-router-dom';


export const Login = ({ setToken }) => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const [isUnsuccessful, setIsUnsuccessful] = useState(false);

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  const formStyle = {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const titleStyle = {
    marginBottom: '16px',
    fontFamily: 'DM Sans, sans- serif',
    fontWeight: 'bold'
  };

  const submitButtonStyle = {
    marginTop: '16px',
  };

  const errorTextStyle = {
    color: 'red',
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      email: email.current.value,
      password: password.current.value,
    };

    loginUser(user).then((res) => {
      if ('valid' in res && res.valid) {
        setToken(res.token);
        navigate('/');
      } else {
        setIsUnsuccessful(true);
      }
    });
  };

  return (
    <Container component="main" maxWidth="md" style={containerStyle}>
      <form style={formStyle} onSubmit={handleLogin}>
        <Typography variant="h4" component="h1" style={titleStyle} >
          Bravo Bestie
        </Typography>
        <Typography variant="subtitle1" sx={{ fontFamily: "DM Sans, sans-serif" }}>Please sign in</Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          inputRef={email}
          type="email"
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          inputRef={password}
          type="password"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={submitButtonStyle}
        >
          Submit
        </Button>

        <Grid container justifyContent="center">
          <Grid item>
            <Link to="/register" variant="body2">
              Not yet a Bravo Bestie? Register here!
            </Link>
          </Grid>
        </Grid>

        {isUnsuccessful && (
          <Typography variant="body2" style={errorTextStyle}>
            Username or password not valid
          </Typography>
        )}
      </form>
    </Container>
  );
};

