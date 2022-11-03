import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import instance from "../../api/request";

function Auth({checkAuth}) {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const loginFunction = async (e) => {
    e.preventDefault();
    if (login === "" && pass === "") {
      console.log("test");
      return;
    }
    console.log(login, pass);
    const res = await instance.post("router?action=login", { login, pass });
      console.log(res.data);
      if (res.data.ok) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("activeID", res.data.activeID);
          checkAuth(true);
      }
  };
  const regFunction = async (e) => {
    e.preventDefault();
    if (login === "" && pass === "") {
      console.log("test");
      return;
    }
    console.log(login, pass);
    const res = await instance.post("router?action=register", { login, pass });
      console.log(res.data);
      if (res.data.ok && !res.data.alreadyExist) {
      const res2= await loginFunction();
          console.log(res2.data);
      }
      if (res.data.ok && res.data.alreadyExist) {
          console.log('Exist!!!');
      }
  };

  return (
    <Tabs
      defaultActiveKey="login"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="login" title="Login">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              onChange={(e) => {
                setLogin(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={loginFunction}>
            Login
          </Button>
        </Form>
      </Tab>
      <Tab eventKey="register" title="Register">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail2">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              onChange={(e) => {
                setLogin(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={regFunction}>
            Registration
          </Button>
        </Form>
      </Tab>
    </Tabs>
  );
}
export default Auth;
