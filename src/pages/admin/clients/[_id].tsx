import NavbarLayout from "../../../Layouts/NavbarLayout";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ClientDataInterface } from "../../../interfaces/ClientInterfaces";
import axios from "axios";
import ClientDetails from "../../../components/clients/ClientDetails";

export const getServerSideProps: GetServerSideProps<{ clientDetails: ClientDataInterface }> = async ( context: GetServerSidePropsContext) => {
    const jwtCookie = context.req.headers.cookie;
    const options = {
        headers: {
            withCredentials: true,
            cookie: jwtCookie
        }
    }
    const _id = context.params?._id;
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/client/get-client-details/" + _id;
    const response = await axios.get(url, options);
    const clientDetails: ClientDataInterface = response.data.foundClient;

    return {
        props: {
            clientDetails
        }
    }
}

const ClientDetailsPage = ({ clientDetails }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <NavbarLayout>
                <ClientDetails
                    _id = {clientDetails._id}
                    name = {clientDetails.name}
                    age = {clientDetails.age}
                    mobileNumber = {clientDetails.mobileNumber}
                    email = {clientDetails.email}
                    option1Content = {clientDetails.option1Content}
                    option2Content = {clientDetails.option2Content}
                    option3Content = {clientDetails.option3Content}
                    option4Content = {clientDetails.option4Content}
                    option5Content = {clientDetails.option5Content}
                />
            </NavbarLayout>
        </>
    )
}

export default ClientDetailsPage;