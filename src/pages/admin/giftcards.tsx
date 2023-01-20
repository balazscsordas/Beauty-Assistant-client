import GiftcardList from "../../components/giftcard/GiftcardList";
import { GiftcardProvider } from "../../context/GiftcardProvider";
import NavbarLayout from "../../Layouts/NavbarLayout";

const GiftcardPage = () => {
    return (
        <>
            <NavbarLayout>
                <GiftcardProvider>
                    <GiftcardList/>
                </GiftcardProvider>
            </NavbarLayout>
        </>
    )
}

export default GiftcardPage;