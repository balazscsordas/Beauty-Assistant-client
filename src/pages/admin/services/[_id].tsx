import NavbarLayout from "../../../Layouts/NavbarLayout";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ServiceDataInterface } from "../../../interfaces/ServiceInterfaces";
import axios from "axios";
import ServiceDetails from "../../../components/services/ServiceDetails";
import Head from "next/head";
import { useContext } from "react";
import LangContext from "../../../context/LanguageProvider";

export const getServerSideProps = async ( context: GetServerSidePropsContext ) => {
    const jwtCookie = context.req.headers.cookie;
    const options = {
        headers: {
            withCredentials: true,
            cookie: jwtCookie
        }
    }
    const _id = context.params?._id;
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/service/get-service-details/" + _id;
    const response = await axios.get(url, options);
    const serviceDataFromDatabase: ServiceDataInterface = response.data.foundService;
    const categoryList: string[] = response.data.categoryList

    return {
        props: {
            serviceDataFromDatabase,
            categoryList
        }
    }
}

const ClientDetailsPage = ({ serviceDataFromDatabase, categoryList }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { lang } = useContext(LangContext);
    
    return (
        <>
            <Head>
            <title>{ lang === 'hun' ? "Beauty Assistant | Szolgáltatás" : "Beauty Assistant | Service"}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavbarLayout>
                <ServiceDetails
                    serviceDataFromDatabase={serviceDataFromDatabase}
                    categoryList={categoryList}
                />
            </NavbarLayout>
        </>
    )
}

export default ClientDetailsPage;