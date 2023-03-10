import React, { useContext, useState } from "react";
import { ClientDataInterface } from '../../interfaces/ClientInterfaces';
import Router from 'next/router';
import Box from '@mui/material/Box';
import axios from "axios";
import { Alert } from "../smallComponents/Alerts";
import DeleteDialog from "../smallComponents/DeleteDialog";
import FixFields from "./addNewClient/FixFields";
import { ageValidator, mobileNumberValidator, trueIfNumberValidator } from "../smallComponents/InputValidators";
import AddNewClientOptionDialog from "./addNewClient/ClientOptionNamesDialog";
import DetailsWrapper from "../smallComponents/sectionWrappers/DetailsWrapper";
import LangContext from "../../context/LanguageProvider";

const ClientDetails = (props: ClientDataInterface) => {

    const { lang } = useContext(LangContext);
    const [clientData, setClientData] = useState<ClientDataInterface>({
        _id: props._id,
        name: props.name,
        age: props.age,
        email: props.email,
        mobileNumber: props.mobileNumber,
        option1Content: props.option1Content,
        option2Content: props.option2Content,
        option3Content: props.option3Content,
        option4Content: props.option4Content,
        option5Content: props.option5Content,
    })

    const [showSavingAlert, setShowSavingAlert] = useState(false);
    const [showSavingErrorAlert, setShowSavingErrorAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [showDeleteErrorAlert, setShowDeleteErrorAlert] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);

    const [showNameError, setShowNameError] = useState(false);
    const [showAgeError, setShowAgeError] = useState(false);
    const [showMobileNumberError, setShowMobileNumberError] = useState(false);

    const saveClient = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        saveModifiedData(clientData);
        setShowSaveButton(false);
    }

    // Save client in database API
    const saveModifiedData = async (newClientData: ClientDataInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/client/save-modified-client-data";
            const params = { newClientData };
            const response = await axios.put(url, params, { withCredentials: true });
            if(response.status === 200) {
                setShowSavingAlert(true);
                Router.push('/admin/clients');
            } 
        } catch(err) {
            setShowSavingErrorAlert(true);
        }
    }

    // Delete client API
    const deleteClientRequest = async (clientId: string | undefined) => {
        const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/client/delete-client";
        const options = {
            data: { clientId },
            withCredentials: true,
        }
        const response = await axios.delete(url, options);
        if(response.status === 200) {
            setShowDeleteAlert(true);
        } 
        else {
            setShowDeleteErrorAlert(true);
        }
    }

    // DELETE CLIENT
    const deleteClient = () => {
        deleteClientRequest(props._id);
        Router.push('/admin/clients');
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClientData(prevVal => {
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
        !showSaveButton && setShowSaveButton(true);
    }
    
    return (
        <section id="client-details-section data-details-section">
            <Alert 
                open={showSavingAlert}
                onClose={() => setShowSavingAlert(false)}
                text={ lang === 'hun' ? "A v??ltoztat??sok ment??se sikeres volt." : 'Succesfully saved the changes' }
                severity="success"
            />
            <Alert 
                open={showSavingErrorAlert}
                onClose={() => setShowSavingErrorAlert(false)}
                text={ lang === 'hun' ? "A v??ltoztat??sokat sajnos nem siker??lt elmenteni, k??rj??k pr??b??ld ??jra k??s??bb." : 'Something went wrong, please try again!' }
                severity="error"
            />
            
            <Alert 
                open={showDeleteAlert}
                onClose={() => setShowDeleteAlert(false)}
                text={ lang === 'hun' ? `${props.name} elt??vol??t??sa a kliensek k??z??l sikeres volt.` : `Successfully removed ${props.name} from your client list.`}
                severity="success"
            />
            <Alert 
                open={showDeleteErrorAlert}
                onClose={() => setShowDeleteErrorAlert(false)}
                text={ lang === 'hun' ? "A kliens adatb??zisb??l t??rt??n?? t??rl??se nem siker??lt." : 'Something went wrong, please try again!' }
                severity="error"
            />
            
            <h1 className="page-title">{props.name}</h1>
            <DetailsWrapper>
                <Box className="form" component="form" onSubmit={saveClient}>
                    <FixFields 
                        inputData={clientData}
                        handleChange={handleChange}
                        showAgeError={showAgeError}
                        showMobileNumberError={showMobileNumberError}
                        showNameError={showNameError}
                    />
                    <DeleteDialog 
                        deleteLabel={lang === 'hun' ? `Biztosan el szeretn??d t??vol??tani ${props.name}-t a klienseid k??z??l?` : `Do you really want to remove ${props.name} from your client list?`}
                        deleteFunction={deleteClient}
                    />
                </Box>
                <AddNewClientOptionDialog/>
            </DetailsWrapper>
        </section>
    )
}

export default ClientDetails;