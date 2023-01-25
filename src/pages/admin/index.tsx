import Head from "next/head";
import Welcome from "../../components/adminIndex/Welcome";
import NavbarLayout from "../../Layouts/NavbarLayout";

const MainIndexPage = () => {

    return (
        <>
            <Head>
            <title>Beauty Asszisztens | Admin</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavbarLayout>
                <section id="admin-index-section">
                    <Welcome/>
                </section>
            </NavbarLayout>
        </>
    )
}


export default MainIndexPage;