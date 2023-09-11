export const getAllFranchises = () => {
  const token = localStorage.getItem("auth_token");
  const headers = token
    ? { "Authorization": `Token ${token}` }
    : {};

  return fetch("http://localhost:8000/franchises", {
    headers
  })
    .then(response => response.json());
};