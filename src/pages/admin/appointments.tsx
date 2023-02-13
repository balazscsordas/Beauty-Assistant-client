import axios from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useContext, useEffect } from "react";
import AddAppointmentDialog from "../../components/appointment/addNewAppointment/AddAppointmDialog";
import Calendar from "../../components/appointment/Calendar";
import EditAppointmentDialog from "../../components/appointment/editAppointment/EditAppointmDialog";
import AppointmentContext from "../../context/AppointmentProvider";
import LangContext from "../../context/LanguageProvider";
import { AppointmentInterface, WeekdaysInterface } from "../../interfaces/AppointmentInterfaces";
import NavbarLayout from "../../Layouts/NavbarLayout";

export const getServerSideProps = async ( context: GetServerSidePropsContext ) => {
    const jwtCookie = context.req.headers.cookie;
    const options = {
        headers: {
            withCredentials: true,
            cookie: jwtCookie
        }
    }
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/appointment/get-first-fetch-appointment-list";
    const response = await axios.get(url, options);
    const currentWeek: WeekdaysInterface = response.data.currentWeek;
    const firstFetchAppointments: AppointmentInterface[] | null = response.data.firstFetchAppointments;

    return {
        props: {
            currentWeek,
            firstFetchAppointments
        }
    }
}

const AppointmentPage = ({ currentWeek, firstFetchAppointments }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const {setCurrentWeek, setCurrentWeekAppointments } = useContext(AppointmentContext);
    const { lang } = useContext(LangContext);

    useEffect(() => {
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
    }, [])
 
    return (
        <>
            <Head>
            <title>{ lang === 'hun' ? "Beauty Assistant | Időpontok" : "Beauty Assistant | Appointments"}</title>
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