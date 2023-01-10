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
import { AddIconOptionButton, BasicPrimaryButton, BasicSecondaryButton } from "../smallComponents/Buttons";
import { MultilineNonReqInput, OneLineReqAutoFocusInput, OneLineReqInput } from "../smallComponents/InputFields";
import { Alert } from "../smallComponents/Alerts";

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
            <Alert 
                open={showSavingAlert}
                onClose={handleCloseSavingAlert}
                text="A változtatások mentése sikeres volt."
                severity="success"
            />
            <Alert 
                open={showSavingErrorAlert}
                onClose={handleCloseSavingErrorAlert}
                text="A változtatásokat sajnos nem sikerült elmenteni, kérjük próbáld újra később."
                severity="error"
            />
            
            <Alert 
                open={showDeleteAlert}
                onClose={handleCloseDeleteAlert}
                text={`${props.name} eltávolítása a kliensek közül sikeres volt`}
                severity="success"
            />
            <Alert 
                open={showDeleteErrorAlert}
                onClose={handleCloseDeleteErrorAlert}
                text="A kliens adatbázisból történő törlése nem sikerült."
                severity="error"
            />

            <h1 className="page-title">{props.name}</h1>
            <Box className="form" component="form" onSubmit={saveService}>
                <Container>
                    <Row>
                        <Col lg={3}>
                            <OneLineReqAutoFocusInput onChange={handleInputChange} value={serviceData.name} label="Név" nameVal="name"/>
                        </Col>
                        <Col lg={3}>
                            <OneLineReqInput onChange={handleInputChange} value={serviceData.category} label="Kategória" nameVal="category"/>
                        </Col>
                        <Col lg={3}>
                            <OneLineReqInput onChange={handleInputChange} value={serviceData.price} label="Ár (Ft)" nameVal="price"/>
                        </Col>
                        <Col lg={3}>
                            <OneLineReqInput onChange={handleInputChange} value={serviceData.time} label="Időtartam (Perc)" nameVal="time"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="section-options-buttons">
                            <AddIconOptionButton onClick={() => setShowSteps(!showSteps)} text="Lépések"/>
                            <AddIconOptionButton onClick={() => setShowDescription(!showDescription)} text="Leírás"/>
                        </Col>
                    </Row>
                    <div className="options-fields">
                        <Collapse in={showDescription}>
                            <MultilineNonReqInput value={serviceData.description} onChange={handleInputChange} nameVal="description" label="Leírás"/>
                        </Collapse>
                        <Collapse in={showSteps}>
                            <MultilineNonReqInput value={serviceData.steps} onChange={handleInputChange} nameVal="steps" label="Lépések"/>
                        </Collapse>
                    </div>
                </Container>
                <div className="buttons-block">
                    <BasicSecondaryButton onClick={handleOpenDialog} text="Törlés"/>
                    <BasicPrimaryButton type="submit" text="Mentés"/>
                    <Dialog
                        open={deleteDialogOpen}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Biztosan törölni szeretnéd a kezelést?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <BasicSecondaryButton onClick={handleCloseDialog} text="Nem"/>
                            <BasicPrimaryButton onClick={deleteService} text="Igen"/>
                        </DialogActions>
                    </Dialog>
                </div>
            </Box>
        </section>
    )
}

export default ServiceDetails;