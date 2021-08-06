import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../App";
import axios from 'axios';
import {Wrapper} from "../Resources/LoginStyle"


export default function Login() {
  const { state, dispatch } = useContext(AuthContext);
  const [data, setData] = useState({ errorMessage: "", isLoading: false });

  const { client_id, redirect_uri } = state;
  

  useEffect(() => {
    // After requesting Github access, Github redirects back to your app with a code parameter
    const url = window.location.href;
    const hasCode = url.includes("?code=");

    // If Github API returns the code parameter
    if (hasCode) {
      const newUrl = url.split("?code=");
      window.history.pushState({}, null, newUrl[0]);
      setData({ ...data, isLoading: true });

      const requestData = {
        client_id: state.client_id,
        client_secret: state.client_secret,
        code: newUrl[1],        
      };

      const proxy_url = state.proxy_url;

     axios({
        method: 'post',
        url: proxy_url,
        data: requestData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
    })
    .then(response =>{
      console.log(response.data)
     let params = new URLSearchParams(response.data);
    const access_token = params.get("access_token");
    dispatch({      
      type: "LOGIN",
      payload: { user: access_token, isLoggedIn: true }
    });
  }).catch(error => {
      setData({
        isLoading: false,
        errorMessage: "Sorry! Login failed"
      });
    });
    }
  }, [state, dispatch, data]);

  if (state.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Wrapper>
      <section className="container">
        <div>
          <h1>Welcome</h1>
          <span>OAUTH 2 Login app</span>
          <span>{data.errorMessage}</span>
          <div className="login-container">
            {data.isLoading ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : (
              <>
                <a
                  className="login-link"
                  href={`${process.env.REACT_APP_AUTH}?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
                  onClick={() => {
                    setData({ ...data, errorMessage: "" });
                  }}
                >
                
                  <span>Login with GitHub</span>
                </a>
              </>
            )}
          </div>
        </div>
      </section>
    </Wrapper>
  );
}

;