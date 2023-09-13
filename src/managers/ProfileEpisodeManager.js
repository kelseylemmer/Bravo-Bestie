export const getCurrentUserEpisodes = (token) => {
  return fetch(`http://localhost:8000/profileEpisodes?current`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
    .then(response => response.json())
}












export const deleteProfileEpisodes = (VARIABLE) => {

  return fetch("http://localhost:8000/profileEpisodes/VARIABLE", {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
  })
}

export const createProfileEpisodes = (VARIABLE) => {

  return fetch("http://localhost:8000/profileEpisodes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(VARIABLE)
  }).then(res => res.json())
}