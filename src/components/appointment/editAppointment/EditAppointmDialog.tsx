import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import AppointmentContext from "../../../context/AppointmentProvider";
import { AppointmentInterface } from "../../../interfaces/AppointmentInterfaces";
import { getNamedDay, getNamedMonth, getNumberedDay } from '../Utils';
import ClientSearchbar from "./editAppointmSearchbars/ClientSearchbar";
import ServiceSearchbar from "./editAppointmSearchbars/ServiceSearchbar";
import { Alert } from "../../smallComponents/Alerts";
import { AddIconPrimaryButton, BasicPrimaryButton, BasicSecondaryButton } from "../../smallComponents/Buttons";
import { MultilineNonReqInput, OneLineNonReqInput } from "../../smallComponents/InputFields";
import StatusChanger from "./StatusChanger";

const EditAppointmentDialog = () => {

    const { 
        editAppointmentData, 
        setEditAppointmentData,
        openEditAppointmentDialog, 
        setOpenEditAppointmentDialog,
        setCurrentWeekAppointments,
        currentWeekAppointments
    } = useContext(AppointmentContext);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showDeleteSuccessAlert, setShowDeleteSuccessAlert] = useState(false);
    const [showDeleteErrorAlert, setShowDeleteErrorAlert] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const sendEditedAppointmentDataToServer = async (data: AppointmentInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/appointment/edit-appointment";
            const params = { data };
            const response = await axios.put(url, params, { withCredentials: true });
            if (response?.status === 200) {
                const updatedAppointmentList = currentWeekAppointments?.map((appointment) => {
                    if (appointment._id === data._id) {
                        return data
                    } else {
                        return appointment;
                    }
                });
                updatedAppointmentList && setCurrentWeekAppointments(updatedAppointmentList);
                setShowSuccessAlert(true);
            }
        } catch(err) {
            setShowErrorAlert(true);
            console.log(err);
        }
    }

    const deleteAppointment = async (appointmentId: string) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/appointment/delete-appointment";
            const config = {
                data: { appointmentId },
                withCredentials: true,
            }
            const response = await axios.delete(url, config);
            if (response.status === 200) {
                setShowDeleteSuccessAlert(true);
                const updatedAppointmentList = currentWeekAppointments?.filter(appointment => appointment._id !== appointmentId);
                updatedAppointmentList && setCurrentWeekAppointments(updatedAppointmentList);
            }
        } catch (err) {
            setShowDeleteErrorAlert(true);
            console.log(err);
        }
    }

    const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setOpenEditAppointmentDialog(false);
        sendEditedAppointmentDataToServer(editAppointmentData);
    }

    const handleCloseAlert = () => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
        setShowDeleteSuccessAlert(false);
        setShowDeleteErrorAlert(false);
      };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditAppointmentData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const handleDeleteAppointment = () => {
        deleteAppointment(editAppointmentData._id);
        setDeleteDialogOpen(false);
        setOpenEditAppointmentDialog(false);
    }

    return (
        <>
            <Alert 
                open={showSuccessAlert}
                onClose={handleCloseAlert}
                text="Foglalás módosítása sikeres volt."
                severity="success"
            />
            <Alert 
                open={showErrorAlert}
                onClose={handleCloseAlert}
                text="Foglalás módosítása nem sikerült."
                severity="error"
            />
            <Alert 
                open={showDeleteSuccessAlert}
                onClose={handleCloseAlert}
                text="Foglalás módosítása sikeres volt."
                severity="success"
            />
            <Alert 
                open={showDeleteErrorAlert}
                onClose={handleCloseAlert}
                text="Foglalás módosítása nem sikerült."
                severity="error"
            />

            <Dialog open={openEditAppointmentDialog} onClose={() => setOpenEditAppointmentDialog(false)} id='dialog-section'>
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>Időpont szerkesztése</DialogTitle>
                    <DialogContent>
                        <DialogContentText className='dialog-context-text'>
                            {
                                new Date(editAppointmentData.date).getFullYear() 
                                + '. ' + getNamedMonth(editAppointmentData.date) 
                                + ' ' + getNumberedDay(editAppointmentData.date) 
                                + '. ' + getNamedDay(editAppointmentData.date)
                                + ' ' + editAppointmentData.time
                            }
                        </DialogContentText>
                            <StatusChanger/>
                            <ClientSearchbar/>
                            <ServiceSearchbar/>
                            <OneLineNonReqInput onChange={handleChange} label='Kedvezmény (%)' nameVal="discount" value={editAppointmentData.discount}/>
                            <MultilineNonReqInput onChange={handleChange} label='Megjegyzés (vendég nem látja)' nameVal="commentForAdmin" value={editAppointmentData.commentForAdmin}/>
                            <MultilineNonReqInput onChange={handleChange} label='Megjegyzés a vendég részére' nameVal="commentForClient" value={editAppointmentData.commentForClient}/>
                    </DialogContent>
                    <DialogActions>
                        <BasicSecondaryButton onClick={() => setOpenEditAppointmentDialog(false)} text="Mégse"/>
                        <BasicSecondaryButton onClick={() => setDeleteDialogOpen(true)} text="Törlés"/>
                        <AddIconPrimaryButton text="Módosítás" type="submit"/>
                    </DialogActions>
                </Box>
            </Dialog>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => {setDeleteDialogOpen(false)}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Biztosan törölni szeretnéd a foglalást?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <BasicSecondaryButton onClick={() => {setDeleteDialogOpen(false)}} text="Nem"/>
                    <BasicPrimaryButton onClick={handleDeleteAppointment} text="Igen"/>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditAppointmentDialog;