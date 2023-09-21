export const getReviewByBookId = (id) => {
  return fetch(`http://localhost:8000/reviews?book=${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
    .then(response => response.json())
}

export const createReview = (review) => {

  return fetch("http://localhost:8000/reviews", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(review)
  }).then(res => res.json())
}