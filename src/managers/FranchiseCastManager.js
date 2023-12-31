export const getFranchiseCast = (id) => {
  return fetch(`http://localhost:8000/franchisecast?franchise=${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
    .then(response => response.json())
}