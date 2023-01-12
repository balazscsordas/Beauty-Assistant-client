import { Box, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import ClientContext from "../../context/ClientProvider";
import { ClientOptionNamesInterface } from "../../interfaces/ClientInterfaces";
import { Alert } from "../smallComponents/Alerts";
import { AddIconPrimaryButton, BasicSecondaryButton } from "../smallComponents/Buttons";
import { OneLineNonReqInput } from "../smallComponents/InputFields";

const AddNewClientOptionDialog = () => {

    const { 
        clientOptionNames, 
        setClientOptionNames,
        openAddClientOptionDialog,
        setOpenAddClientOptionDialog
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
            console.log(err);
        }
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        sendClientOptionNamesToServer({
            option1Name: capitalizeFirstLetter(localInputValues.option1Name),
            option2Name: capitalizeFirstLetter(localInputValues.option2Name),
            option3Name: capitalizeFirstLetter(localInputValues.option3Name),
            option4Name: capitalizeFirstLetter(localInputValues.option4Name),
            option5Name: capitalizeFirstLetter(localInputValues.option5Name),
        })
        setOpenAddClientOptionDialog(false);
    }

    const handleCloseAlert = () => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
      };

    function capitalizeFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

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
                text="Mezők hozzáadása sikeres volt."
                severity="success"
            />
            <Alert 
                open={showErrorAlert}
                onClose={handleCloseAlert}
                text="Mezők hozzáadása nem sikerült."
                severity="error"
            />

            <Dialog open={openAddClientOptionDialog} onClose={() => setOpenAddClientOptionDialog(false)} id='dialog-section'>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>Mezők hozzáadása</DialogTitle>
                    <DialogContent>
                        <OneLineNonReqInput label='Mező (1) neve' nameVal="option1Name" onChange={handleChange} value={localInputValues.option1Name}/>
                        <OneLineNonReqInput label='Mező (2) neve' nameVal="option2Name" onChange={handleChange} value={localInputValues.option2Name}/>
                        <OneLineNonReqInput label='Mező (3) neve' nameVal="option3Name" onChange={handleChange} value={localInputValues.option3Name}/>
                        <OneLineNonReqInput label='Mező (4) neve' nameVal="option4Name" onChange={handleChange} value={localInputValues.option4Name}/>
                        <OneLineNonReqInput label='Mező (5) neve' nameVal="option5Name" onChange={handleChange} value={localInputValues.option5Name}/>
                    </DialogContent>
                    <DialogActions>
                        <BasicSecondaryButton onClick={() => setOpenAddClientOptionDialog(false)} text="Mégse"/>
                        <AddIconPrimaryButton text="Hozzáadás" type="submit"/>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}

export default AddNewClientOptionDialog;