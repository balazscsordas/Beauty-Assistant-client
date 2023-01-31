import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import axios from "axios";
import Zoom from '@mui/material/Zoom';
import Collapse from '@mui/material/Collapse';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { OneLineReqInput } from '../smallComponents/InputFields';
import { BasicPrimaryButton } from '../smallComponents/Buttons';
import { RegistrationDataInterface } from '../../interfaces/AuthInterfaces';
import { Alert } from '../smallComponents/Alerts';
import { emailValidationCheck, passwordValidationCheck } from './Utils';
import validator from 'validator';
import Router from 'next/router';
import Link from 'next/link';
import AuthenticationWrapper from './AuthenticationWrapper';
import LangContext from '../../context/LanguageProvider';

const RegistrationForm = () => {

  const { lang } = useContext(LangContext);

  const [inputData, setInputData] = useState<RegistrationDataInterface>({
      firstName: "",
      email: "",
      password: ""
  })
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [showRegistrationMessage, setShowRegistrationMessage] = useState(false);
  const [showEmailErrorMessage, setShowEmailErrorMessage] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(<CloseIcon className="close-icon"/>);
  const [passwordNumberSymbolError, setPasswordNumberSymbolError] = useState(<CloseIcon className="close-icon"/>);
  const [passwordLowerUpperError, setPasswordLowerUpperError] = useState(<CloseIcon className="close-icon"/>);
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      !emailValidationCheck(inputData.email) ? setShowEmailErrorMessage(true): setShowEmailErrorMessage(false);
      if (emailValidationCheck(inputData.email) && passwordValidationCheck(inputData.password)) {
        sendRegistrationData(inputData);
        setInputData({
          firstName: "",
          email: "",
          password: ""
        });
        setShowEmailErrorMessage(false);
      }
  };

  const sendRegistrationData = async (data: RegistrationDataInterface) => {
      try {
        setLoading(true);
        const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/auth/registration";
        const params = { data };
        const response = await axios.post(url, params);
        setLoading(false);
        if (response.status === 201 ) {
          setShowSuccessAlert(true);
          Router.push('/login');
        }
      } catch(err) {
          setShowErrorAlert(true);
          err instanceof Error && console.log(err.message);
          setLoading(false);
      }
    }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    if (name === 'password') {
      passwordFormatCheck(value);
    }
    setInputData(prevText => {
        return {
          ...prevText,
          [name]: value
        }
      })
  }

  const passwordFormatCheck = (password: string) => {
    password.length >= 8
      ? setPasswordLengthError(<CheckIcon className="text-green-600"/>)
      : setPasswordLengthError(<CloseIcon className="close-icon"/>)
    
    validator.isStrongPassword(password, {minLength: 0, minLowercase: 0, minUppercase: 0, minNumbers: 1, minSymbols: 1})
      ? setPasswordNumberSymbolError(<CheckIcon className="text-green-600"/>)
      : setPasswordNumberSymbolError(<CloseIcon className="close-icon"/>)

    validator.isStrongPassword(password, {minLength: 0, minLowercase: 1, minUppercase: 1, minNumbers: 0, minSymbols: 0})
      ? setPasswordLowerUpperError(<CheckIcon className="text-green-600"/>)
      : setPasswordLowerUpperError(<CloseIcon className="close-icon"/>)
  }

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  return (
      <>
        <Alert 
            open={showSuccessAlert}
            onClose={handleCloseAlert}
            text={ lang === 'hun' ? "Sikeres regisztráció." : 'Registration was successfull.' }
            severity="success"
        />
        <Alert 
            open={showErrorAlert}
            onClose={handleCloseAlert}
            text={ lang === 'hun' ? "Sikertelen regisztráció." : 'Something went wrong, please try again' }
            severity="error"
        />
      <AuthenticationWrapper title={ lang === 'hun' ? "Regisztráció" : "Registration" }>
            <Box component="form" onSubmit={handleSubmit}>
              <OneLineReqInput onChange={handleChange} value={inputData.firstName} label={ lang === 'hun' ? "Keresztnév" : "First name" } nameVal="firstName" autoComplete="first-name"/>
              <OneLineReqInput onChange={handleChange} value={inputData.email} label="Email" nameVal="email" autoComplete='email'/>
              
              <Collapse in={showEmailErrorMessage}>
                <div>
                  <p className="input-error-text">{ lang === 'hun' ? "Nem megfelelő formátum!" : "Not valid email!" }</p>
                </div>
              </Collapse>
              <OneLineReqInput onChange={handleChange} value={inputData.password} label={ lang === 'hun' ? "Jelszó" : "Password" } nameVal="password" type="password" autoComplete='password'/>
              
              <Collapse in={inputData.password.length > 0}>
                <ul className="input-error-text">
                  <p className="input-error-text mb-2 mt-1">{ lang === 'hun' ? "Jelszónak a következő feltételeknek kell megfelelnie:" : "Your password has to contain at least:" }</p>
                  <li>{passwordLowerUpperError} { lang === 'hun' ? "kis és nagybetűs karakterek" : "one lowercase and one uppercase character" }</li>
                  <li>{passwordNumberSymbolError} { lang === 'hun' ? "legalább egy szám és egy speciális karakter" : "one number and a special character" }</li>
                  <li>{passwordLengthError} { lang === 'hun' ? "minimum 8 karakter hosszúság" : "8 characters long" }</li>
                </ul>
              </Collapse>
              <Box className="mt-6 mb-4">
                <BasicPrimaryButton text={ lang === 'hun' ? "Regisztráció" : "Registration" } type="submit" disabled={loading}/>
                {loading && (
                  <div>
                    <CircularProgress size={24}/>
                  </div>
                )}
              </Box>
            </Box>
            <Zoom in={showRegistrationMessage}>
                <div>
                    <p>{registrationMessage}</p>
                </div>
            </Zoom>
            <p className="mt-4 font-medium text-sm">{ lang === 'hun' ? "Van már fiókod? Jelentkezz be" : "Already have an account? Login by" } 
              <Link passHref href="/login">
                <button className='ml-1 mt-2 underline underline-offset-2'>{ lang === 'hun' ? "ide kattintva!" : "clicking here" }</button>
              </Link>
            </p>
        </AuthenticationWrapper>
      </>
  );
}

export default RegistrationForm;