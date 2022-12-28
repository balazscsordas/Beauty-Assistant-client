import React, { useState, useRef, useContext } from "react";
import Container from 'react-bootstrap/Container';
import { Button, Collapse, TextField, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ClientDataInterface } from '../../interfaces/ClientInterfaces';
import Router from 'next/router';

const AddClients = () => {

    // States + Refs
    const [showAlert, setShowAlert] = useState(false);
    const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const allergiesRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const mobileNumberRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const usedCreamsRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const skinTypeRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const baseInformationRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [inputData, setInputData] = useState({
        age: "",
    })

    // States for show or hide textfields
    const [showAllergies, setShowAllergies] = useState(false);
    const [showSkinType, setShowSkinTypes] = useState(false);
    const [showUsedCreams, setShowUsedCreams] = useState(false);
    const [showBaseInformation, setShowBaseInformation] = useState(false);

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newClient: ClientDataInterface = {
            name: nameRef.current.value,
            age: inputData.age,
            mobileNumber: mobileNumberRef.current.value,
            allergies: allergiesRef.current.value,
            skinType: skinTypeRef.current.value,
            usedCreams: usedCreamsRef.current.value,
            baseInformation: baseInformationRef.current.value,
        }
        addNewClientToDatabase(newClient);
        setInputData({
            age: ""
        })
        nameRef.current.value = "";
        skinTypeRef.current.value = "";
        baseInformationRef.current.value = "";
        allergiesRef.current.value = "";
        usedCreamsRef.current.value = "";
        mobileNumberRef.current.value = "";
    }

    const addNewClientToDatabase = async (clientData: ClientDataInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/add-new-client";
            const params = {clientData: clientData};
            const response = await axios.post(url, params, { withCredentials: true });
            console.log(response.data.message);
            if (response.data.message = "Client has been added") {
                setShowAlert(true);
                Router.push('/admin/clients');
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
                                    inputRef={mobileNumberRef}
                                    id="mobileNumber"
                                    label="Telefonszám"
                                    name="mobileNumber"
                                    autoComplete="tel"
                                />
                            </Col>
                        </Row>
                        <Row className="section-options-buttons">
                            <Col >
                                <Button 
                                    variant="contained" 
                                    onClick={() => setShowAllergies(!showAllergies)} 
                                    startIcon={!showAllergies ? <AddCircleOutlineIcon/> : <RemoveCircleOutlineIcon/>}>Allergia
                                    </Button>
                                <Button 
                                    variant="contained"
                                    onClick={() => setShowSkinTypes(!showSkinType)}
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
                                    inputRef={allergiesRef}
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
                                    inputRef={skinTypeRef}
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
                                    inputRef={usedCreamsRef}
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
                                    inputRef={baseInformationRef}
                                    id="baseInformation"
                                    label="Általános információk"
                                    name="baseInformation"
                                />
                            </Collapse>
                        </div>
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