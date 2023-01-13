import NavbarLayout from "../../../Layouts/NavbarLayout";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ServiceDataInterface } from "../../../interfaces/ServiceInterfaces";
import axios from "axios";
import ServiceDetails from "../../../components/services/ServiceDetails";

export const getServerSideProps: GetServerSideProps<{ serviceDetails: ServiceDataInterface }> = async ( context: GetServerSidePropsContext ) => {
    const jwtCookie = context.req.headers.cookie;
    const options = {
        headers: {
            withCredentials: true,
            cookie: jwtCookie
        }
    }
    const _id = context.params?._id;
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/service/get-service-details/" + _id;
    const response = await axios.get(url, options);
    const serviceDetails: ServiceDataInterface = response.data.foundService;

    return {
        props: {
            serviceDetails
        }
    }
}

const ClientDetailsPage = ({ serviceDetails }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <NavbarLayout>
                <ServiceDetails
                    _id = {serviceDetails._id}
                    name = {serviceDetails.name}
                    category = {serviceDetails.category}
                    price = {serviceDetails.price}
                    time = {serviceDetails.time}
                    description = {serviceDetails.description}
                    steps = {serviceDetails.steps}
                />
            </NavbarLayout>
        </>
    )
}

export default ClientDetailsPage;