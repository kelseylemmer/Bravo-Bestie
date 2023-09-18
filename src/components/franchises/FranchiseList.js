import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllFranchises } from "../../managers/FranchiseManager";
import "./franchise.css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar, Box, Typography } from "@mui/material";

export const FranchiseList = () => {
  const [franchiseList, setFranchiseList] = useState([]);

  useEffect(() => {
    getAllFranchises().then((data) => setFranchiseList(data));
  }, []);


  return (

    <>
      <Typography variant='h2'>All Shows</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ImageList sx={{ width: '95%', height: 440 }} cols={franchiseList.length}>
          {franchiseList.map((franchise) => (
            <ImageListItem key={franchise.id} sx={{ width: 266, height: 418 }}>
              <a key={franchise.id} href={`/franchises/${franchise.id}`}>
                <img
                  className="franchise-list-image"
                  src={`${franchise.list_image}?w=248&fit=crop&auto=format`}
                  srcSet={`${franchise.list_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={franchise.abbreviation}
                  loading="lazy"
                /></a>
              <ImageListItemBar
                title={franchise.label}
                subtitle={franchise.abbreviation}
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
}
