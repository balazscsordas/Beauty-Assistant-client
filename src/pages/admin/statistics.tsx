import NavbarLayout from "../../Layouts/NavbarLayout";
import Statistics from "../../components/statistics/Statistics";
import Head from "next/head";

const StatisticsPage = () => {
    return (
        <>
            <Head>
            <title>Beauty Asszisztens | Statisztikák</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavbarLayout>
                <Statistics/>
            </NavbarLayout>
        </>
    )
}

export default StatisticsPage;