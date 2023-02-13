import axios from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useContext } from "react";
import GiftcardList from "../../components/giftcard/GiftcardList";
import { GiftcardProvider } from "../../context/GiftcardProvider";
import LangContext from "../../context/LanguageProvider";
import { GiftcardInterface } from "../../interfaces/GiftcardInterfaces";
import NavbarLayout from "../../Layouts/NavbarLayout";

const GiftcardPage = ({ giftcardList }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    const { lang } = useContext(LangContext);
    
    return (
        <>
            <Head>
            <title>{ lang === 'hun' ? "Beauty Assistant | Ajándékkártyák" : "Beauty Assistant | Giftcards"}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavbarLayout>
                <GiftcardProvider>
                    <GiftcardList giftcardList = {giftcardList}/>
                </GiftcardProvider>
            </NavbarLayout>
        </>
    )
}

export const getServerSideProps = async ( context: GetServerSidePropsContext ) => {
    const jwtCookie = context.req.headers.cookie;
    const options = {
        headers: {
            withCredentials: true,
            cookie: jwtCookie
        }
    }
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/giftcard/get-giftcard-list";
    const response = await axios.get(url, options);
    const giftcardList: GiftcardInterface[] = response.data.foundGiftcards;

    return {
        props: {
            giftcardList,
        }
    }
}

export default GiftcardPage;