import { useState, useContext, useRef } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import axios from "axios";
import AuthContext from '../../context/AuthProvider';
import Router from 'next/router';
import { OneLineReqAutoFocusInput, OneLineReqInput } from '../smallComponents/InputFields';
import { BasicPrimaryButton } from '../smallComponents/Buttons';
import { Alert } from '../smallComponents/Alerts';

const LoginForm = () => {

  const { setAuth } = useContext(AuthContext);
  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [loginMessage, setLoginMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendLoginData(emailRef.current.value, passwordRef.current.value);
  };

  const sendLoginData = async (email: string, password: string) => {
    try {
      setLoading(true);
      const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/auth/login";
      const params = {email: email, password: password};
      const response = await axios.post(url, params, { withCredentials: true });
      console.log(response.data);
      setLoading(false);
      if (response.status == 401) {
        setShowErrorAlert(true);
        console.log("Unathorized");
      }
      else if(response.data.message === "Success") {
        setShowSuccessAlert(true);
        setLoginMessage(response.data.message);
        setAuth(response.data.authData);
        Router.push('/admin');
      }
    } 
    catch(err) {
      console.log(err);
      err instanceof Error && console.log(err.message);
    }
  }

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };


  return (
    <section id="login-section">
      <Alert 
          open={showSuccessAlert}
          onClose={handleCloseAlert}
          text="Sikeres bejelentkezés"
          severity="success"
      />
      <Alert 
          open={showErrorAlert}
          onClose={handleCloseAlert}
          text="Vendég hozzáadása nem sikerült."
          severity="error"
      />

      <Container>
        <h2>Bejelentkezés</h2>
        <Box component="form" onSubmit={handleSubmit}>
          <OneLineReqAutoFocusInput inputRef={emailRef} label="Email" nameVal="name"/>
          <OneLineReqInput inputRef={passwordRef} label="Jelszó" nameVal="password" type="password" />
          <Box className="submit-button-div">
            <BasicPrimaryButton text="Bejelentkezés" type="submit" disabled={loading}/>
            {loading && (
              <div>
                <CircularProgress size={24} className="loading-icon" />
              </div>
            )}
          </Box>
        </Box>
      </Container>
    </section>
  );
}

export default LoginForm;