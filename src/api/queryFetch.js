const queryFetch = (query, variables) => {
  return fetch("https://scandi-server-production.up.railway.app/", {
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
