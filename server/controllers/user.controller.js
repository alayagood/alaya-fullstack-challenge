const getUser = () => {
  // Fetch user from the database (here we use a static example)
  const user = {
    id: 1,
    username: "example",
  };
  return user;
};

module.exports = {
  getUser,
};
