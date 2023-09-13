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

export const getFranchiseById = (id) => {
  return fetch(`http://localhost:8000/franchises/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
    .then(response => response.json())
}

export const getSeasonByFranchise = (id) => {
  return fetch(`http://localhost:8000/seasons?franchise=${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("auth_token")}`
    }
  })
    .then(response => response.json())
}