export const getCastById = (id) => {
  return fetch(`http://localhost:8000/casts/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
    .then(response => response.json())
}