import React, { useState, useRef } from "react";
import { ClientDataInterface } from '../../interfaces/ClientInterfaces';
import TextField from '@mui/material/TextField';
import Zoom from '@mui/material/Zoom';
import { Button, Collapse } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Container, Row, Col } from "react-bootstrap";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Router from 'next/router';
import Box from '@mui/material/Box';
import axios from "axios";

const ClientDetails = (props: ClientDataInterface) => {

    console.log(props);

    const [clientData, setClientData] = useState<ClientDataInterface>({
        _id: props._id,
        name: props.name,
        mobileNumber: props.mobileNumber,
        age: props.age,
        baseInformation: props.baseInformation,
        allergies: props.allergies,
        skinType: props.skinType,
        usedCreams: props.usedCreams
    })

    const [showSavingAlert, setShowSavingAlert] = useState(false);
    const [showSavingErrorAlert, setShowSavingErrorAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [showDeleteErrorAlert, setShowDeleteErrorAlert] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);

    // States for show or hide textfields

    const [showAllergies, setShowAllergies] = useState(props.allergies ? true : false);
    const [showSkinType, setShowSkinType] = useState(props.skinType ? true : false);
    const [showUsedCreams, setShowUsedCreams] = useState(props.usedCreams ? true : false);
    const [showBaseInformation, setShowBaseInformation] = useState(props.baseInformation ? true : false);

    const saveClient = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        saveModifiedData(clientData);
        setShowSaveButton(false);
    }

    // Save client in database API

    const saveModifiedData = async (newClientData: ClientDataInterface) => {
        const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/save-modified-client-data";
        const params = { newClientData: newClientData};
        const response = await axios.put(url, params, { withCredentials: true });
        if(response.status === 204) {
            setShowSavingAlert(true);
        } 
        else {
            setShowSavingErrorAlert(true);
        }
    }

    // Delete client API

    const deleteClientRequest = async (clientId: string | undefined) => {
        const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/delete-client";
        const config = {
            data: { clientId },
            withCredentials: true,
        }
        const response = await axios.delete(url, config);
        console.log(response);
        if(response.status === 204) {
            setShowDeleteAlert(true);
        } 
        else {
            setShowDeleteErrorAlert(true);
        }
    }

    // Delete client

    const deleteClient = () => {
        deleteClientRequest(props._id);
        setDeleteDialogOpen(false);
        Router.push('/admin/clients');
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
        setClientData(prevData => {
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

            <h1 className="section-title">{props.name}</h1>
            <Box className="form" component="form" onSubmit={saveClient}>
                <Container>
                    <Row>
                        <Col lg={4}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                onChange={handleInputChange}
                                value={clientData.name}
                                id="name"
                                label="Név"
                                name="name"
                            />
                        </Col>
                        <Col lg={4}>
                            <TextField
                                className="age-input"
                                margin="normal"
                                required
                                fullWidth
                                value={clientData.age}
                                onChange={handleInputChange}
                                id="age"
                                label="Kor"
                                name="age"
                            />
                        </Col>
                        <Col lg={4}>
                            <TextField
                                margin="normal"
                                required
                                type="tel"
                                fullWidth
                                value={clientData.mobileNumber}
                                onChange={handleInputChange}
                                id="mobileNumber"
                                label="Telefonszám"
                                name="mobileNumber"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="section-options-buttons">
                            <Button 
                                variant="contained" 
                                onClick={() => setShowAllergies(!showAllergies)} 
                                startIcon={!showAllergies ? <AddCircleOutlineIcon/> : <RemoveCircleOutlineIcon/>}>Allergia
                                </Button>
                            <Button 
                                variant="contained"
                                onClick={() => setShowSkinType(!showSkinType)}
                                startIcon={!showSkinType ? <AddCircleOutlineIcon/> : <RemoveCircleOutlineIcon/>}>Bőrtípus
                                </Button>
                            <Button
                                variant="contained"
                                onClick={() => setShowUsedCreams(!showUsedCreams)}
                                startIcon={!showUsedCreams ? <AddCircleOutlineIcon/> : <RemoveCircleOutlineIcon/>}>Otthon használt készítmények
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => setShowBaseInformation(!showBaseInformation)}
                                startIcon={!showBaseInformation ? <AddCircleOutlineIcon/> : <RemoveCircleOutlineIcon/>}>Általános információk
                            </Button>
                        </Col>
                    </Row>
                    <div className="options-fields">
                        <Collapse in={showAllergies}>
                            <TextField
                                margin="normal"
                                minRows={4}
                                fullWidth
                                multiline
                                value={clientData.allergies}
                                onChange={handleInputChange}
                                id="allergies"
                                label="Allergiák"
                                name="allergies"
                            />
                        </Collapse>
                        <Collapse in={showSkinType}>
                            <TextField
                                margin="normal"
                                minRows={4}
                                fullWidth
                                multiline
                                value={clientData.skinType}
                                onChange={handleInputChange}
                                id="skinType"
                                label="Bőrtípus"
                                name="skinType"
                            />
                        </Collapse>
                        <Collapse in={showUsedCreams}>
                            <TextField
                                margin="normal"
                                minRows={4}
                                fullWidth
                                multiline
                                value={clientData.usedCreams}
                                onChange={handleInputChange}
                                id="usedCreams"
                                label="Otthon használt készítmények"
                                name="usedCreams"
                            />
                        </Collapse>
                        <Collapse in={showBaseInformation}>
                            <TextField
                                margin="normal"
                                minRows={4}
                                fullWidth
                                multiline
                                value={clientData.baseInformation}
                                onChange={handleInputChange}
                                id="baseInformation"
                                label="Általános információk"
                                name="baseInformation"
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
                            <Button onClick={deleteClient} autoFocus>Igen</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Box>
        </section>
    )
}

export default ClientDetails;