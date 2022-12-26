import React, { useState, useRef, useContext } from "react";
import Container from 'react-bootstrap/Container';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ClientDataInterface } from '../../interfaces/ClientInterfaces';


const AddClients = () => {

    // States + Refs
    const [showAlert, setShowAlert] = useState(false);
    const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const allergiesRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const usedCreamsRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const skinTypeRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const baseInformationRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [inputData, setInputData] = useState({
        name: "",
        age: "",
        mobileNumber: ""
    })

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newClient: ClientDataInterface = {
            name: nameRef.current.value,
            age: inputData.age,
            mobileNumber: inputData.mobileNumber,
            allergies: allergiesRef.current.value,
            skinType: skinTypeRef.current.value,
            usedCreams: usedCreamsRef.current.value,
            baseInformation: baseInformationRef.current.value,
        }
        addNewClientToDatabase(newClient);
        setInputData({
            name: "",
            age: "",
            mobileNumber: ""
        })
        nameRef.current.value = "";
        skinTypeRef.current.value = "";
        baseInformationRef.current.value = "";
        allergiesRef.current.value = "";
        usedCreamsRef.current.value = "";
    }

    const addNewClientToDatabase = async (clientData: ClientDataInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/add-new-client";
            const params = {clientData: clientData};
            const response = await axios.post(url, params, { withCredentials: true });
            console.log(response.data.message);
            if (response.data.message = "Client has been added") {
                setShowAlert(true);
            }
        }
        catch (err) {
            err instanceof Error && console.log(err.message);
        }
    }

    const changeInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if(!value || ( value[value.length-1].match('[0-9]') && value[0].match('[1-9]'))) {
            if (value.length < 3) {
                setInputData(prevData => {
                    return {
                        ...prevData,
                        [name]: value
                    }
                })
            }
        }
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
      };

    return (
        <section id="add-new-client-section">
            <Snackbar 
                open={showAlert} 
                autoHideDuration={3000} 
                onClose={handleCloseAlert}
                >
                <MuiAlert 
                    onClose={handleCloseAlert} 
                    elevation={6}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    New client has been added!
                </MuiAlert>
            </Snackbar>

            <>
                <h1 className="section-title">Vendég hozzáadása</h1>
                <Box className="form" component="form" onSubmit={handleSubmit}>
                    <Container>
                        <Row>
                            <Col lg={4}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    inputRef={nameRef}
                                    id="name"
                                    label="Név"
                                    name="name"
                                    autoFocus
                                    autoComplete="name"
                                />
                            </Col>
                            <Col lg={4}>
                                <TextField
                                    className="age-input"
                                    margin="normal"
                                    required
                                    fullWidth
                                    onChange={changeInputData}
                                    value={inputData.age}
                                    id="age"
                                    label="Kor"
                                    name="age"
                                    autoComplete="age"
                                />
                            </Col>
                            <Col lg={4}>
                                <TextField
                                    margin="normal"
                                    required
                                    type="tel"
                                    fullWidth
                                    onChange={changeInputData}
                                    value={inputData.mobileNumber}
                                    id="mobileNumber"
                                    label="Telefonszám"
                                    name="mobileNumber"
                                    autoComplete="tel"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="section-options-buttons">
                                <Button variant="contained" startIcon={<AddCircleOutlineIcon />}>Allergia</Button>
                                <Button variant="contained" startIcon={<AddCircleOutlineIcon />}>Bőrtípus</Button>
                                <Button variant="contained" startIcon={<AddCircleOutlineIcon />}>Otthon használt készítmények</Button>
                                <Button variant="contained" startIcon={<AddCircleOutlineIcon />}>Általános információk</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <TextField
                                    margin="normal"
                                    minRows={4}
                                    fullWidth
                                    multiline
                                    inputRef={allergiesRef}
                                    id="allergies"
                                    label="Allergiák"
                                    name="allergies"
                                />
                                
                            </Col>
                            <Col lg={6}>
                                <TextField
                                    margin="normal"
                                    minRows={4}
                                    fullWidth
                                    multiline
                                    inputRef={skinTypeRef}
                                    id="skinType"
                                    label="Bőrtípus"
                                    name="skinType"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={6}>
                                <TextField
                                    margin="normal"
                                    minRows={4}
                                    fullWidth
                                    multiline
                                    inputRef={usedCreamsRef}
                                    id="usedCreams"
                                    label="Otthon használt készítmények"
                                    name="usedCreams"
                                />
                            </Col>
                            <Col lg={6}>
                                <TextField
                                    margin="normal"
                                    minRows={4}
                                    fullWidth
                                    multiline
                                    inputRef={baseInformationRef}
                                    id="baseInformation"
                                    label="Általános információk"
                                    name="baseInformation"
                                />
                            </Col>
                        </Row>
                    </Container>
                        <div className="button-block">
                            <Button 
                                type="submit"
                                className="add-new-client-button" 
                                variant="outlined" 
                                startIcon={<AddCircleOutlineIcon />}>
                                Vendég hozzáadása
                            </Button>
                        </div>
                </Box>
            </>
        </section>
    )
}

export default AddClients;