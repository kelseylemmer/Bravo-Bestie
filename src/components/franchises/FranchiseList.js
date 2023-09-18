import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllFranchises } from "../../managers/FranchiseManager";
import "./franchise.css";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { ImageListItemBar } from "@mui/material";

export const FranchiseList = () => {
  const [franchiseList, setFranchiseList] = useState([]);

  useEffect(() => {
    getAllFranchises().then((data) => setFranchiseList(data));
  }, []);


  return (
    <ImageList sx={{ width: '100%', height: 450 }} cols={franchiseList.length}>
      {franchiseList.map((franchise) => (
        <ImageListItem key={franchise.id} sx={{ width: 266, height: 418 }}>
          <img
            className="franchise-list-image"
            src={`${franchise.list_image}?w=248&fit=crop&auto=format`}
            srcSet={`${franchise.list_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={franchise.abbreviation}
            loading="lazy"
          />
          <ImageListItemBar
            title={franchise.label}
            subtitle={franchise.abbreviation}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
