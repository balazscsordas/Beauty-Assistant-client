import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from "axios";
import Zoom from '@mui/material/Zoom';
import Collapse from '@mui/material/Collapse';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { OneLineReqAutoFocusInput, OneLineReqInput } from '../smallComponents/InputFields';
import { BasicPrimaryButton } from '../smallComponents/Buttons';
import { RegistrationDataInterface } from '../../interfaces/AuthInterfaces';
import { Alert } from '../smallComponents/Alerts';
import { emailValidationCheck, passwordValidationCheck } from './Utils';
import validator from 'validator';

const RegistrationForm = () => {

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
        console.log(inputData);
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
      ? setPasswordLengthError(<CheckIcon className="check-icon"/>)
      : setPasswordLengthError(<CloseIcon className="close-icon"/>)
    
    validator.isStrongPassword(inputData.password, {minLength: 0, minLowercase: 0, minUppercase: 0, minNumbers: 1, minSymbols: 1})
      ? setPasswordNumberSymbolError(<CheckIcon className="check-icon"/>)
      : setPasswordNumberSymbolError(<CloseIcon className="close-icon"/>)

    validator.isStrongPassword(inputData.password, {minLength: 0, minLowercase: 1, minUppercase: 1, minNumbers: 0, minSymbols: 0})
      ? setPasswordLowerUpperError(<CheckIcon className="check-icon"/>)
      : setPasswordLowerUpperError(<CloseIcon className="close-icon"/>)
  }

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  return (
      <section id="registration-section">
        <Alert 
            open={showSuccessAlert}
            onClose={handleCloseAlert}
            text="Sikeres regisztráció."
            severity="success"
        />
        <Alert 
            open={showErrorAlert}
            onClose={handleCloseAlert}
            text="Sikertelen regisztráció."
            severity="error"
        />
      
        <Container>
          <h2>Regisztráció</h2>
          <Box component="form" onSubmit={handleSubmit}>
            <OneLineReqAutoFocusInput onChange={handleChange} value={inputData.firstName} label="Keresztnév" nameVal="firstName" autoComplete="first-name"/>
            <OneLineReqInput onChange={handleChange} value={inputData.email} label="Email" nameVal="email" autoComplete='email'/>
            
            <Collapse in={showEmailErrorMessage}>
              <div className="error-div">
                <p className="error-text">Nem megfelelő email</p>
              </div>
            </Collapse>
            <OneLineReqInput onChange={handleChange} value={inputData.password} label="Jelszó" nameVal="password" type="password" autoComplete='password'/>
            
            <Collapse in={inputData.password.length > 0}>
              <ul className="password-requirements-block">
                <p className="title">Jelszónak a következő feltételeknek kell megfelelnie:</p>
                <li>{passwordLowerUpperError} kis és nagybetűs karakterek</li>
                <li>{passwordNumberSymbolError} legalább egy szám és egy speciális karakter</li>
                <li>{passwordLengthError} minimum 8 karakter hosszúság</li>
              </ul>
            </Collapse>
            <Box className="submit-button-div">
              <BasicPrimaryButton text="Regisztráció" type="submit" disabled={loading}/>
              {loading && (
                <div>
                  <CircularProgress size={24} className="loading-icon" />
                </div>
              )}
            </Box>
          </Box>
          <Zoom in={showRegistrationMessage}>
              <div className="message-block">
                  <p>{registrationMessage}</p>
              </div>
          </Zoom>
        </Container>
      </section>
  );
}

export default RegistrationForm;