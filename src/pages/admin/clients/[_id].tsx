import NavbarLayout from "../../../Layouts/NavbarLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ClientDataInterface } from "../../../interfaces/ClientInterfaces";
import axios from "axios";
import ClientDetails from "../../../components/clients/ClientDetails";

export const getServerSideProps: GetServerSideProps<{ clientDetails: ClientDataInterface }> = async (context) => {
    const _id = context.params?._id;
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/get-client-details/" + _id;
    const response = await axios.get(url, { withCredentials: true });
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
                    allergies = {clientDetails.allergies}
                    skinType = {clientDetails.skinType}
                    usedCreams = {clientDetails.usedCreams}
                    baseInformation = {clientDetails.baseInformation}
                />
            </NavbarLayout>
        </>
    )
}

export default ClientDetailsPage;