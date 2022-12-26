import NavbarLayout from "../../Layouts/NavbarLayout";
import AddNewClient from "../../components/clients/AddNewClient";

const addNewClient = () => {
    return (
        <>
            <NavbarLayout>
                <AddNewClient />
            </NavbarLayout>
        </>
    )
}

export default addNewClient;