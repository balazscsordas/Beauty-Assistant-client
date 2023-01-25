import NavbarLayout from "../../Layouts/NavbarLayout";
import AddNewService from "../../components/services/addNewService/AddNewService";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import axios from "axios";
import Head from "next/head";

export const getServerSideProps = async ( context: GetServerSidePropsContext ) => {
    const jwtCookie = context.req.headers.cookie;
    const options = {
        headers: {
            withCredentials: true,
            cookie: jwtCookie,
        }
    }
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/service/get-category-list";
    const response = await axios.get(url, options);
    const categoryList: string[] = response.data.categoryList

    return {
        props: {
            categoryList
        }
    }
}

const addNewService = ({ categoryList }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return (
        <>
            <Head>
            <title>Beauty Asszisztens | Szolgáltatás hozzáadása</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavbarLayout>
                <AddNewService categoryList={categoryList}/>
            </NavbarLayout>
        </>
    )
}

export default addNewService;