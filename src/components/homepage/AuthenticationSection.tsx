import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import Link from "next/link"
import Router from "next/router";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import LangContext from "../../context/LanguageProvider";
import { BasicPrimaryButton } from "../smallComponents/Buttons"
import TestAccountLoginButton from "./TestAccountLoginButton";

const AuthenticationSection = () => {

    const { lang } = useContext(LangContext);

    return (
        <section className="md:my-10 py-20 bg-banner">
            <h2 className="text-center mb-6 sm:mb-10 font-bold text-white">{ lang === 'hun' ? 'Ne várj tovább, próbáld ki!' : "Don't hesitate, give it a try!" }</h2>
            <div className="flex justify-center max-w-lg m-auto">
                <Link className="m-2" passHref href="/registration">
                    <BasicPrimaryButton text={ lang === 'hun' ? 'Regisztráció' : 'Registration' }/>
                </Link>
                <div className="m-2">
                  <TestAccountLoginButton />
                </div>
            </div>
        </section>
    )
}

export default AuthenticationSection