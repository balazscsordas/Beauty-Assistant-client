import axios from "axios";
import Router from "next/router";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import LangContext from "../../context/LanguageProvider";
import { BasicPrimaryButton } from "../smallComponents/Buttons";

const TestAccountLoginButton = () => {

    const { setAuth, setFirstName } = useContext(AuthContext);
    const { lang } = useContext(LangContext);
    const [loginLoading, setLoginLoading] = useState(false);

    const sendLoginData = async (data: {email: string, password: string}) => {
        try {
          setLoginLoading(true);
          const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/auth/login";
          const params = { email: data.email, password: data.password };
          const response = await axios.post(url, params, { withCredentials: true, headers: {'Content-Type': 'application/json'} });
          setCookie(response.data.refreshToken);
          setLoginLoading(false);
          setAuth(response.data.authData);
          setFirstName(response.data.authData.firstName);
          localStorage.setItem('firstName', response.data.authData.firstName);
        }
        catch(err) {
          err instanceof Error && console.log(err);
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

    const handleTestLogin = () => {
        lang === 'hun' 
          ? sendLoginData({email: 'tesztfiok@tesztfiok.com', password: 'Tesztfiok1996@'})
          : sendLoginData({email: 'testaccount@testaccount.com', password: 'Testaccount1996@'})
    } 

    return (
        <BasicPrimaryButton text={ lang === 'hun' ? 'Tesztfiók' : 'test account' } onClick={handleTestLogin} disabled={loginLoading}/>
    )
}

export default TestAccountLoginButton