import ClientDetails from "../../components/clients/ClientDetails";
import NavbarLayout from "../../Layouts/NavbarLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ClientDataInterface } from "../../interfaces/ClientInterfaces";
import axios from "axios";

export const getServerSideProps: GetServerSideProps<{ clients: ClientDataInterface }> = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/get-client-data";
    const response = await axios.get(url, { params: { clientId: "20" }});
    const clientData: ClientDataInterface = response.data.clientData

    return {
        props: {
            clientData
        }
    }
}

const ClientsPage = ({ clientData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <NavbarLayout>
                <ClientDetails clientData={clientData}
                />
            </NavbarLayout>
        </>
    )
}

export default ClientsPage;