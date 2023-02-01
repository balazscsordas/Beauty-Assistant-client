import { Box, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
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
import { trueIfLetterValidator } from "../../smallComponents/InputValidators";
import LangContext from "../../../context/LanguageProvider";

const EditAppointmentDialog = () => {

    const { lang } = useContext(LangContext);
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
    const [showDiscountError, setShowDiscountError] = useState(false);

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
        sendEditedAppointmentDataToServer(editAppointmentData);
        setOpenEditAppointmentDialog(false);
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
        if (name === 'discount') {
            if (trueIfLetterValidator(value)) {
                setShowDiscountError(true);
            } else {
                setShowDiscountError(false);
            }
        }
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
                text={ lang === 'hun' ? "Foglalás módosítása sikeres volt." : 'Successfully saved the changes.'}
                severity="success"
            />
            <Alert 
                open={showErrorAlert}
                onClose={handleCloseAlert}
                text={ lang === 'hun' ? "Foglalás módosítása nem sikerült." : 'Something went wrong, please try again.'}
                severity="error"
            />
            <Alert 
                open={showDeleteSuccessAlert}
                onClose={handleCloseAlert}
                text={ lang === 'hun' ? "Foglalás törlése sikeres volt." : 'Successfully deleted the appointment'}
                severity="success"
            />
            <Alert 
                open={showDeleteErrorAlert}
                onClose={handleCloseAlert}
                text={ lang === 'hun' ? "Foglalás törlése nem sikerült." : 'Something went wrong, please try again.'}
                severity="error"
            />

            <Dialog open={openEditAppointmentDialog} onClose={() => setOpenEditAppointmentDialog(false)} fullWidth className="text-center">
                <Box component="form" onSubmit={handleSubmit}>
                    <DialogTitle>{ lang === 'hun' ? 'Időpont módosítása' : "Edit appointment" }</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div className="mb-8">
                                {
                                    new Date(editAppointmentData.date).getFullYear() 
                                    + '. ' + getNamedMonth(editAppointmentData.date) 
                                    + ' ' + getNumberedDay(editAppointmentData.date) 
                                    + '. ' + getNamedDay(editAppointmentData.date)
                                    + ' ' + editAppointmentData.time
                                }
                            </div>
                        </DialogContentText>
                            <StatusChanger/>
                            <ClientSearchbar/>
                            <ServiceSearchbar/>
                            <OneLineNonReqInput onChange={handleChange} label={ lang === 'hun' ? 'Kedvezmény (%)' : "Discount (%)" } nameVal="discount" value={editAppointmentData.discount}/>
                            <Collapse in={showDiscountError}>
                                <p className="input-error-text">{ lang === 'hun' ? 'Kizárólag 0 és 100 közötti számot tartalmazhat.' : 'Only numbers between 0-100 are allowed' }</p>
                            </Collapse>
                            <MultilineNonReqInput onChange={handleChange} label={ lang === 'hun' ? 'Megjegyzés (vendég nem látja)' : "Comment for you (client can't see)" } nameVal="commentForAdmin" value={editAppointmentData.commentForAdmin}/>
                            <MultilineNonReqInput onChange={handleChange} label={ lang === 'hun' ? 'Megjegyzés a vendég részére' : 'Comment for the client'} nameVal="commentForClient" value={editAppointmentData.commentForClient}/>
                    </DialogContent>
                    <DialogActions>
                        <div className="flex justify-center mx-auto mb-4">
                            <BasicSecondaryButton onClick={() => setOpenEditAppointmentDialog(false)} text={ lang === 'hun' ? 'Mégse' : 'exit' }/>
                            <BasicSecondaryButton onClick={() => setDeleteDialogOpen(true)} text={ lang === 'hun' ? 'Törlés' : 'delete' }/>
                            <AddIconPrimaryButton text={ lang === 'hun' ? 'Módosítás' : 'Save' } type="submit"/>
                        </div>
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
                    { lang === 'hun' ? 'Biztosan törölni szeretnéd a foglalást?' : 'Do you really want to delete the appointment?' }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                        <BasicSecondaryButton onClick={() => {setDeleteDialogOpen(false)}} text={ lang === 'hun' ? 'Nem' : 'Igen' }/>
                        <BasicPrimaryButton onClick={handleDeleteAppointment} text={ lang === 'hun' ? 'Igen' : 'Nem' }/>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditAppointmentDialog;