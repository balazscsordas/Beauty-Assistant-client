import NavbarLayout from "../../Layouts/NavbarLayout";
import AddNewGiftcard from "../../components/giftcard/AddNewGiftcard";
import { GiftcardProvider } from "../../context/GiftcardProvider";
import Head from "next/head";
import { useContext } from "react";
import LangContext from "../../context/LanguageProvider";

const AddNewGiftcardPage = () => {

    const { lang } = useContext(LangContext);

    return (
        <>  
            <Head>
            <title>{ lang === 'hun' ? "Beauty Assistant | Ajándékkártya hozzáadása" : "Beauty Assistant | Add new giftcard"}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavbarLayout>
                <GiftcardProvider>
                    <AddNewGiftcard />
                </GiftcardProvider>
            </NavbarLayout>
        </>
    )
}

export default AddNewGiftcardPage;