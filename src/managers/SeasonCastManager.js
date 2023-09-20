export const getSeasonCast = (id) => {
  return fetch(`http://localhost:8000/seasoncast`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
    .then(response => response.json())
}