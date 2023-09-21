export const getBooksByCastId = (id) => {
  return fetch(`http://localhost:8000/books?cast=${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
    .then(response => response.json())
}

export const getBookById = (id) => {
  return fetch(`http://localhost:8000/books/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
    .then(response => response.json())
}