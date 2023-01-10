import React, { useState, useRef } from "react";
import Container from 'react-bootstrap/Container';
import { Collapse, TextField, Box, MenuItem } from '@mui/material';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ServiceCategories, ServiceDataInterface } from '../../interfaces/ServiceInterfaces';
import Router from 'next/router';
import { Alert } from "../smallComponents/Alerts";
import { MultilineNonReqInput, OneLineReqAutoFocusInput } from "../smallComponents/InputFields";
import { AddIconOptionButton, AddIconPrimaryButton } from "../smallComponents/Buttons";

const AddNewService = () => {

    // States + Refs
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
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
                setShowSuccessAlert(true);
                Router.push('/admin/services');
            } else {
                setShowErrorAlert(true);
            }
        }
        catch (err) {
            setShowErrorAlert(true);
            err instanceof Error && console.log(err.message);
        }
    }

    const handleCloseAlert = () => {
        setShowSuccessAlert(false);
      };

    return (
        <section id="add-new-client-section">
            <Alert 
                open={showSuccessAlert}
                onClose={handleCloseAlert}
                text="Szolgáltatás hozzáadása sikeres volt."
                severity="success"
            />
            <Alert 
                open={showErrorAlert}
                onClose={handleCloseAlert}
                text="Szolgáltatás hozzáadása nem sikerült."
                severity="error"
            />

            <>
                <h1 className="page-title">Szolgáltatás hozzáadása</h1>
                <Box className="form" component="form" onSubmit={handleSubmit}>
                    <Container>
                        <Row>
                            <Col lg={3}>
                                <OneLineReqAutoFocusInput inputRef={nameRef} label="Név" nameVal="name"/>
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
                                <OneLineReqAutoFocusInput inputRef={priceRef} label="Ár (Ft)" nameVal="price" type="number"/>
                            </Col>
                            <Col lg={3}>
                                <OneLineReqAutoFocusInput inputRef={timeRef} label="Időtartam (perc)" nameVal="time" type="number"/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <MultilineNonReqInput inputRef={descriptionRef} label="Leírás" nameVal="description"/>
                            </Col>
                        </Row>
                        <Row className="section-options-buttons">
                            <Col >
                                <AddIconOptionButton onClick={() => setShowSteps(!showSteps)} text="Lépések"/>
                            </Col>
                        </Row>
                        <div className="options-fields">
                            <Collapse in={showSteps}>
                                <MultilineNonReqInput inputRef={stepsRef} label="Lépések" nameVal="steps"/>
                            </Collapse>
                        </div>
                    </Container>
                        <div className="button-block">
                            <AddIconPrimaryButton text='vendég hozzáadása' type="submit"/>
                        </div>
                </Box>
            </>
        </section>
    )
}

export default AddNewService;