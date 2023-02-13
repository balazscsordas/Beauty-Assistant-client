import NavbarLayout from "../../Layouts/NavbarLayout";
import AddNewClient from "../../components/clients/addNewClient/AddNewClient";
import Head from "next/head";
import { useContext } from "react";
import LangContext from "../../context/LanguageProvider";

const AddNewClientPage = () => {

    const { lang } = useContext(LangContext);

    return (
        <>
            <Head>
            <title>{ lang === 'hun' ? "Beauty Assistant | Vendég hozzáadása" : "Beauty Assistant | Add new client"}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavbarLayout>
                <AddNewClient />
            </NavbarLayout>
        </>
    )
}

export default AddNewClientPage;