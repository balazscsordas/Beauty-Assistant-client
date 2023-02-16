import React, { useContext, useState } from "react";
import { ServiceDataInterface } from '../../interfaces/ServiceInterfaces';
import Router from 'next/router';
import Box from '@mui/material/Box';
import axios from "axios";
import { Alert } from "../smallComponents/Alerts";
import DeleteDialog from "../smallComponents/DeleteDialog";
import FixFields from "./addNewService/FixFields";
import { trueIfLetterValidator } from "../smallComponents/InputValidators";
import DetailsWrapper from "../smallComponents/sectionWrappers/DetailsWrapper";
import LangContext from "../../context/LanguageProvider";

interface Props {
    serviceDataFromDatabase: ServiceDataInterface;
    categoryList: string[];
}

const ServiceDetails = ({ serviceDataFromDatabase, categoryList}: Props ) => {

    const { lang } = useContext(LangContext)

    const [serviceData, setServiceData] = useState<ServiceDataInterface>(serviceDataFromDatabase)
    const [newCategory, setNewCategory] = useState("");
    const [showPriceError, setShowPriceError] = useState(false);

    const [showSavingAlert, setShowSavingAlert] = useState(false);
    const [showSavingErrorAlert, setShowSavingErrorAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [showDeleteErrorAlert, setShowDeleteErrorAlert] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!showPriceError) {
            serviceData.category === 'Új kategória hozzáadása' || serviceData.category === 'Add new category' || categoryList.length === 1
                ? saveModifiedData({
                    name: serviceData.name,
                    category: newCategory,
                    price: serviceData.price,
                    time: serviceData.time,
                    description: serviceData.description,
                    steps: serviceData.steps,
                })
                : saveModifiedData(serviceData)
                
            setServiceData({
                name: "",
                category: "",   
                price: 0,
                time: 0,
                description: "",
                steps: "",
            })
            setNewCategory("");
        }
        setShowSaveButton(false)
    }

    // Save service in database API
    const saveModifiedData = async (newServiceData: ServiceDataInterface) => {
        const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/service/save-modified-service-data";
        const params = { newServiceData };
        const response = await axios.put(url, params, { withCredentials: true });
        if(response.status === 200) {
            setShowSavingAlert(true);
            Router.push('/admin/services');
        } 
        else {
            setShowSavingErrorAlert(true);
        }
    }

    // Delete service API
    const deleteServiceRequest = async (serviceId: string | undefined) => {
        const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/service/delete-service";
        const config = {
            data: { serviceId },
            withCredentials: true,
        }
        const response = await axios.delete(url, config);
        if(response.status === 200) {
            setShowDeleteAlert(true);
        } 
        else {
            setShowDeleteErrorAlert(true);
        }
    }

    // DELETE SERVICE
    const deleteService = () => {
        deleteServiceRequest(serviceData._id);
        Router.push('/admin/services');
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setServiceData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
        if (name === 'price') {
            if (trueIfLetterValidator(value) && value.length > 0) {
                setShowPriceError(true);
            } else {
                setShowPriceError(false);

            }
        }
        !showSaveButton && setShowSaveButton(true);
    }

    return (
        <section id="client-details-section">
            <Alert 
                open={showSavingAlert}
                onClose={() => setShowSavingAlert(false)}
                text={ lang === 'hun' ? "A változtatások mentése sikeres volt." : 'Succesfully saved the changes' }
                severity="success"
            />
            <Alert 
                open={showSavingErrorAlert}
                onClose={() => setShowSavingErrorAlert(false)}
                text={ lang === 'hun' ? "A változtatásokat sajnos nem sikerült elmenteni, kérjük próbáld újra később." : 'Something went wrong, please try again!' }
                severity="error"
            />
            
            <Alert 
                open={showDeleteAlert}
                onClose={() => setShowDeleteAlert(false)}
                text={ lang === 'hun' ? `${serviceData.name} eltávolítása a kliensek közül sikeres volt` : 'Something went wrong, please try again!' }
                severity="success"
            />
            <Alert 
                open={showDeleteErrorAlert}
                onClose={() => setShowDeleteErrorAlert(false)}
                text={ lang === 'hun' ? 'A szolgáltatás adatbázisból történő törlése nem sikerült!' : 'Something went wrong, please try again!' }
                severity="error"
            />

            <h1 className="page-title">{serviceData.name}</h1>
            <DetailsWrapper>
                <Box className="form" component="form" onSubmit={handleSubmit}>
                        <FixFields
                            inputData={serviceData}
                            setInputData={setServiceData}
                            categoryList={categoryList}
                            newCategory={newCategory}
                            setNewCategory={setNewCategory}
                            handleChange={handleInputChange}
                            showPriceError={showPriceError}
                        />
                    <DeleteDialog 
                        deleteLabel={ lang === 'hun' ? 'Biztosan törölni szeretnéd a kezelést?' : 'Do you really want to remove the service?' }
                        deleteFunction={deleteService}
                    />
                </Box>
            </DetailsWrapper>
        </section>
    )
}

export default ServiceDetails;