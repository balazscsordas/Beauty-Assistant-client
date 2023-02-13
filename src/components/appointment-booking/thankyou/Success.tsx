import Link from "next/link";
import { useContext } from "react"; 
import LangContext from "../../../context/LanguageProvider";
import { BasicPrimaryButton } from "../../smallComponents/Buttons";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const Success = () => {

    const { lang } = useContext(LangContext);

    return (
        <section className="grid justify-center items-center m-auto text-center">
            <div>
                <h4 className="font-bold mb-4 inline-block">{ lang === 'hun' ? 'Foglalás leadása sikeres volt.' : 'Successfully booked the appointment.' }</h4>
                <CheckBoxIcon className="text-green-600 mb-2 ml-2"/>
            </div>
            {/* <p className="mb-10">{ lang === 'hun' ? 'E-mailben elküldtük számodra a foglalás részleteit.' : 'We have sent you the details of your appointment in email.' }</p> */}
            <Link href='/' passHref>
                <BasicPrimaryButton text={ lang === 'hun' ? "Vissza a kezdőoldalra" : "Go to homepage" }/>
            </Link>
        </section>
    )
}

export default Success;