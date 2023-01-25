import NavbarLayout from "../../Layouts/NavbarLayout";
import AddNewGiftcard from "../../components/giftcard/AddNewGiftcard";
import { GiftcardProvider } from "../../context/GiftcardProvider";
import Head from "next/head";

const AddNewGiftcardPage = () => {

    return (
        <>  
            <Head>
            <title>Beauty Asszisztens | Ajándékkártya hozzáadása</title>
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