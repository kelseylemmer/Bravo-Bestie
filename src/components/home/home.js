import { Box } from "@mui/material";
import "./home.css";


export const Home = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
      <img src="https://i.imgur.com/cnD6p2ot.png" alt="Bravo Bestie" className="home-pic" />
    </Box>
  )
}