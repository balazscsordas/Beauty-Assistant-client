import NavbarLayout from "../../Layouts/NavbarLayout";
import AddNewGiftcard from "../../components/giftcard/AddNewGiftcard";
import { GiftcardProvider } from "../../context/GiftcardProvider";

const AddNewGiftcardPage = () => {

    return (
        <>
            <NavbarLayout>
                <GiftcardProvider>
                    <AddNewGiftcard />
                </GiftcardProvider>
            </NavbarLayout>
        </>
    )
}

export default AddNewGiftcardPage;