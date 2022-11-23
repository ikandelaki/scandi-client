const queryFetch = (query, variables) => {
  return fetch("https://scandi-project-server.herokuapp.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  }).then((res) => res.json());
};

export default queryFetch;
