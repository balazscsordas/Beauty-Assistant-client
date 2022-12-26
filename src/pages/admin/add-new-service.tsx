import NavbarLayout from "../../Layouts/NavbarLayout";
import AddNewService from "../../components/services/AddNewService";

const addNewClient = () => {
    return (
        <>
            <NavbarLayout>
                <AddNewService />
            </NavbarLayout>
        </>
    )
}

export default addNewClient;