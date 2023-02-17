import Router from "next/router";
import { useContext, useEffect } from "react";
import BookAppointmentContext from "../../../context/BookAppointmentProvider";
import LangContext from "../../../context/LanguageProvider";
import { getNamedDay, getNamedMonth, getNumberedDay } from "../../appointment/Utils";
import EditIconButton from "./EditIconButton";
import InputSection from "./InputSection";

const Confirm = () => {

    const { bookAppointmentData } = useContext(BookAppointmentContext);
    const { lang } = useContext(LangContext);

    useEffect(() => {
        !bookAppointmentData.adminId && Router.push("/appointment-booking/choose-salon");
    }, [])
    
    const dateText = bookAppointmentData.date.getFullYear() 
                    + '. ' + getNamedMonth(bookAppointmentData.date, lang) 
                    + ' ' + getNumberedDay(bookAppointmentData.date) 
                    + '. ' + getNamedDay(bookAppointmentData.date, lang)
                    + ' ' + bookAppointmentData.time

    return (
        <section className="mx-auto w-[36rem] max-w-full">
            <section className="bg-white p-4 rounded-xl m-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] ">
                <h4 className="font-semibold text-center mb-10">{ dateText }<EditIconButton href="/appointment-booking/choose-date"/></h4>
                <div className="mb-8">
                    <h4 className="font-semibold mb-4">{ lang === 'hun' ? 'Szalon:' : 'Salon' }<EditIconButton href="/appointment-booking/choose-salon"/></h4>
                    <p className="ml-2 mb-2">{bookAppointmentData.salonName}</p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">{ lang === 'hun' ? 'Szolgáltatás:' : 'Service' }<EditIconButton href="/appointment-booking/choose-service"/></h4>
                    <p className="ml-2 mb-2">{bookAppointmentData.serviceName}</p>
                    <p className="ml-2 mb-2">{`${bookAppointmentData.servicePrice} ${ lang === 'hun' ? 'Ft' : '€' }`}</p>
                    <p className="ml-2 mb-2">{`${bookAppointmentData.serviceLength} ${ lang === 'hun' ? 'Perc' : 'Minutes' }`}</p>
                </div>
                <InputSection/>
            </section>
        </section>
    )
}

export default Confirm;