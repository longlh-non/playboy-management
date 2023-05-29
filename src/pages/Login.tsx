import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider.jsx";
import axios from "../api/axios";

const LOGIN_URL = "/auth";

function Login() {
  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post(
      //   LOGIN_URL,
      //   JSON.stringify({ userName: user, pwd }),
      //   {
      //     headers: { "Content-Type": "application/json" },
      //     withCredentials: true,
      //   }
      // );
      // console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));

      const response = {
        data: {
          accessToken:
            "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY4NTM0NDUyOSwiaWF0IjoxNjg1MzQ0NTI5fQ.lDORXMVpXzQux8M7jFKuCsPa9mMHjHF6lATg3Yl9TkE",
          roles: ["admin", "member"],
        },
      };

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
    } catch (err) {
      if (!err?.response) setErrMsg("No server response");
      else if (err.response?.status === 400)
        setErrMsg("Missing Username or Password");
      else if (err.response?.status === 401) setErrMsg("Unauthorized");
      else setErrMsg("Login failed");

      errRef.current.focus();
    }
  };
  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in</h1>
          <br />
          <p>
            <a href="#">Go to home</a>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} className={errMsg ? "err-msg" : "off-screen"}>
            {errMsg}
          </p>
          <h1>Sign in</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor="username">Password:</label>
            <input
              type="password"
              id="password"
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/* put a router link here*/}
              <a href="#">Sign Up</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default Login;
