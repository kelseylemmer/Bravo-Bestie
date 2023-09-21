import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCastById } from "../../managers/CastManager";
import { Container, Typography, Box, IconButton } from "@mui/material";
import { Instagram, Twitter } from "@mui/icons-material";
import { getBooksByCastId } from "../../managers/BookManager";
import "./cast.css";


export const CastDetails = () => {
  const { id } = useParams();
  const [castMember, setCastMember] = useState({});
  const [books, setBooks] = useState([])

  useEffect(() => {
    getCastById(id).then((data) => setCastMember(data));
  }, [id]);

  useEffect(() => {
    getBooksByCastId(id).then((data) => setBooks(data));
  }, [id]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '40px',
        textAlign: 'center',
      }}
    >
      <img src={castMember.img_url} alt="profile picture" className="profile-pictures" />
      <Typography variant="h5" sx={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 'bold' }}>
        {castMember.name}
      </Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {castMember.twitter && (
          <IconButton
            sx={{ margin: '5px' }}
            aria-label={castMember.twitter}
            onClick={() => window.open(castMember.twitter)}
          >
            <Twitter fontSize="large" sx={{
              color: 'black',
              '&:hover': {
                color: 'blue',
              },
            }} />
          </IconButton>
        )}
        {castMember.instagram && (
          <IconButton
            sx={{ margin: '5px' }}
            aria-label={castMember.instagram}
            onClick={() => window.open(castMember.instagram)}
          >
            <Instagram fontSize="large" sx={{
              color: 'black',
              '&:hover': {
                color: 'fuchsia',
              },
            }} />
          </IconButton>
        )}
      </div>
      <Typography variant="h6" sx={{ fontFamily: 'DM Sans, sans-serif', width: '60%' }}> {castMember.bio} </Typography>
      {books.length > 0 && (
        <>
          <Typography variant='h2' sx={{
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 'bold',
            fontStyle: 'italic',
            textTransform: 'uppercase',
            marginLeft: '30px',
            marginTop: '50px',
            marginBottom: 2,
            alignSelf: 'flex-start', // Align the "Books" heading to the left
          }}>Books:</Typography>
          <Box
            sx={{
              display: 'flex',
              marginLeft: '30px', // Add left margin to the books section
            }}
          >
            {books.map((book) => (
              <Box
                key={book.id}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '350px',
                  marginRight: '20px',

                }}
              >
                <Link to={`/books/${book.id}`} style={{ textDecoration: 'none' }}>
                  <div>
                    <img src={book.img_url} alt="franchise-photo" className="franchise-pics book-container" />
                    <Typography variant="h6" sx={{ fontFamily: 'DM Sans, sans-serif', color: 'black', fontWeight: 'bold' }} className="book-title">
                      {book.title}
                    </Typography>
                  </div>
                </Link>
              </Box>
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}