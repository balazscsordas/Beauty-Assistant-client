import Link from "next/link";
import { BasicPrimaryButton } from "../smallComponents/Buttons";

const MainBanner = () => {
    return (
        <section className="flex justify-center items-center min-h-50vh bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-600 to-indigo-900">
            <div className="text-center text-white">
                <h1 className="mb-4 text-4xl font-bold">Beauty Assistant</h1>
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