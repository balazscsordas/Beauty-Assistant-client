import React, { useState, useRef } from "react";
import { ServiceDataInterface } from '../../interfaces/ServiceInterfaces';
import TextField from '@mui/material/TextField';
import Zoom from '@mui/material/Zoom';
import { Button, Collapse, InputAdornment } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Container, Row, Col } from "react-bootstrap";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Router from 'next/router';
import Box from '@mui/material/Box';
import axios from "axios";

const ServiceDetails = (props: ServiceDataInterface) => {

    const [serviceData, setServiceData] = useState<ServiceDataInterface>({
        _id: props._id,
        name: props.name,
        category: props.category,
        price: props.price,
        time: props.time,
        description: props.description,
        steps: props.steps
    })

    const [showSavingAlert, setShowSavingAlert] = useState(false);
    const [showSavingErrorAlert, setShowSavingErrorAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [showDeleteErrorAlert, setShowDeleteErrorAlert] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);

    // States for show or hide textfields

    const [showDescription, setShowDescription] = useState(props.description ? true : false);
    const [showSteps, setShowSteps] = useState(props.steps ? true : false);

    const saveService = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        saveModifiedData(serviceData);
        setShowSaveButton(false);
    }

    // Save service in database API

    const saveModifiedData = async (newServiceData: ServiceDataInterface) => {
        const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/service/save-modified-service-data";
        const params = { newServiceData: newServiceData};
        const response = await axios.put(url, params, { withCredentials: true });
        if(response.status === 200) {
            setShowSavingAlert(true);
        } 
        else {
            setShowSavingErrorAlert(true);
        }
    }

    // Delete service API
    const deleteServiceRequest = async (serviceId: string | undefined) => {
        const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/service/delete-service";
        const config = {
            data: { serviceId },
            withCredentials: true,
        }
        const response = await axios.delete(url, config);
        console.log(response);
        if(response.status === 200) {
            setShowDeleteAlert(true);
        } 
        else {
            setShowDeleteErrorAlert(true);
        }
    }

    // Delete service

    const deleteService = () => {
        deleteServiceRequest(props._id);
        setDeleteDialogOpen(false);
        Router.push('/admin/services');
    }

    // Dialogs + Alerts states

    const handleCloseSavingAlert = () => {
        setShowSavingAlert(false);
      };

    const handleCloseSavingErrorAlert = () => {
        setShowSavingErrorAlert(false);
    }

    const handleCloseDeleteAlert = () => {
        setShowDeleteAlert(false);
      };

    const handleCloseDeleteErrorAlert = () => {
      setShowDeleteErrorAlert(false);
    };

    const handleCloseDialog = () => {
        setDeleteDialogOpen(false);
    }

    const handleOpenDialog = () => {
        setDeleteDialogOpen(true);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setServiceData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
        !showSaveButton && setShowSaveButton(true);
    }

    return (
        <section id="client-details-section">
            <Snackbar 
                open={showSavingAlert} 
                autoHideDuration={3000} 
                onClose={handleCloseSavingAlert}
                >
                <MuiAlert 
                    onClose={handleCloseSavingAlert} 
                    elevation={6}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    A változtatások mentése sikeres volt.
                </MuiAlert>
            </Snackbar>

            <Snackbar 
                open={showSavingErrorAlert} 
                autoHideDuration={3000} 
                onClose={handleCloseSavingErrorAlert}
                >
                <MuiAlert 
                    onClose={handleCloseSavingErrorAlert} 
                    elevation={6}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    A változtatásokat sajnos nem sikerült elmenteni, kérjük próbáld újra később.
                </MuiAlert>
            </Snackbar>
            
            <Snackbar 
                open={showDeleteAlert} 
                autoHideDuration={3000} 
                onClose={handleCloseDeleteAlert}
                >
                <MuiAlert 
                    onClose={handleCloseDeleteAlert} 
                    elevation={6}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    {props.name} eltávolítása a klienseid közül sikeres volt.
                </MuiAlert>
            </Snackbar>

            <Snackbar 
                open={showDeleteErrorAlert} 
                autoHideDuration={3000} 
                onClose={handleCloseDeleteErrorAlert}
                >
                <MuiAlert 
                    onClose={handleCloseDeleteErrorAlert} 
                    elevation={6}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    A kliens adatbázisból történő törlése nem sikerült.
                </MuiAlert>
            </Snackbar>

            <h1 className="page-title">{props.name}</h1>
            <Box className="form" component="form" onSubmit={saveService}>
                <Container>
                    <Row>
                        <Col lg={3}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                onChange={handleInputChange}
                                value={serviceData.name}
                                id="name"
                                label="Név"
                                name="name"
                            />
                        </Col>
                        <Col lg={3}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={serviceData.category}
                                onChange={handleInputChange}
                                id="category"
                                label="Kategória"
                                name="category"
                            />
                        </Col>
                        <Col lg={3}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={serviceData.price}
                                onChange={handleInputChange}
                                id="price"
                                label="Ár"
                                name="price"
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Ft</InputAdornment>,
                                }}
                            />
                        </Col>
                        <Col lg={3}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={serviceData.time}
                                onChange={handleInputChange}
                                id="time"
                                label="Időtartam"
                                name="time"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="section-options-buttons">
                            <Button
                                variant="contained"
                                onClick={() => setShowSteps(!showSteps)}
                                startIcon={!showSteps ? <AddCircleOutlineIcon/> : <RemoveCircleOutlineIcon/>}>Otthon használt készítmények
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => setShowDescription(!showDescription)}
                                startIcon={!showDescription ? <AddCircleOutlineIcon/> : <RemoveCircleOutlineIcon/>}>Általános információk
                            </Button>
                        </Col>
                    </Row>
                    <div className="options-fields">
                        <Collapse in={showDescription}>
                            <TextField
                                margin="normal"
                                minRows={4}
                                fullWidth
                                multiline
                                value={serviceData.description}
                                onChange={handleInputChange}
                                id="description"
                                label="Leírás"
                                name="description"
                            />
                        </Collapse>
                        <Collapse in={showSteps}>
                            <TextField
                                margin="normal"
                                minRows={4}
                                fullWidth
                                multiline
                                value={serviceData.steps}
                                onChange={handleInputChange}
                                id="steps"
                                label="Lépések"
                                name="steps"
                            />
                        </Collapse>
                    </div>
                </Container>
                <div className="buttons-block">
                    <Zoom in={showSaveButton}>
                        <Button type="submit" variant="outlined">Save</Button>
                    </Zoom>
                    <Button onClick={handleOpenDialog} variant="outlined">Delete</Button>
                    <Dialog
                        open={deleteDialogOpen}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            Biztosan el szeretnéd távolítani {props.name}-t a klienseid közül?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Nem</Button>
                            <Button onClick={deleteService} autoFocus>Igen</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Box>
        </section>
    )
}

export default ServiceDetails;