import axios from "axios";
import { InferGetServerSidePropsType } from "next";
import Calendar from "../../components/appointment/Calendar";
import { AppointmentInterface } from "../../interfaces/AppointmentInterfaces";
import NavbarLayout from "../../Layouts/NavbarLayout";

const AppointmentPage = ({ foundAppointments }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <NavbarLayout>
                <Calendar foundAppointments = {foundAppointments}/>
            </NavbarLayout>
        </>
    )
}

export const getServerSideProps = async () => {

    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/appointment/get-appointment-list";
    const response = await axios.get(url, { withCredentials: true });
    const foundAppointments: AppointmentInterface[] = response.data.foundAppointments;

    return {
        props: {
            foundAppointments
        }
    }
}

export default AppointmentPage;