"use client";

import { useState, useContext, useRef } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import axios from "axios";
import Zoom from '@mui/material/Zoom';
import AuthContext from '../../context/AuthProvider';
import Router from 'next/router';

const LoginForm = () => {

  const { auth, setAuth } = useContext(AuthContext);
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [loginMessage, setLoginMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendLoginData(emailRef.current.value, passwordRef.current.value);
  };

  const sendLoginData = async (email: string, password: string) => {
    try {
      setLoading(true);
      const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/login";
      const params = {email: email, password: password};
      const response = await axios.post(url, params, { withCredentials: true });
      const accessToken = response.data.accessToken;
      setAuth({ email, password, accessToken });
      setLoginMessage(response.data.message);
      setLoading(false);
      Router.push('/admin');
    } 
    catch(err) {
      err instanceof Error && console.log(err.message);
    }
  }


  return (
    <section id="login-section">
      <Container component="main" maxWidth="xs">
        <Box className="login-box">
              <h2>Bejelentkezés</h2>
              <Box className="form" component="form" onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  inputRef={emailRef}
                  id="email-login"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Jelszó"
                  type="password"
                  id="password-login"
                  inputRef={passwordRef}
                  autoComplete="current-password"
                />
                <Box className="submit-button-div">
                  <Button
                    variant="contained"
                    type='submit'
                    className="submit-button global-button"
                    disabled={loading}
                  >
                    Bejelentkezés
                  </Button>
                  {loading && (
                    <CircularProgress size={24} className="loading-icon" />
                  )}
                </Box>
              </Box>
              <Zoom in={loginMessage !== ""}>
                <div className="error-div">
                  <p className="error-text">{loginMessage}</p>
                </div>
              </Zoom>
          </Box>
      </Container>
    </section>
  );
}

export default LoginForm;