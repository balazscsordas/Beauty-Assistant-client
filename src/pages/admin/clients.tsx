import ClientList from "../../components/clients/ClientList";
import NavbarLayout from "../../Layouts/NavbarLayout";
import { InferGetServerSidePropsType } from "next";
import { ClientListInterface, ClientOptionNamesInterface } from "../../interfaces/ClientInterfaces";
import axios from "axios";
import ClientContext from "../../context/ClientProvider";
import { useContext, useEffect } from "react";

const ClientsPage = ({ clientsList, clientOptionNames }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setClients, setClientOptionNames } = useContext(ClientContext);

    useEffect(() => {
        setClients(clientsList);
        setClientOptionNames(clientOptionNames);
    }, [])

    return (
        <>
            <NavbarLayout>
                <ClientList clientsList = {clientsList}/>
            </NavbarLayout>
        </>
    )
}

export const getServerSideProps = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/client/get-client-list";
    const response = await axios.get(url, { withCredentials: true });
    /* const response = await axios.get(url, { withCredentials: true , headers: { "Authorization": "Bearer abcd"}}); */
    const clientsList: ClientListInterface[] = response.data.foundClients;
    const clientOptionNames: ClientOptionNamesInterface = response.data.clientOptionNamesWithoutId;

    return {
        props: {
            clientsList,
            clientOptionNames
        }
    }
}

export default ClientsPage;