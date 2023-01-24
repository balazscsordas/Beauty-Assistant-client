import React, { useState, useContext, useRef } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import axios from "axios";
import AuthContext from '../../context/AuthProvider';
import Router from 'next/router';
import { OneLineReqAutoFocusInput, OneLineReqInput } from '../smallComponents/InputFields';
import { BasicPrimaryButton } from '../smallComponents/Buttons';
import { Alert } from '../smallComponents/Alerts';
import Link from 'next/link';
import AuthenticationWrapper from './AuthenticationWrapper';

const LoginForm = () => {

  const { setAuth } = useContext(AuthContext);
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
      const params = { data };
      const response = await axios.post(url, params, { withCredentials: true });
      setLoading(false);
      if(response.status === 200) {
        setShowSuccessAlert(true);
        setAuth(response.data.authData);
        localStorage.setItem('firstName', response.data.authData.firstName);
        setInputData({
          email: "",
          password: "",
        })
        Router.push('/admin');
      }
    }
    catch(err) {
      if (err instanceof Error && err.response.status == 401) {
        setShowErrorAlert(true);
        console.log(err.message);
      }
      setLoading(false);
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
          text="Sikeres bejelentkezés"
          severity="success"
      />
      <Alert 
          open={showErrorAlert}
          onClose={handleCloseAlert}
          text="Hibás email cím vagy jelszó."
          severity="error"
      />
    <AuthenticationWrapper title="Bejelentkezés">
        <Box component="form" onSubmit={handleSubmit}>
          <OneLineReqAutoFocusInput onChange={handleChange} value={inputData.email} label="Email" nameVal="email" autoComplete="email"/>
          <OneLineReqInput onChange={handleChange} value={inputData.password} label="Jelszó" nameVal="password" type="password" autoComplete="password"/>
          <Box className="mt-8 mb-4">
            <BasicPrimaryButton text="Bejelentkezés" type="submit" disabled={loading}/>
            {loading && (
              <div>
                <CircularProgress size={24}/>
              </div>
            )}
          </Box>
        </Box>
        <p className="mt-4 font-medium text-sm">Nincs még fiókod? Regisztrálj 
          <Link className="text-slate-200" passHref href="/registration">
            <button className='ml-1 underline underline-offset-2'>ide kattintva!</button>
          </Link>
        </p>
    </AuthenticationWrapper>
    </>
  );
}

export default LoginForm;