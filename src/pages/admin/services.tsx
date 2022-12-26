"use client";

import NavbarLayout from "../../Layouts/NavbarLayout";
import ServicesList from "../../components/services/ServicesList";

const addNewClient = () => {
    return (
        <>
            <NavbarLayout>
                <ServicesList />
            </NavbarLayout>
        </>
    )
}

export default addNewClient;