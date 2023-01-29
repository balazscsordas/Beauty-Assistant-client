import axios from "axios";
import Link from "next/link"
import Router from "next/router";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { BasicPrimaryButton } from "../smallComponents/Buttons"

const AuthenticationSection = () => {

    const { setAuth, setFirstName } = useContext(AuthContext);

    const sendLoginData = async (data: {email: string, password: string}) => {
        try {
          const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/auth/login";
          const params = { data };
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
        <section className="md:my-10 py-16 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-600 to-indigo-900">
            <h2 className="text-center mb-6 sm:mb-10 font-bold text-white">Mire vársz még? Próbáld ki!</h2>
            <div className="flex justify-center max-w-lg m-auto">
                {/* <Link className="m-2" passHref href="/registration">
                    <BasicPrimaryButton text="Regisztráció"/>
                </Link> */}
                <div className="m-2">
                    <BasicPrimaryButton text="Bemutató fiók" onClick={handleTestLogin}/>
                </div>
            </div>
        </section>
    )
}

export default AuthenticationSection