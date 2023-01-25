import React, { useState } from "react";
import { Collapse, Box } from '@mui/material';
import { trueIfLetterValidator } from "../../smallComponents/InputValidators";
import axios from "axios";
import { ServiceDataInterface } from '../../../interfaces/ServiceInterfaces';
import Router from 'next/router';
import { Alert } from "../../smallComponents/Alerts";
import { MultilineNonReqInput } from "../../smallComponents/InputFields";
import { AddIconOptionButton, AddIconPrimaryButton } from "../../smallComponents/Buttons";
import FixFields from "./FixFields";
import DetailsWrapper from "../../smallComponents/sectionWrappers/DetailsWrapper";

interface Props {
    categoryList: string[];
}

const AddNewService = ({ categoryList }: Props) => {

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    const [inputData, setInputData] = useState<ServiceDataInterface>({
        name: "",
        category: "",   
        price: 0,
        time: 0,
        description: "",
        steps: "",
    })

    const [showPriceError, setShowPriceError] = useState(false);
    const [showSteps, setShowSteps] = useState(false);

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!showPriceError) {
            inputData.category === 'Új kategória hozzáadása' || categoryList.length === 1
                ? addNewServiceToDatabase({
                    name: inputData.name,
                    category: newCategory,
                    price: inputData.price,
                    time: inputData.time,
                    description: inputData.description,
                    steps: inputData.steps,

                })
                : addNewServiceToDatabase(inputData)
                
            setInputData({
                name: "",
                category: "",   
                price: 0,
                time: 0,
                description: "",
                steps: "",
            })
            setNewCategory("");
        }
    }

    const addNewServiceToDatabase = async (serviceData: ServiceDataInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/service/add-new-service";
            const params = {serviceData: serviceData};
            const response = await axios.post(url, params, { withCredentials: true });
            if (response.data.message = "Service has been added") {
                setShowSuccessAlert(true);
                Router.push('/admin/services');
            } else {
                setShowErrorAlert(true);
            }
        }
        catch (err) {
            setShowErrorAlert(true);
            err instanceof Error && console.log(err.message);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData(prevValues => {
            return {
                ...prevValues,
                [name]: value,
            }
        })
        if (name === 'price') {
            if (trueIfLetterValidator(value) && value.length > 0) {
                setShowPriceError(true);
            } else {
                setShowPriceError(false);

            }
        }
    }

    return (
        <section id="add-new-client-section">
            <Alert 
                open={showSuccessAlert}
                onClose={() => setShowSuccessAlert(false)}
                text="Szolgáltatás hozzáadása sikeres volt."
                severity="success"
            />
            <Alert 
                open={showErrorAlert}
                onClose={() => setShowErrorAlert(false)}
                text="Szolgáltatás hozzáadása nem sikerült."
                severity="error"
            />

            <>
                <h1 className="page-title">Szolgáltatás hozzáadása</h1>
                <DetailsWrapper>
                    <Box className="form" component="form" onSubmit={handleSubmit}>
                        <FixFields
                            inputData={inputData}
                            setInputData={setInputData}
                            categoryList={categoryList}
                            newCategory={newCategory}
                            setNewCategory={setNewCategory}
                            handleChange={handleChange}
                            showPriceError={showPriceError}
                        />
                        
                        <div className="text-center my-4">
                            <AddIconOptionButton onClick={() => setShowSteps(!showSteps)} text="Lépések"/>
                        </div>
                        <div className="text-center">
                            <Collapse in={showSteps}>
                                <MultilineNonReqInput onChange={handleChange} value={inputData.steps} label="Lépések" nameVal="steps"/>
                            </Collapse>
                        </div>
                        <div className="text-center my-4">
                            <AddIconPrimaryButton text='Szolgáltatás hozzáadása' type="submit"/>
                        </div>
                    </Box>
                </DetailsWrapper>
            </>
        </section>
    )
}

export default AddNewService;