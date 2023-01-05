import ClientList from "../../components/clients/ClientList";
import NavbarLayout from "../../Layouts/NavbarLayout";
import { InferGetServerSidePropsType } from "next";
import { ClientListInterface } from "../../interfaces/ClientInterfaces";
import axios from "axios";
import ClientContext from "../../context/ClientProvider";
import { useContext } from "react";

export const getServerSideProps = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/client/get-client-list";
    const response = await axios.get(url, { withCredentials: true });
    /* const response = await axios.get(url, { withCredentials: true , headers: { "Authorization": "Bearer abcd"}}); */
    const clientsList: ClientListInterface[] = response.data.foundClients;

    return {
        props: {
            clientsList
        }
    }
}

const ClientsPage = ({ clientsList }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setClients } = useContext(ClientContext);
    setClients(clientsList);

    return (
        <>
            <NavbarLayout>
                <ClientList />
            </NavbarLayout>
        </>
    )
}

export default ClientsPage;