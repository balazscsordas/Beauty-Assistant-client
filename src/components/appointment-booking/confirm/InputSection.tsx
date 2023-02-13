import Box from "@mui/material/Box";
import axios from "axios";
import Router from "next/router";
import { useState, useContext } from "react";
import BookAppointmentContext from "../../../context/BookAppointmentProvider";
import LangContext from "../../../context/LanguageProvider";
import { BookAppointmentDataInterface } from "../../../interfaces/SalonDataInterface";
import { emailValidationCheck } from "../../authentication/Utils";
import { Alert } from "../../smallComponents/Alerts";
import { BasicPrimaryButton } from "../../smallComponents/Buttons";
import { OneLineReqInput } from "../../smallComponents/InputFields";
import { trueIfNumberValidator } from "../../smallComponents/InputValidators";

const InputSection = () => {

    const { lang } = useContext(LangContext);
    const { setBookAppointmentData, bookAppointmentData } = useContext(BookAppointmentContext);

    const [showNameError, setShowNameError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showPostDataError, setShowPostDataError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBookAppointmentData(prevValues => {
            return {
                ...prevValues,
                [name]: value
            }
        })
        if (name === 'clientEmail') {
            !emailValidationCheck(value) ? setShowEmailError(true) : setShowEmailError(false);
        }
        if (name === 'clientName') {
            trueIfNumberValidator(value) ? setShowNameError(true) : setShowNameError(false);
        }
    }

    const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (!showEmailError && !showNameError) {
            sendBookDataToServer(bookAppointmentData, lang);
            setBookAppointmentData({
                adminId: "",
                clientEmail: "",
                clientName: "",
                date: new Date(),
                salonName: "",
                serviceId: "",
                serviceLength: 0,
                serviceName: "",
                servicePrice: "",
                time: ""
            })
        } 
    }

    const sendBookDataToServer = async (data: BookAppointmentDataInterface, lang: string) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/book-appointment/post-book-appointment-data";
            const params = { data, lang };
            const response = axios.post(url, params);
            Router.push("/appointment-booking/success");
        } catch (err) {
            setShowPostDataError(true);
            err instanceof Error && console.log(err.message);
        }
    }

    return (
        <>
            <Alert 
                open={showPostDataError}
                onClose={() => setShowPostDataError(false)}
                text={ lang === 'hun' ? "Valami probléma történt, próbáld újra később." : "Something went wrong, please try again" }
                severity="error"
            />

            <Box component="form" className="mt-8" onSubmit={handleSubmit}> 
                <OneLineReqInput 
                    label={ lang === 'hun' ? "Név" : "Name" }
                    onChange={handleChange}
                    autoComplete="name"
                    value={bookAppointmentData.clientName}
                    nameVal="clientName"
                    errorText={ lang === 'hun' ? "Kizárólag számot tartalmazhat." : "Only numbers are allowed." }
                    showError={showNameError}
                />
                <OneLineReqInput 
                    label="Email"
                    onChange={handleChange}
                    autoComplete="email"
                    value={bookAppointmentData.clientEmail}
                    nameVal="clientEmail"
                    errorText={ lang === 'hun' ? "Érvénytelen e-mail cím." : "Not valid email address." }
                    showError={showEmailError}
                />
                <div className="mt-10 text-center">
                    <BasicPrimaryButton type="submit" text={ lang === 'hun' ? 'Véglegesítés' : 'Submit' }/>
                </div>
            </Box>
        </>
    )
}

export default InputSection;