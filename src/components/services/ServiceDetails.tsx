import React, { useState } from "react";
import { ServiceDataInterface } from '../../interfaces/ServiceInterfaces';
import { Collapse } from '@mui/material';
import Router from 'next/router';
import Box from '@mui/material/Box';
import axios from "axios";
import { AddIconOptionButton } from "../smallComponents/Buttons";
import { MultilineNonReqInput } from "../smallComponents/InputFields";
import { Alert } from "../smallComponents/Alerts";
import DeleteDialog from "../smallComponents/DeleteDialog";
import FixFields from "./addNewService/FixFields";
import { trueIfLetterValidator } from "../smallComponents/InputValidators";
import DetailsWrapper from "../smallComponents/sectionWrappers/DetailsWrapper";

interface Props {
    serviceDataFromDatabase: ServiceDataInterface;
    categoryList: string[];
}

const ServiceDetails = ({ serviceDataFromDatabase, categoryList}: Props ) => {

    const [serviceData, setServiceData] = useState<ServiceDataInterface>(serviceDataFromDatabase)
    const [newCategory, setNewCategory] = useState("");
    const [showPriceError, setShowPriceError] = useState(false);

    const [showSavingAlert, setShowSavingAlert] = useState(false);
    const [showSavingErrorAlert, setShowSavingErrorAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [showDeleteErrorAlert, setShowDeleteErrorAlert] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);

    // States for show or hide textfields

    const [showSteps, setShowSteps] = useState(serviceData.steps ? true : false);

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!showPriceError) {
            serviceData.category === 'Új kategória hozzáadása' || categoryList.length === 1
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
                text="A változtatások mentése sikeres volt."
                severity="success"
            />
            <Alert 
                open={showSavingErrorAlert}
                onClose={() => setShowSavingErrorAlert(false)}
                text="A változtatásokat sajnos nem sikerült elmenteni, kérjük próbáld újra később."
                severity="error"
            />
            
            <Alert 
                open={showDeleteAlert}
                onClose={() => setShowDeleteAlert(false)}
                text={`${serviceData.name} eltávolítása a kliensek közül sikeres volt`}
                severity="success"
            />
            <Alert 
                open={showDeleteErrorAlert}
                onClose={() => setShowDeleteErrorAlert(false)}
                text="A kliens adatbázisból történő törlése nem sikerült."
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
                        <div>
                            <Collapse in={showSteps}>
                                <MultilineNonReqInput value={serviceData.steps} onChange={handleInputChange} nameVal="steps" label="Lépések"/>
                            </Collapse>
                        </div>
                        <div className="text-center my-4">
                            <AddIconOptionButton onClick={() => setShowSteps(!showSteps)} text="Lépések"/>
                        </div>
                    <DeleteDialog 
                        deleteLabel={`Biztosan törölni szeretnéd a kezelést?`}
                        deleteFunction={deleteService}
                    />
                </Box>
            </DetailsWrapper>
        </section>
    )
}

export default ServiceDetails;