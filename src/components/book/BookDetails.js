import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Typography, Box, IconButton, Paper, Avatar, Button, FormControl, TextField } from "@mui/material";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { getBookById } from "../../managers/BookManager";
import { createReview, getReviewByBookId } from "../../managers/ReviewManager";
import "./book.css";




export const BookDetails = ({ token }) => {
  const { id } = useParams();
  const [book, setBook] = useState({})
  const [reviews, setReviews] = useState([])
  const [currentReview, setCurrentReview] = useState({ review: "", book: 0 })


  useEffect(() => {
    getBookById(id).then((data) => setBook(data));
  }, [id]);

  useEffect(() => {
    getReviewByBookId(id).then((data) => setReviews(data));
  }, [id]);

  const updateReviews = () => {
    getReviewByBookId(id).then((data) => setReviews(data));
  }

  const changeReviewState = (e) => {
    const { name, value } = e.target;
    setCurrentReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = {
      review: currentReview.review,
      book: parseInt(id),
    };

    createReview(review)
      .then(() => {
        setCurrentReview({ review: "", book: 0 });
        updateReviews();
      });
  };

  const reviewStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '16px',
    marginBottom: '16px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  };

  const nameStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const dateStyle = {
    fontSize: '0.8rem',
    color: 'rgba(0, 0, 0, 0.54)',
    marginBottom: '4px',
    marginTop: '10px'
  };

  const textStyle = {
    fontSize: '1rem',
  };

  const avatarStyle = {
    width: '48px',
    height: '48px',
    marginRight: '16px',
  };




  return (
    <Container>
      <Container
        sx={{
          paddingTop: '50px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '50px',
            maxWidth: '1000px',
            width: '100%',
          }}
        >
          <Box sx={{ flex: 1 }}>
            {/* Book cover image */}
            <img src={book.img_url} alt={book.title} className="book-cover" />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <IconButton
                sx={{
                  margin: '5px',
                  marginTop: '10px',
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
        marginBottom: 2,
        marginLeft: '-40px'
      }}>Reviews</Typography>
      <div>
        {reviews.map((review) => (
          <Paper key={review.id} style={reviewStyle} elevation={3}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar alt={review.profile.full_name} src={review.profile.picture} style={avatarStyle} />
              <Typography variant="subtitle1" style={nameStyle}>
                {review.profile.full_name}
              </Typography>
            </div>
            <Typography variant="body2" style={dateStyle}>
              {new Date(review.date).toLocaleDateString()}
            </Typography>
            <Typography variant="body1" style={textStyle}>
              {review.review}
            </Typography>
          </Paper>
        ))}
      </div>
      <Paper style={reviewStyle} elevation={3}>
        <Typography>add your review</Typography>
        <form>
          <FormControl sx={{ width: '90%' }}>
            <TextField
              name="review"
              required
              multiline
              rows={4}
              placeholder="Write your review here"
              variant="outlined"
              value={currentReview.review}
              onChange={changeReviewState}
              style={{ marginBottom: '16px', width: '1120px' }}
            />
          </FormControl>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleReviewSubmit}
          >
            Submit Review
          </Button>
        </form>
      </Paper>
    </Container >
  );
}