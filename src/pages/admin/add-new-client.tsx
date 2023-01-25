import NavbarLayout from "../../Layouts/NavbarLayout";
import AddNewClient from "../../components/clients/addNewClient/AddNewClient";
import Head from "next/head";

const AddNewClientPage = () => {

    return (
        <>
            <Head>
            <title>Beauty Asszisztens | Vendég hozzáadása</title>
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