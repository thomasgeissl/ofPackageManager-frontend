export default (query, handler) => {
  fetch(
    `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`
  )
    .then((res) => res.json())
    .then((data) => (data ? data.items : []))
    .then((data) => {
      data.forEach((item) => {
        item.tags = ["latest"];
        item.checkout = "latest";
      });
      return data;
    })
    .then((data) => {
      handler(data);
    })
    .catch(console.log);
};

const ghUserSearch = (query, handler) => {
  fetch(
    `https://api.github.com/users/${query.split(" ").pop()}/repos?per_page=100`
  )
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        item.tags = ["latest"];
        item.checkout = "latest";
      });
      return data;
    })
    .then((data) => {
      handler(data);
    })
    .catch(console.log);
};
export { ghUserSearch };
