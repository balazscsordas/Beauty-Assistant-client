import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import AuthContext from '../../context/AuthProvider';
import Router from 'next/router';
import { OneLineReqInput } from '../smallComponents/InputFields';
import { BasicPrimaryButton } from '../smallComponents/Buttons';
import { Alert } from '../smallComponents/Alerts';
import Link from 'next/link';
import AuthenticationWrapper from './AuthenticationWrapper';
import LangContext from '../../context/LanguageProvider';
import TestAccountLoginButton from '../homepage/TestAccountLoginButton';

const LoginForm = () => {

  const { lang } = useContext(LangContext);
 
  const { setAuth, setFirstName } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  })
  
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendLoginData(inputData);
  };

  const sendLoginData = async (data: {email: string, password: string}) => {
    try {
      setLoading(true);
      const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/auth/login";
      const params = { email: data.email, password: data.password };
      const response = await axios.post(url, params, { withCredentials: true });
      setCookie(response.data.refreshToken);
      setLoading(false);
      setShowSuccessAlert(true);
      setAuth(response.data.authData);
      setFirstName(response.data.authData.firstName);
      localStorage.setItem('firstName', response.data.authData.firstName);
      setInputData({
        email: "",
        password: "",
      })
    }
    catch(err) {
      setShowErrorAlert(true);
      err instanceof Error && console.log(err.message);
      setLoading(false);
    }
  }

  const setCookie = async (refreshToken: string) => {
    try {
      const url = "/api/setCookie";
      const params = { refreshToken };
      const response = await axios.post(url, params, { withCredentials: true, headers: {'Content-Type': 'application/json'} });
      Router.push('/admin');
    } catch(err) {
        err instanceof Error && console.log(err);
    }
  }

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData(prevValues => {
      return {
        ...prevValues,
        [name]: value,
      }
    })
  }


  return (
    <>
      <Alert 
          open={showSuccessAlert}
          onClose={handleCloseAlert}
          text={ lang === 'hun' ? "Sikeres bejelentkezés." : "Success." }
          severity="success"
      />
      <Alert 
          open={showErrorAlert}
          onClose={handleCloseAlert}
          text={ lang === 'hun' ? "Hibás email cím vagy jelszó." : "Invalid credentials, please try again." }
          severity="error"
      />
    <AuthenticationWrapper title={ lang === 'hun' ? "Bejelentkezés" : "Login" }>
        <Box component="form" onSubmit={handleSubmit}>
          <OneLineReqInput onChange={handleChange} value={inputData.email} label="Email" nameVal="email" autoComplete="email"/>
          <OneLineReqInput onChange={handleChange} value={inputData.password} label={ lang === 'hun' ? "Jelszó" : "Password" } nameVal="password" type="password" autoComplete="password"/>
          <Box className="mt-8 mb-4">
            <BasicPrimaryButton text={ lang === 'hun' ? "Bejelentkezés" : "Login" } type="submit" disabled={loading}/>
            <TestAccountLoginButton />
          </Box>
        </Box>
        <p className="mt-4 font-medium text-sm">{ lang === 'hun' ? "Nincs még fiókod? Regisztrálj" : "Don't have account yet? Register by" }
          <Link passHref href="/registration">
            <button className='ml-1 mt-2 underline underline-offset-2'>{ lang === 'hun' ? "ide kattintva!" : "clicking here" }</button>
          </Link>
        </p>
    </AuthenticationWrapper>
    </>
  );
}

export default LoginForm;