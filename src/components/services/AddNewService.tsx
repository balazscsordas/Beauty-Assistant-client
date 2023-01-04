import React, { useState, useRef } from "react";
import Container from 'react-bootstrap/Container';
import { Button, Collapse, TextField, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ServiceCategories, ServiceDataInterface } from '../../interfaces/ServiceInterfaces';
import Router from 'next/router';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';

const AddNewService = () => {

    // States + Refs
    const [showAlert, setShowAlert] = useState(false);
    const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const descriptionRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const categoryRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const priceRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const timeRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const stepsRef = useRef() as React.MutableRefObject<HTMLInputElement>;


    const [inputData, setInputData] = useState<ServiceDataInterface>({
        name: "",
        category: "",   
        price: 0,
        time: 0,
        description: "",
        steps: "",
    })

    const [categories, setCategories] = useState<ServiceCategories[]>([
        {
            name: "Klasszikus kezelések"
        },
        {
            name: "Speciális kezelések"
        },
        {
            name: "Tisztító kezelések"
        }
    ]);

    // States for show or hide textfields
    const [showSteps, setShowSteps] = useState(false);

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newService: ServiceDataInterface = {
            name: nameRef.current.value,
            category: categoryRef.current.value,
            price: parseInt(priceRef.current.value),
            time: parseInt(timeRef.current.value),
            description: descriptionRef.current.value,
            steps: stepsRef.current.value,
        }
        addNewServiceToDatabase(newService);
        nameRef.current.value = "";
        stepsRef.current.value = "";
        descriptionRef.current.value = "";
    }

    const addNewServiceToDatabase = async (serviceData: ServiceDataInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/service/add-new-service";
            const params = {serviceData: serviceData};
            const response = await axios.post(url, params, { withCredentials: true });
            console.log(response.data.message);
            if (response.data.message = "Service has been added") {
                setShowAlert(true);
                Router.push('/admin/services');
            }
        }
        catch (err) {
            err instanceof Error && console.log(err.message);
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
                    Szolgáltatás hozzáadása sikeres volt.
                </MuiAlert>
            </Snackbar>

            <>
                <h1 className="page-title">Szolgáltatás hozzáadása</h1>
                <Box className="form" component="form" onSubmit={handleSubmit}>
                    <Container>
                        <Row>
                            <Col lg={3}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    inputRef={nameRef}
                                    id="name"
                                    label="Név"
                                    name="name"
                                    autoFocus
                                />
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    margin="normal"
                                    required
                                    select
                                    fullWidth
                                    inputRef={categoryRef}
                                    id="category"
                                    label="Kategória"
                                    name="category"
                                    >
                                    {categories.map((category, index) => (
                                        <MenuItem key={index} value={category.name}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                    </TextField>
                            </Col>
                            <Col lg={3}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="number"
                                    inputRef={priceRef}
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
                                    fullWidth
                                    required
                                    type="number"
                                    inputRef={timeRef}
                                    id="time"
                                    label="Időtartam"
                                    name="time"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="end">Perc</InputAdornment>,
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TextField
                                    margin="normal"
                                    minRows={4}
                                    fullWidth
                                    required
                                    multiline
                                    inputRef={descriptionRef}
                                    id="description"
                                    label="Leírás"
                                    name="description"
                                />
                            </Col>
                        </Row>
                        <Row className="section-options-buttons">
                            <Col >
                                <Button 
                                    variant="contained"
                                    onClick={() => setShowSteps(!showSteps)}
                                    startIcon={!showSteps ? <AddCircleOutlineIcon/> : <RemoveCircleOutlineIcon/>}>Lépések
                                </Button>
                            </Col>
                        </Row>
                        <div className="options-fields">
                            <Collapse in={showSteps}>
                                <TextField
                                    margin="normal"
                                    minRows={4}
                                    fullWidth
                                    multiline
                                    inputRef={stepsRef}
                                    id="steps"
                                    label="Lépések"
                                    name="steps"
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
                                Szolgáltatás hozzáadása
                            </Button>
                        </div>
                </Box>
            </>
        </section>
    )
}

export default AddNewService;