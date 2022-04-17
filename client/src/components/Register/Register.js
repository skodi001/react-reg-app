import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser, setUser, toggleBlockedUser } from "../../storage/storage";

function Register({ currentUser, updateCurrentUser }) {
  const [errors, setErrors] = useState([]);
  const [isAlertClosed, setIsAlertClosed] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    console.log(currentUser);
    if (currentUser && !currentUser?.isBlocked) {
      navigate("/");
    }
  }, [currentUser]);

  const registerUser = (e) => {
    e.preventDefault();
    if (currentUser?.isBlocked) {
      if (errors.length < 1) {
        setErrors([{ error: "You are blocked, so can't register" }]);
        setIsAlertClosed([false]);
      }
      return;
    }
    axios
      .post("https://reactreg2022.herokuapp.com/api/auth/register", {
        ...userInfo,
      })
      .then((res) => {
        if (res.data.success) {
          navigate("/login");
        } else {
          setErrors(res.data);
          setIsAlertClosed(...Array.of(res.data.map((c) => false)));
        }
      })
      .catch((err) => console.log(err));
  };
  const updateUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  console.log(isAlertClosed, "Register");
  return (
    <div className="container mt-5">
      <h1 className="mb-3">Register Page</h1>
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
      <Form onSubmit={registerUser}>
        <Form.Group className="mb-3 mt-2" controlId="formBasicUsername">
          <Form.Label>Enter Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={updateUserInfo}
            value={userInfo.username}
            placeholder="Enter username"
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="c_password"
            onChange={updateUserInfo}
            value={userInfo.c_password}
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-3">
          Submit
        </Button>
      </Form>
      <Link to="/login">login</Link>
    </div>
  );
}

export default Register;
