import { useContext, useState } from "react";
import { BasicPrimaryButton } from "../../smallComponents/Buttons";
import Zoom from "@mui/material/Zoom";
import Router from "next/router";
import BookAppointmentContext from "../../../context/BookAppointmentProvider";
import axios from "axios";
import { BookAppointmentServiceListInterface } from "../../../interfaces/SalonDataInterface";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LangContext from "../../../context/LanguageProvider";

const ServiceItem = ({ _id, name, time, price }: BookAppointmentServiceListInterface) => {

    const { lang } = useContext(LangContext);
    const { 
        bookAppointmentData,
        setBookAppointmentData, 
        setCurrentWeek, 
        setCurrentWeekAppointments } = useContext(BookAppointmentContext);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setBookAppointmentData(prevValues => {
            return {
                ...prevValues,
                serviceId: _id,
                serviceName: name,
                serviceLength: time,
                servicePrice: price
            }
        })
        getDateList(bookAppointmentData.adminId)
        Router.push('/appointment-booking/choose-date');
    }

    const getDateList = async (adminId: string) => {
        try {
            setLoading(true);
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/book-appointment/get-first-appointment-list";
            const options = {
                params: {
                    adminId,
                }
            }
            const response = await axios.get(url, options);
            const currentWeek = response.data.currentWeek;
            const firstFetchAppointments = response.data.firstFetchAppointments;
            setCurrentWeek({
                monday: new Date(currentWeek.monday),
                tuesday: new Date(currentWeek.tuesday),
                wednesday: new Date(currentWeek.wednesday),
                thurstday: new Date(currentWeek.thurstday),
                friday: new Date(currentWeek.friday),
                saturday: new Date(currentWeek.saturday),
                sunday: new Date(currentWeek.sunday),
            });
            setCurrentWeekAppointments(firstFetchAppointments);
            setLoading(false);
        } catch(err) {
            setLoading(false);
            err instanceof Error && console.log(err.message)
        }   
    }

    return (
        <Zoom in={name ? true : false}>
            <section className="bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 md:p-6 m-4 w-80 max-w-full md:basis-2/5 lg:basis-3/12 ">
                <div className="flex flex-col h-full">
                    <h5 className="font-semibold text-center mb-4">{ name }</h5>
                    <div className="flex flex-row text-sm mb-8">
                        <div className="flex flex-row items-center justify-center mt-4 flex-1">
                            <AccessTimeIcon fontSize="small"/>
                            <span className="ml-2">{ time } { lang === 'hun' ? 'Perc' : 'Minutes' }</span>
                        </div>
                        <div className="flex flex-row items-center justify-center mt-4 flex-1">
                            <CreditCardIcon fontSize="small"/>
                            <span className="ml-2">{ price } { lang === 'hun' ? 'Ft' : '€' }</span>
                        </div>
                    </div>
                    <div className="mx-auto mt-auto">
                        <BasicPrimaryButton text={ lang === 'hun' ? "Kiválasztás" : "Choose" } onClick={handleClick} disabled={loading}/>
                    </div>
                </div>
            </section>
        </Zoom>
    )
}

export default ServiceItem;