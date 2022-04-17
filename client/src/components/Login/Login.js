import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { setUser, toggleBlockedUser } from "../../storage/storage";

import axios from "axios";

function Login({ currentUser, getAllUsers, users, updateCurrentUser }) {
  const [errors, setErrors] = useState([]);
  const [isAlertClosed, setIsAlertClosed] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser && !currentUser?.isBlocked) {
      navigate("/");
    }
  }, [currentUser]);
  console.log(currentUser, "Login");
  const loginUser = (e) => {
    e.preventDefault();

    if (currentUser?.isBlocked) {
      if (errors.length < 1) {
        setErrors([{ error: "You are blocked, so can't login" }]);
        setIsAlertClosed([false]);
      }
      return;
    }

    axios
      .post("https://reactreg2022.herokuapp.com/api/auth/login", {
        ...userInfo,
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
          updateCurrentUser(res.data.user);
          getAllUsers();
          navigate("/");
        } else {
          setErrors(res.data);
          setIsAlertClosed(...Array.of(res.data.map((v) => false)));
        }
      })
      .catch((err) => console.log(err));
  };

  const updateUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  console.log(userInfo, "Login User");
  return (
    <div className="container mt-5">
      <h1 className="mb-3">Login Page</h1>
      {errors.length <= 3 &&
        errors.map((err, index) => {
          if (!isAlertClosed[index]) {
            return (
              <Alert
                key={index.toString()}
                variant="danger"
                onClose={() =>
                  setIsAlertClosed(
                    isAlertClosed.map((v, i) => (i === index ? !v : v))
                  )
                }
                dismissible
              >
                <Alert.Heading>{err.error}</Alert.Heading>
              </Alert>
            );
          }
        })}
      <Form onSubmit={loginUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={updateUserInfo}
            value={userInfo.email}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={updateUserInfo}
            value={userInfo.password}
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mb-3">
          Submit
        </Button>
      </Form>
      <Link to="/register">register</Link>
    </div>
  );
}

export default Login;
