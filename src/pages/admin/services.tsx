import NavbarLayout from "../../Layouts/NavbarLayout";
import ServiceList from "../../components/services/ServiceList";
import { ServiceListInterface } from "../../interfaces/ServiceInterfaces";
import { InferGetServerSidePropsType } from "next";
import axios from "axios";
import { useContext } from "react";
import ServiceContext from "../../context/ServiceProvider";

export const getServerSideProps = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/service/get-service-list";
    const response = await axios.get(url, { withCredentials: true });
    const servicesList: ServiceListInterface[] = response.data.foundServices

    return {
        props: {
            servicesList
        }
    }
}

const ServicesPage = ({ servicesList }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setServices } = useContext(ServiceContext);
    setServices(servicesList);

    return (
        <>
            <NavbarLayout>
                <ServiceList/>
            </NavbarLayout>
        </>
    )
}

export default ServicesPage;