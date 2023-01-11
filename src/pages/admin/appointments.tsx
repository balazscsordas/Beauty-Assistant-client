import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AddAppointmentDialog from "../../components/appointment/AddAppointmDialog";
import Calendar from "../../components/appointment/Calendar";
import EditAppointmentDialog from "../../components/appointment/EditAppointmDialog";
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
            <NavbarLayout>
                <Calendar/>
                <AddAppointmentDialog/>
                <EditAppointmentDialog/>
            </NavbarLayout>
        </>
    )
}

export default AppointmentPage;