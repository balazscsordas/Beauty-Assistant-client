import React, { useContext, useState } from "react";
import { Box } from '@mui/material';
import axios from "axios";
import { ClientDataInterface } from '../../../interfaces/ClientInterfaces';
import Router from 'next/router';
import { Alert } from "../../smallComponents/Alerts";
import { AddIconPrimaryButton } from "../../smallComponents/Buttons";
import AddNewClientOptionDialog from "./ClientOptionNamesDialog";
import { ageValidator, trueIfNumberValidator, mobileNumberValidator } from "../../smallComponents/InputValidators";
import OptionFields from "./OptionFields";
import FixFields from "./FixFields";
import DetailsWrapper from "../../smallComponents/sectionWrappers/DetailsWrapper";
import LangContext from "../../../context/LanguageProvider";

const AddClients = () => {

    const { lang } = useContext(LangContext);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [inputData, setInputData] = useState<ClientDataInterface>({
        name: "",
        age: "",
        email: "",
        mobileNumber: "",
        option1Content: "",
        option2Content: "",
        option3Content: "",
        option4Content: "",
        option5Content: "",
    })

    const [showNameError, setShowNameError] = useState(false);
    const [showAgeError, setShowAgeError] = useState(false);
    const [showMobileNumberError, setShowMobileNumberError] = useState(false);
    

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!showNameError && !showMobileNumberError && !showAgeError) {
            addNewClientToDatabase(inputData);
            setInputData({
                name: "",
                age: "",
                email: "",
                mobileNumber: "",
                option1Content: "",
                option2Content: "",
                option3Content: "",
                option4Content: "",
                option5Content: "",
            });
        }
    }

    const addNewClientToDatabase = async (clientData: ClientDataInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/client/add-new-client";
            const params = {clientData: clientData};
            const response = await axios.post(url, params, { withCredentials: true });
            if (response.data.message = "Client has been added") {
                setShowSuccessAlert(true);
                Router.push('/admin/clients');
            } else {
                setShowErrorAlert(true);
            }
        }
        catch (err) {
            err instanceof Error && console.log(err.message);
            setShowErrorAlert(true);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData(prevVal => {
            return {
                ...prevVal,
                [name]: value,
            }
        })
        if (name === 'name') {
            trueIfNumberValidator(value) ? setShowNameError(true): setShowNameError(false);
        }
        
        if (name === 'age') {
            ageValidator(value) ? setShowAgeError(true) : setShowAgeError(false);
        }
        if (name === 'mobileNumber') {
            mobileNumberValidator(value) ? setShowMobileNumberError(true) : setShowMobileNumberError(false);
        }
    }

    return (
        <section id="add-new-client-section">
            <Alert 
                open={showSuccessAlert}
                onClose={() => setShowSuccessAlert(false)}
                text="Vendég hozzáadása sikeres volt."
                severity="success"
            />
            <Alert 
                open={showErrorAlert}
                onClose={() => setShowErrorAlert(false)}
                text="Vendég hozzáadása nem sikerült."
                severity="error"
            />
            
            <>
                <h1 className="page-title">{ lang === 'hun' ? 'Vendég hozzáadása' : 'Add new client' }</h1>
                <DetailsWrapper>
                    <Box className="form" component="form" onSubmit={handleSubmit}>
                        <FixFields 
                            inputData={inputData}
                            handleChange={handleChange}
                            showAgeError={showAgeError}
                            showMobileNumberError={showMobileNumberError}
                            showNameError={showNameError}
                        />
                        <OptionFields 
                            inputData={inputData} 
                            handleChange={handleChange}
                        />
                        <div className="text-center m-4">
                            <AddIconPrimaryButton text={ lang === 'hun' ? 'Vendég hozzáadása' : 'Add new client' } type="submit"/>
                        </div>
                    </Box>
                </DetailsWrapper>
            </>
            <AddNewClientOptionDialog/>
        </section>
    )
}

export default AddClients;