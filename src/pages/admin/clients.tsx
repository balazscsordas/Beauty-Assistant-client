import ClientList from "../../components/clients/ClientList";
import NavbarLayout from "../../Layouts/NavbarLayout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ClientListInterface } from "../../interfaces/ClientInterfaces";
import axios from "axios";

export const getServerSideProps: GetServerSideProps<{ clients: ClientListInterface[] }> = async (context) => {
    const { req, res } = context;
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/get-client-list";
    const response = await axios.get(url, { withCredentials: true });
    const clients: ClientListInterface[] = response.data.foundClients

    return {
        props: {
            clients
        }
    }
}

const ClientsPage = ({ clients }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <NavbarLayout>
                <ClientList clients={clients}
                />
            </NavbarLayout>
        </>
    )
}

export default ClientsPage;