import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";
import axios from "axios";
import MuiAlert from '@mui/material/Alert';
import { useContext, useState } from "react";
import AppointmentContext from "../../context/AppointmentProvider";
import { NewAppointmentInterface } from "../../interfaces/AppointmentInterfaces";
import { getNamedDay, getNamedMonth, getNumberedDay } from '../appointment/Utils';
import ClientSearchbar from "./searchbars/ClientSearchbar";
import ServiceSearchbar from "./searchbars/ServiceSearchbar";

const AddAppointmentDialog = () => {

    const { 
        newAppointmentData,
        openAddAppointmentDialog,
        setOpenAddAppointmentDialog,
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
            }
        } catch(err) {
            setShowErrorAlert(true);
            console.log(err);
        }
    }

    const handleSubmit = () => {
        setOpenAddAppointmentDialog(false);
        sendNewAppointmentDataToServer(newAppointmentData);
    }

    return (
        <>
            <Snackbar 
                open={showSuccessAlert} 
                autoHideDuration={3000} 
                onClose={() => setShowSuccessAlert(false)}
                >
                <MuiAlert 
                    onClose={() => setShowSuccessAlert(false)} 
                    elevation={6}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    Foglalás hozzáadása sikeres volt.
                </MuiAlert>
            </Snackbar>

            <Snackbar 
                open={showErrorAlert} 
                autoHideDuration={3000} 
                onClose={() => setShowErrorAlert}
                >
                <MuiAlert 
                    onClose={() => setShowErrorAlert} 
                    elevation={6}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    A foglalás hozzáadása sajnos nem sikerült.
                </MuiAlert>
            </Snackbar>

            <Dialog open={openAddAppointmentDialog} onClose={() => setOpenAddAppointmentDialog(false)} id='dialog-section'>
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
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setOpenAddAppointmentDialog(false)}>Mégse</Button>
                <Button onClick={handleSubmit}>Hozzáadás</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AddAppointmentDialog;