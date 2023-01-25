import Head from "next/head";
import Settings from "../../components/settings/Settings";
import NavbarLayout from "../../Layouts/NavbarLayout";

const MainIndexPage = () => {

    return (
        <>
            <Head>
            <title>Beauty Asszisztens | Beállítások</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavbarLayout>
                <Settings/>
            </NavbarLayout>
        </>
    )
}

export default MainIndexPage;