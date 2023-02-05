import { Box, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ClientContext from "../../../context/ClientProvider";
import LangContext from "../../../context/LanguageProvider";
import { ClientOptionNamesInterface } from "../../../interfaces/ClientInterfaces";
import { Alert } from "../../smallComponents/Alerts";
import { AddIconPrimaryButton, BasicSecondaryButton } from "../../smallComponents/Buttons";
import { OneLineNonReqInput } from "../../smallComponents/InputFields";

const AddNewClientOptionDialog = () => {

    const { lang } = useContext(LangContext);
    const { 
        clientOptionNames, 
        setClientOptionNames,
        openClientOptionDialog,
        setOpenClientOptionDialog
    } = useContext(ClientContext);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [localInputValues, setLocalInputValues] = useState(clientOptionNames);
    
    const sendClientOptionNamesToServer = async (newClientOptionNames: ClientOptionNamesInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/client/add-option-names";
            const params = { newClientOptionNames };
            const response = await axios.post(url, params, { withCredentials: true });
            if (response?.status === 201) {
                setShowSuccessAlert(true);
                setClientOptionNames(response.data.newClientOptionNames)
            }
        } catch(err) {
            setShowErrorAlert(true);
        }
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        sendClientOptionNamesToServer({
            option1Name: localInputValues.option1Name !== "" ? capitalizeFirstLetter(localInputValues.option1Name) : localInputValues.option1Name,
            option2Name: localInputValues.option2Name !== "" ? capitalizeFirstLetter(localInputValues.option2Name) : localInputValues.option2Name,
            option3Name: localInputValues.option3Name !== "" ? capitalizeFirstLetter(localInputValues.option3Name) : localInputValues.option3Name,
            option4Name: localInputValues.option4Name !== "" ? capitalizeFirstLetter(localInputValues.option4Name) : localInputValues.option4Name,
            option5Name: localInputValues.option5Name !== "" ? capitalizeFirstLetter(localInputValues.option5Name) : localInputValues.option5Name,
        })
        setOpenClientOptionDialog(false);
    }

    const handleCloseAlert = () => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
      };

    function capitalizeFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        setLocalInputValues(clientOptionNames);
    }, [clientOptionNames])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalInputValues(prevValues => {
            return {
                ...prevValues,
                [name]: value
            }
        })
    }

    return (
        <>
            <Alert 
                open={showSuccessAlert}
                onClose={handleCloseAlert}
                text={ lang === 'hun' ? "Mezők hozzáadása sikeres volt." : "Successfully added the fields" }
                severity="success"
            />
            <Alert 
                open={showErrorAlert}
                onClose={handleCloseAlert}
                text={ lang === 'hun' ? "Mezők hozzáadása nem sikerült." : "Something went wrong, please try again" }
                severity="error"
            />

            <Dialog open={openClientOptionDialog} onClose={() => setOpenClientOptionDialog(false)} id='dialog-section'>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>{ lang === 'hun' ? 'Mezők átnevezése' : 'Rename fields' }</DialogTitle>
                    <DialogContent>
                        <OneLineNonReqInput label={ lang === 'hun' ? 'Mező (1) neve' : 'Name of field (1)' } nameVal="option1Name" onChange={handleChange} value={localInputValues.option1Name}/>
                        <OneLineNonReqInput label={ lang === 'hun' ? 'Mező (2) neve' : 'Name of field (2)' } nameVal="option2Name" onChange={handleChange} value={localInputValues.option2Name}/>
                        <OneLineNonReqInput label={ lang === 'hun' ? 'Mező (3) neve' : 'Name of field (3)' } nameVal="option3Name" onChange={handleChange} value={localInputValues.option3Name}/>
                        <OneLineNonReqInput label={ lang === 'hun' ? 'Mező (4) neve' : 'Name of field (4)' } nameVal="option4Name" onChange={handleChange} value={localInputValues.option4Name}/>
                        <OneLineNonReqInput label={ lang === 'hun' ? 'Mező (5) neve' : 'Name of field (5)' } nameVal="option5Name" onChange={handleChange} value={localInputValues.option5Name}/>
                    </DialogContent>
                    <DialogActions>
                        <BasicSecondaryButton onClick={() => setOpenClientOptionDialog(false)} text={  lang === 'hun' ? "Mégse" : "Exit" }/>
                        <AddIconPrimaryButton text={ lang === 'hun' ? "Hozzáadás" : "Add" } type="submit"/>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}

export default AddNewClientOptionDialog;