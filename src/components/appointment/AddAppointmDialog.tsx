import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useContext } from "react";
import AppointmentContext from "../../context/AppointmentProvider";
import { combineMinuteWithHours, getNamedDay, getNamedMonth, getNumberedDay } from '../appointment/Utils';
import ClientSearchbar from "./searchbars/ClientSearchbar";

const AddAppointmentDialog = () => {

    const { 
        openAddAppointmentDialog,
        setOpenAddAppointmentDialog,
        addAppointmHour,
        addAppointmMinute,
        addAppointmDate
    } = useContext(AppointmentContext);

    const handleClose = () => {
        setOpenAddAppointmentDialog(false);
      };


    return (
        <Dialog open={openAddAppointmentDialog} onClose={handleClose} id='dialog-section'>
            <DialogTitle>Időpont hozzáadása</DialogTitle>
            <DialogContent>
            <DialogContentText className='dialog-context-text'>
                <p>{addAppointmDate.getFullYear() + '. ' + getNamedMonth(addAppointmDate) + ' ' + getNumberedDay(addAppointmDate) + '. ' + getNamedDay(addAppointmDate)}</p>
                <p>{combineMinuteWithHours(addAppointmHour, addAppointmMinute)}</p>
            </DialogContentText>
                <ClientSearchbar/>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Mégse</Button>
            <Button onClick={handleClose}>Hozzáadás</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddAppointmentDialog;