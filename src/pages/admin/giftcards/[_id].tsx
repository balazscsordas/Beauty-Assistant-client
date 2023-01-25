import NavbarLayout from "../../../Layouts/NavbarLayout";
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { GiftcardInterface } from "../../../interfaces/GiftcardInterfaces";
import axios from "axios";
import GiftcardDetails from "../../../components/giftcard/GiftcardDetails";
import { GiftcardProvider } from "../../../context/GiftcardProvider";
import Head from "next/head";

export const getServerSideProps: GetServerSideProps<{ giftcardDetails: GiftcardInterface }> = async ( context: GetServerSidePropsContext ) => {
    const jwtCookie = context.req.headers.cookie;
    const options = {
        headers: {
            withCredentials: true,
            cookie: jwtCookie
        }
    }
    const _id = context.params?._id;
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/giftcard/get-giftcard-details/" + _id;
    const response = await axios.get(url, options);
    const giftcardDetails: GiftcardInterface = response.data.foundGiftcard;

    return {
        props: {
            giftcardDetails
        }
    }
}

const ClientDetailsPage = ({ giftcardDetails }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return (
        <>
            <Head>
            <title>Beauty Asszisztens | Ajándékkártya</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <GiftcardProvider>
                <NavbarLayout>
                    <GiftcardDetails
                        _id = {giftcardDetails._id}
                        status = {giftcardDetails.status}
                        identifier = {giftcardDetails.identifier}
                        amount = {giftcardDetails.amount}
                        startDate = {new Date(giftcardDetails.startDate)}
                        endDate = {new Date(giftcardDetails.endDate)}
                    />
                </NavbarLayout>
            </GiftcardProvider>
        </>
    )
}

export default ClientDetailsPage;