import axios from "axios";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import GiftcardList from "../../components/giftcard/GiftcardList";
import { GiftcardProvider } from "../../context/GiftcardProvider";
import { GiftcardInterface } from "../../interfaces/GiftcardInterfaces";
import NavbarLayout from "../../Layouts/NavbarLayout";

const GiftcardPage = ({ giftcardList }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
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