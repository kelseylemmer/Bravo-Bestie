
// For fetching profile episodes for profile display
export const getCurrentUserEpisodes = () => {
  return fetch(`http://localhost:8000/profileepisodes?current`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
    .then(response => response.json())
}

// For fetching profile episodes for franchise display
export const getUserEpisodes = () => {
  return fetch(`http://localhost:8000/profileepisode?current`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
    .then(response => response.json())
}

export const deleteProfileEpisode = (checkedEpisodeId) => {

  return fetch(`http://localhost:8000/profileepisodes/${checkedEpisodeId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
  })
}

export const createProfileEpisode = (newProfileEpisode) => {

  return fetch("http://localhost:8000/profileepisodes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    },
    body: JSON.stringify(newProfileEpisode)
  }).then(res => res.json())
}