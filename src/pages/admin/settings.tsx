import axios from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useContext } from "react";
import Settings from "../../components/settings/Settings";
import LangContext from "../../context/LanguageProvider";
import { SalonDataInterface } from "../../interfaces/SalonDataInterface";
import NavbarLayout from "../../Layouts/NavbarLayout";

export const getServerSideProps = async ( context: GetServerSidePropsContext ) => {
    const jwtCookie = context.req.headers.cookie;
    const options = {
        headers: {
            withCredentials: true,
            cookie: jwtCookie,
        }
    }
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/settings/get-salon-data";
    const response = await axios.get(url, options);
    const salonData: SalonDataInterface = response.data.salonData

    return {
        props: {
            salonData
        }
    }
}

const SettingsPage = ({ salonData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { lang } = useContext(LangContext);

    return (
        <>
            <Head>
            <title>{ lang === 'hun' ? "Beauty Assistant | Beállítások" : "Beauty Assistant | Settings"}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavbarLayout>
                <Settings salonData={salonData}/>
            </NavbarLayout>
        </>
    )
}

export default SettingsPage;