import NavbarLayout from "../../Layouts/NavbarLayout";
import ServiceList from "../../components/services/ServiceList";
import { ServiceListInterface } from "../../interfaces/ServiceInterfaces";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import axios from "axios";
import { useContext, useEffect } from "react";
import ServiceContext from "../../context/ServiceProvider";

export const getServerSideProps = async ( context: GetServerSidePropsContext ) => {
    const jwtCookie = context.req.headers.cookie;
    const options = {
        headers: {
            withCredentials: true,
            cookie: jwtCookie,
        }
    }
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/service/get-service-list";
    const response = await axios.get(url, options);
    const servicesList: ServiceListInterface[] = response.data.foundServices

    return {
        props: {
            servicesList
        }
    }
}

const ServicesPage = ({ servicesList }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setServices } = useContext(ServiceContext);

    useEffect(() => {
        setServices(servicesList);
    }, [])

    return (
        <>
            <NavbarLayout>
                <ServiceList servicesList = {servicesList}/>
            </NavbarLayout>
        </>
    )
}

export default ServicesPage;