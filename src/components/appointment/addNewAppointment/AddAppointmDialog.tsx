import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import AppointmentContext from "../../../context/AppointmentProvider";
import { NewAppointmentInterface } from "../../../interfaces/AppointmentInterfaces";
import { getNamedDay, getNamedMonth, getNumberedDay } from '../Utils';
import ClientSearchbar from "./searchbars/ClientSearchbar";
import ServiceSearchbar from "./searchbars/ServiceSearchbar";
import { Alert } from "../../smallComponents/Alerts";
import { AddIconPrimaryButton, BasicSecondaryButton } from "../../smallComponents/Buttons";
import { MultilineNonReqInput, OneLineNonReqInput } from "../../smallComponents/InputFields";
import LangContext from "../../../context/LanguageProvider";

const AddAppointmentDialog = () => {

    const { lang } = useContext(LangContext);
    const { 
        newAppointmentData, 
        setNewAppointmentData,
        openAddAppointmentDialog, 
        setOpenAddAppointmentDialog, 
        setCurrentWeekAppointments
    } = useContext(AppointmentContext);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    
    const sendNewAppointmentDataToServer = async (data: NewAppointmentInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/appointment/add-new-appointment";
            const params = {data};
            const response = await axios.post(url, params, { withCredentials: true });
            if (response?.status === 200) {
                setShowSuccessAlert(true);
                const savedAppointment = response.data.savedAppointment;
                setCurrentWeekAppointments(prevValues => prevValues && [...prevValues, savedAppointment])
            }
        } catch(err) {
            setShowErrorAlert(true);
            console.log(err);
        }
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (newAppointmentData.clientId !== "" && newAppointmentData.serviceId !== "") {
            setOpenAddAppointmentDialog(false);
            sendNewAppointmentDataToServer(newAppointmentData);
            resetNewAppointmentData();
        }
    }

    const resetNewAppointmentData = () => {
        setNewAppointmentData(prevValues => {
            return {
                ...prevValues,
                clientId: "",
                serviceId: "",
                discount: "",
                commentForAdmin: "",
                commentForClient: "",
            }
        })
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

    const closeDialog = () => {
        setOpenAddAppointmentDialog(false);
        resetNewAppointmentData();
    }

    return (
        <>
            <Alert 
                open={showSuccessAlert}
                onClose={handleCloseAlert}
                text={ lang === 'hun' ? "Foglalás hozzáadása sikeres volt." : 'Successfully added the appointment.'}
                severity="success"
            />
            <Alert 
                open={showErrorAlert}
                onClose={handleCloseAlert}
                text={ lang === 'hun' ? "Foglalás hozzáadása nem sikerült." : 'Something went wrong, please try again.'}
                severity="error"
            />

            <Dialog open={openAddAppointmentDialog} onClose={closeDialog} fullWidth className="text-center">
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>{ lang === 'hun' ? 'Időpont hozzáadása' : "Add new appointment" }</DialogTitle>
                    <DialogContent>
                        <DialogContentText className="mb-6">
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
                            <OneLineNonReqInput onChange={handleChange} label={ lang === 'hun' ? 'Kedvezmény (%)' : "Discount (%)" } nameVal="discount" value={newAppointmentData.discount}/>
                            <MultilineNonReqInput onChange={handleChange} label={ lang === 'hun' ? 'Megjegyzés (vendég nem látja)' : "Comment for you (client can't see)" } nameVal="commentForAdmin" value={newAppointmentData.commentForAdmin}/>
                            <MultilineNonReqInput onChange={handleChange} label={ lang === 'hun' ? 'Megjegyzés a vendég részére' : 'Comment for the client'} nameVal="commentForClient" value={newAppointmentData.commentForClient}/>
                    </DialogContent>
                    <DialogActions className="justify-center mb-4">
                        <BasicSecondaryButton onClick={closeDialog} text={ lang === 'hun' ? 'Mégse' : 'exit' }/>
                        <AddIconPrimaryButton text={ lang === 'hun' ? 'Hozzáadás' : 'add appointment' } type="submit"/>
                    </DialogActions>
                </Box>
            </Dialog>
        </>
    )
}

export default AddAppointmentDialog;