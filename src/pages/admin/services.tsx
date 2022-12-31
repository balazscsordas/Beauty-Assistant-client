import NavbarLayout from "../../Layouts/NavbarLayout";
import ServiceList from "../../components/services/ServiceList";
import { ServiceListInterface } from "../../interfaces/ServiceInterfaces";
import { InferGetServerSidePropsType } from "next";
import axios from "axios";

export const getServerSideProps = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/service/get-service-list";
    const response = await axios.get(url, { withCredentials: true });
    const services: ServiceListInterface[] = response.data.foundServices

    return {
        props: {
            services
        }
    }
}

const ServicesPage = ({ services }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <NavbarLayout>
                <ServiceList services = {services}/>
            </NavbarLayout>
        </>
    )
}

export default ServicesPage;