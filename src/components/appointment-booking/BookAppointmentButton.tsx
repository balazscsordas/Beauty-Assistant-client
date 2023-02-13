import Zoom from "@mui/material/Zoom";
import Link from "next/link";
import { useContext } from "react";
import LangContext from "../../context/LanguageProvider";
import { AddIconOptionButton } from "../smallComponents/Buttons";

const BookAppointmentButton = () => {

    const { lang } = useContext(LangContext);

    return (
        <Zoom in={true}>
            <Link href="/appointment-booking/choose-salon" className="fixed bottom-2 right-2 md:bottom-6 md:right-6 z-20">
                <AddIconOptionButton text={ lang === 'hun' ? "foglalj időpontot" : "Book an appointment" }/>
            </Link>
        </Zoom>
    )
}

export default BookAppointmentButton;