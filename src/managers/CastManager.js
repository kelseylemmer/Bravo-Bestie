export const getCastById = (id) => {
  return fetch(`http://localhost:8000/franchises/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
    .then(response => response.json())
}