import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import React, { useContext, useState } from "react";
import AppointmentContext from "../../context/AppointmentProvider";
import { NewAppointmentInterface } from "../../interfaces/AppointmentInterfaces";
import { getNamedDay, getNamedMonth, getNumberedDay } from '../appointment/Utils';
import ClientSearchbar from "./searchbars/ClientSearchbar";
import ServiceSearchbar from "./searchbars/ServiceSearchbar";
import { Alert } from "../smallComponents/Alerts";
import { AddIconPrimaryButton, BasicSecondaryButton } from "../smallComponents/Buttons";
import { MultilineNonReqInput, OneLineNonReqInput } from "../smallComponents/InputFields";

const AddAppointmentDialog = () => {

    const { newAppointmentData, openAddAppointmentDialog, setOpenAddAppointmentDialog, setNewAppointmentData } = useContext(AppointmentContext);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    
    const sendNewAppointmentDataToServer = async (data: NewAppointmentInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/appointment/add-new-appointment";
            const params = {data};
            const response = await axios.post(url, params, { withCredentials: true });
            if (response?.status === 200) {
                setShowSuccessAlert(true);
                console.log(response.data.savedAppointment);
            }
        } catch(err) {
            setShowErrorAlert(true);
            console.log(err);
        }
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setOpenAddAppointmentDialog(false);
        sendNewAppointmentDataToServer(newAppointmentData);
    }

    const handleCloseAlert = () => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAppointmentData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    return (
        <>
            <Alert 
                open={showSuccessAlert}
                onClose={handleCloseAlert}
                text="Foglalás hozzáadása sikeres volt."
                severity="success"
            />
            <Alert 
                open={showErrorAlert}
                onClose={handleCloseAlert}
                text="Foglalás hozzáadása nem sikerült."
                severity="error"
            />

            <Dialog open={openAddAppointmentDialog} onClose={() => setOpenAddAppointmentDialog(false)} id='dialog-section'>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>Időpont hozzáadása</DialogTitle>
                    <DialogContent>
                        <DialogContentText className='dialog-context-text'>
                            {
                                newAppointmentData.date.getFullYear() 
                                + '. ' + getNamedMonth(newAppointmentData.date) 
                                + ' ' + getNumberedDay(newAppointmentData.date) 
                                + '. ' + getNamedDay(newAppointmentData.date)
                                + ' ' + newAppointmentData.time
                            }
                        </DialogContentText>
                            <ClientSearchbar/>
                            <ServiceSearchbar/>
                            <OneLineNonReqInput onChange={handleChange} label='Kedvezmény' nameVal="discount" value={newAppointmentData.discount}/>
                            <MultilineNonReqInput onChange={handleChange} label='Megjegyzés (vendég nem látja)' nameVal="commentForAdmin" value={newAppointmentData.commentForAdmin}/>
                            <MultilineNonReqInput onChange={handleChange} label='Megjegyzés a vendég részére' nameVal="commentForClient" value={newAppointmentData.commentForClient}/>
                    </DialogContent>
                    <DialogActions>
                        <BasicSecondaryButton onClick={() => setOpenAddAppointmentDialog(false)} text="Mégse"/>
                        <AddIconPrimaryButton text="Hozzáadás" type="submit"/>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}

export default AddAppointmentDialog;