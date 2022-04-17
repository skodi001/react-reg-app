import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Table from "./components/Table/Table";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import axios from "axios";
import { getUser, removeUser, setUser } from "./storage/storage";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(getUser());

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    axios
      .get("https://reactreg2022.herokuapp.com/api/user/getAllUsers")
      .then((res) => {
        setUsers(res.data);
        const isCurrentUserExist = currentUser
          ? res.data.some((user) => user._id === currentUser?.id)
          : true;
        if (!isCurrentUserExist) {
          removeUser();
          setCurrentUser(null);
        }
        const isCurrentUserBlocked = res.data.some(
          (user) => user._id === currentUser?.id && user.isBlocked
        );
        if (isCurrentUserBlocked) {
          currentUser.isBlocked = true;
          setUser(currentUser);
          setCurrentUser(currentUser);
        }
        const isCurrentUserUnblocked = res.data.some(
          (user) => user._id === currentUser?.id && !user.isBlocked
        );
        if (isCurrentUserUnblocked) {
          currentUser.isBlocked = false;
          setUser(currentUser);
          setCurrentUser(currentUser);
        }
        console.log(isCurrentUserBlocked, res.data);
      })
      .catch((err) => console.log(err));
  };
  const blockUser = (id) => {
    axios
      .post("https://reactreg2022.herokuapp.com/api/user/blockUser", { id })
      .then((res) => {
        if (currentUser.id === id) {
          currentUser.isBlocked = true;
          setUser(currentUser);
          updateCurrentUser(currentUser);
        }
        getAllUsers();
      });
  };
  const unblockUser = (id) => {
    axios
      .post("https://reactreg2022.herokuapp.com/api/user/unblockUser", { id })
      .then((res) => {
        if (currentUser.id === id) {
          currentUser.isBlocked = false;
          setUser(currentUser);
          updateCurrentUser(currentUser);
        }
        getAllUsers();
      });
  };
  const deleteUser = (id) => {
    axios
      .post("https://reactreg2022.herokuapp.com/api/user/deleteUser", { id })
      .then((res) => {
        if (currentUser.id === id) {
          removeUser();
          updateCurrentUser(null);
        }
        getAllUsers();
      });
  };
  const updateCurrentUser = (currentUser) => setCurrentUser(currentUser);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <div className="container mt-5">
            <h1>Welcome {currentUser?.username}</h1>
            <Table
              users={users}
              currentUser={currentUser}
              blockUser={blockUser}
              unblockUser={unblockUser}
              deleteUser={deleteUser}
            />
          </div>
        }
      />
      <Route
        path="/register"
        element={
          <Register
            currentUser={currentUser}
            updateCurrentUser={updateCurrentUser}
          />
        }
      />
      <Route
        path="/login"
        element={
          <Login
            currentUser={currentUser}
            updateCurrentUser={updateCurrentUser}
            getAllUsers={getAllUsers}
            users={users}
          />
        }
      />
    </Routes>
  );
}

export default App;
