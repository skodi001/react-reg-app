const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
const removeUser = () => {
  localStorage.removeItem("user");
};
const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
const toggleBlockedUser = () => {
  const val = JSON.parse(localStorage.getItem("bool"));
  if (val !== null) {
    localStorage.setItem("bool", JSON.stringify(!val));
    return JSON.parse(localStorage.getItem("bool"));
  } else {
    localStorage.setItem("bool", JSON.stringify(false));
    return JSON.parse(localStorage.getItem("bool"));
  }
};

export { setUser, getUser, removeUser, toggleBlockedUser };
