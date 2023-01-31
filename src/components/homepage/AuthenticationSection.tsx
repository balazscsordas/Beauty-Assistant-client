import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Link from "next/link"
import Router from "next/router";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import LangContext from "../../context/LanguageProvider";
import { BasicPrimaryButton } from "../smallComponents/Buttons"

const AuthenticationSection = () => {

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
        sendLoginData({email: 'tesztfiok@tesztfiok.com', password: 'Tesztfiok1996@'})
    } 

    return (
        <section className="md:my-10 py-16 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-600 to-indigo-900">
            <h2 className="text-center mb-6 sm:mb-10 font-bold text-white">{ lang === 'hun' ? 'Mire vársz még? Próbáld ki!' : 'Try out!' }</h2>
            <div className="flex justify-center max-w-lg m-auto">
                <Link className="m-2" passHref href="/registration">
                    <BasicPrimaryButton text={ lang === 'hun' ? 'Regisztráció' : 'Registration' }/>
                </Link>
                <div className="m-2">
                    <BasicPrimaryButton text={ lang === 'hun' ? 'Tesztfiók' : 'test account' } onClick={handleTestLogin} disabled={loginLoading}/>
                    {loginLoading && (
                      <div>
                        <CircularProgress size={24}/>
                      </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default AuthenticationSection