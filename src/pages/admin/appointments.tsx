import axios from "axios";
import Head from "next/head";
import { useContext, useEffect } from "react";
import AddAppointmentDialog from "../../components/appointment/addNewAppointment/AddAppointmDialog";
import Calendar from "../../components/appointment/Calendar";
import EditAppointmentDialog from "../../components/appointment/editAppointment/EditAppointmDialog";
import AppointmentContext from "../../context/AppointmentProvider";
import NavbarLayout from "../../Layouts/NavbarLayout";

const AppointmentPage = () => {

    const { currentWeek, setCurrentWeekAppointments } = useContext(AppointmentContext);

    useEffect(() => {
        fetchWeekData();
    }, [currentWeek])

    const fetchWeekData = async () => {
        const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/appointment/get-appointment-list";
        const options = {
            params: { currentWeek },
            withCredentials: true
        }
        const response = await axios.get(url, options);
        setCurrentWeekAppointments(response.data.currentWeekAppointments);
    }

    return (
        <>
            <Head>
            <title>Beauty Asszisztens | Időpontok</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavbarLayout>
                <Calendar/>
                <AddAppointmentDialog/>
                <EditAppointmentDialog/>
            </NavbarLayout>
        </>
    )
}

export default AppointmentPage;