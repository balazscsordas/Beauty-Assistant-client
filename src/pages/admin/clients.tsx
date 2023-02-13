import ClientList from "../../components/clients/ClientList";
import NavbarLayout from "../../Layouts/NavbarLayout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ClientListInterface, ClientOptionNamesInterface } from "../../interfaces/ClientInterfaces";
import axios from "axios";
import ClientContext from "../../context/ClientProvider";
import { useContext, useEffect } from "react";
import Head from "next/head";
import LangContext from "../../context/LanguageProvider";

export const getServerSideProps = async ( context: GetServerSidePropsContext ) => {
    const jwtCookie = context.req.headers.cookie;
    const options = {
        headers: {
            withCredentials: true,
            cookie: jwtCookie
        }
    }
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/client/get-client-list";
    const response = await axios.get(url, options);
    const clientsList: ClientListInterface[] = response.data.foundClients;
    const clientOptionNames: ClientOptionNamesInterface = response.data.clientOptionNamesWithoutId;

    return {
        props: {
            clientsList,
            clientOptionNames
        }
    }
}

const ClientsPage = ({ clientsList, clientOptionNames }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { setClients, setClientOptionNames } = useContext(ClientContext);
    const { lang } = useContext(LangContext);

    useEffect(() => {
        setClients(clientsList);
        setClientOptionNames(clientOptionNames);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Head>
            <title>{ lang === 'hun' ? "Beauty Assistant | Vendégek" : "Beauty Assistant | Clients"}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavbarLayout>
                <ClientList clientsList = {clientsList}/>
            </NavbarLayout>
        </>
    )
}



export default ClientsPage;