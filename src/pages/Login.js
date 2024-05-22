import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "./UserPool";
import "./form.css";
import {useHistory } from "react-router-dom";

//https://docs.aws.amazon.com/es_es/apigateway/latest/developerguide/apigateway-enable-cognito-user-pool.html
//https://www.youtube.com/watch?v=yhD2XJVFQUg&list=PLDckhLrNepPR8y-9mDXsLutiwsLhreOk1&index=2


const Login = () => {
  // const navigate = useNavigate();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [respuestaLogin, setRespuestaLogin] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log("onSucess :>> ", data);
        console.log("tk :>> ", data.idToken.jwtToken);
        localStorage.setItem("tk", data.idToken.jwtToken);
        history.push("/crearEvento");
      },
      onFailure: (data) => {
        setRespuestaLogin(" Incorrect username or password.");
        console.log("onFailure :>> ", data);
       
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired :>> ", data);
        setRespuestaLogin(" Incorrect username or password...");
      },
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <br />
        <label htmlFor="email">
          Email
          <input
            type="textarea"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="textarea"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <input type="submit" name="Login" value="Login" />
        <label><h1>{respuestaLogin}</h1></label>
      </form>
    </div>
  );
};

export default Login;
