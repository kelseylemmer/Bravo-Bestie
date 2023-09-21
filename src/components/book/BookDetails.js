import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Typography, Box, IconButton } from "@mui/material";
import { getBookById } from "../../managers/BookManager";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import "./book.css";

export const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState({})

  useEffect(() => {
    getBookById(id).then((data) => setBook(data));
  }, [id]);


  return (
    <Container>
      <Container
        sx={{
          paddingTop: '50px',
          display: 'flex',
          justifyContent: 'center', // Center horizontally
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row', // Arrange book cover and information side by side
            gap: '50px', // Space between book cover and information
            maxWidth: '1000px', // Adjust the maximum width as needed
            width: '100%', // Make sure the content spans the entire width
          }}
        >
          <Box sx={{ flex: 1 }}>
            {/* Book cover image */}
            <img src={book.img_url} alt={book.title} className="book-cover" />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center', // Center horizontally
              }}
            >
              {/* Centered shopping cart icon */}
              <IconButton
                sx={{
                  margin: '5px',
                  marginTop: '10px', // Adjust the top margin as needed
                }}
                aria-label={book.purchase}
                onClick={() => window.open(book.purchase)}
              >
                <LocalMallIcon fontSize="large" sx={{
                  color: 'black',
                  '&:hover': {
                    color: 'grey',
                  },
                }} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={{ flex: 2 }}>
            {/* Book title */}
            <Typography variant="h4" sx={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 'bold' }}>{book.title}</Typography>
            <Typography variant="h5" sx={{ fontFamily: 'DM Sans, sans-serif', marginBottom: '12px' }}> By: {book?.cast?.name}</Typography>
            <Typography variant="p" sx={{ fontFamily: 'DM Sans, sans-serif', marginTop: '10px' }}>{book.synopsis}</Typography>


            <div>
              <Typography variant="p" sx={{ fontFamily: 'DM Sans, sans-serif', display: 'inline-block', width: '150px', marginTop: '20px' }}>
                Publisher:
              </Typography>
              <Typography variant="p" sx={{ fontFamily: 'DM Sans, sans-serif', display: 'inline-block' }}>
                {book.publisher}
              </Typography>
            </div>
            <div>
              <Typography variant="p" sx={{ fontFamily: 'DM Sans, sans-serif', display: 'inline-block', width: '150px' }}>
                Publication date:
              </Typography>
              <Typography variant="p" sx={{ fontFamily: 'DM Sans, sans-serif', display: 'inline-block' }}>
                {book.publish_date}
              </Typography>
            </div>
            <div>
              <Typography variant="p" sx={{ fontFamily: 'DM Sans, sans-serif', display: 'inline-block', width: '150px' }}>
                Pages:
              </Typography>
              <Typography variant="p" sx={{ fontFamily: 'DM Sans, sans-serif', display: 'inline-block' }}>
                {book.pages}
              </Typography>
            </div>

          </Box>
        </Box>
      </Container>
      <Typography variant='h2' sx={{
        fontFamily: 'DM Sans, sans- serif',
        fontWeight: 'bold',
        fontStyle: 'italic',
        textTransform: 'uppercase',
        marginTop: '50px',
        marginBottom: 2
      }}>Reviews</Typography>
    </Container>

  );
}