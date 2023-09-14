export const getCurrentUserEpisodes = () => {
  return fetch(`http://localhost:8000/profileEpisodes?current`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
    .then(response => response.json())
}

export const deleteProfileEpisode = (checkedEpisodeId) => {

  return fetch(`http://localhost:8000/profileEpisodes/${checkedEpisodeId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
  })
}

export const createProfileEpisode = (newProfileEpisode) => {

  return fetch("http://localhost:8000/profileEpisodes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(newProfileEpisode)
  }).then(res => res.json())
}