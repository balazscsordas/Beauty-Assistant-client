import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { BasicPrimaryButton } from "../smallComponents/Buttons";

const MainBanner = () => {

    const { setAuth, setFirstName } = useContext(AuthContext);

    const sendLoginData = async (data: {email: string, password: string}) => {
        try {
          const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/auth/login";
          const params = { email: data.email, password: data.password };
          const response = await axios.post(url, params, { withCredentials: true });
          if(response.status === 200) {
            setAuth(response.data.authData);
            setFirstName(response.data.authData.firstName);
            localStorage.setItem('firstName', response.data.authData.firstName);
            Router.push('/admin');
          }
        }
        catch(err) {
          console.log(err);
        }
      }

    const handleTestLogin = () => {
        sendLoginData({email: 'tesztfiok@tesztfiok.com', password: 'Tesztfiok1996@'})
    } 

      
    return (
        <section className="flex justify-center items-center min-h-50vh bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-600 to-indigo-900">
            <div className="text-center text-white">
                <h1 className="mb-4 text-3xl sm:text-4xl font-bold">Beauty Assistant</h1>
                <p>Gyorsan, egyszerűen, hatékonyan.</p>
                <div className="flex justify-center max-w-lg m-auto mt-4">
                    <Link className="m-2" passHref href="/registration">
                        <BasicPrimaryButton text="Regisztráció"/>
                    </Link>
                    <Link className="m-2" passHref href="/login">
                        <BasicPrimaryButton text="Bejelentkezés"/>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default MainBanner;