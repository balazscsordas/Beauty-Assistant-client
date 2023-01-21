import Link from "next/link"
import { BasicPrimaryButton } from "../smallComponents/Buttons"

const AuthenticationSection = () => {

    return (
        <section className="my-14 bg-slate-100 py-5">
            <h2 className="text-center mb-10 font-bold">Próbáld ki 30 napig ingyen!</h2>
            <div className="flex justify-center max-w-lg m-auto">
                <Link className="m-2" passHref href="/registration">
                    <BasicPrimaryButton text="Regisztráció"/>
                </Link>
                <Link className="m-2" passHref href="/login">
                    <BasicPrimaryButton text="Bejelentkezés"/>
                </Link>
            </div>
        </section>
    )
}

export default AuthenticationSection