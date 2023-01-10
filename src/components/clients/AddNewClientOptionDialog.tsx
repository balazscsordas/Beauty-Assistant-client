import { Box, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
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

    const option1NameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const option3NameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const option2NameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const option4NameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const option5NameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    
    const sendClientOptionNamesToServer = async (newClientOptionNames: ClientOptionNamesInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/client/add-option-names";
            const params = { newClientOptionNames };
            const response = await axios.post(url, params, { withCredentials: true });
            console.log(response);
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
            option1Name: capitalizeFirstLetter(option1NameRef.current.value),
            option2Name: capitalizeFirstLetter(option2NameRef.current.value),
            option3Name: capitalizeFirstLetter(option3NameRef.current.value),
            option4Name: capitalizeFirstLetter(option4NameRef.current.value),
            option5Name: capitalizeFirstLetter(option5NameRef.current.value),
        })
        setOpenAddClientOptionDialog(false);
        console.log(clientOptionNames);
    }

    const handleCloseAlert = () => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
      };

    function capitalizeFirstLetter(string: string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
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
                        <OneLineNonReqInput label='Mező (1) neve' nameVal="option1Name" inputRef={option1NameRef}/>
                        <OneLineNonReqInput label='Mező (2) neve' nameVal="option2Name" inputRef={option2NameRef}/>
                        <OneLineNonReqInput label='Mező (3) neve' nameVal="option3Name" inputRef={option3NameRef}/>
                        <OneLineNonReqInput label='Mező (4) neve' nameVal="option4Name" inputRef={option4NameRef}/>
                        <OneLineNonReqInput label='Mező (5) neve' nameVal="option5Name" inputRef={option5NameRef}/>
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