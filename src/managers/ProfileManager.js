export const getCurrentUserProfile = (token) => {
  return fetch(`http://localhost:8000/profiles?token=${token}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
    .then(response => response.json())
}

export const editProfile = (id, profile) => {
  return fetch(`http://localhost:8000/profiles/${id}`, {
    method: "PUT",
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(profile),
  })
};