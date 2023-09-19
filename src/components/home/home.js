import { Box } from "@mui/material";
import "./home.css";


export const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <img src="https://i.imgur.com/aqAkDpE.png" alt="Bravo Bestie" className="home-pic" />
    </Box>
  );
};
