import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import { Collapse, TextField, Box, MenuItem } from '@mui/material';
import { timeAndPriceValidator } from "./Utils";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ServiceCategories, ServiceDataInterface } from '../../interfaces/ServiceInterfaces';
import Router from 'next/router';
import { Alert } from "../smallComponents/Alerts";
import { MultilineNonReqInput, OneLineReqAutoFocusInput, OneLineReqInput } from "../smallComponents/InputFields";
import { AddIconOptionButton, AddIconPrimaryButton } from "../smallComponents/Buttons";

const AddNewService = () => {

    // States + Refs
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    const [inputData, setInputData] = useState<ServiceDataInterface>({
        name: "",
        category: "",   
        price: 0,
        time: 0,
        description: "",
        steps: "",
    })

    const [showPriceError, setShowPriceError] = useState(false);
    const [showTimeError, setShowTimeError] = useState(false);

    const [categories, setCategories] = useState<ServiceCategories[]>([
        {
            name: "Új kategória hozzáadása"
        },
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
        if (!showPriceError && !showTimeError) {
            addNewServiceToDatabase(inputData);
            setInputData({
                name: "",
                category: "",   
                price: 0,
                time: 0,
                description: "",
                steps: "",
            })
        }
    }

    const addNewServiceToDatabase = async (serviceData: ServiceDataInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/service/add-new-service";
            const params = {serviceData: serviceData};
            const response = await axios.post(url, params, { withCredentials: true });
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputData(prevValues => {
            return {
                ...prevValues,
                [name]: value,
            }
        })

        if (name === 'price') {
            if (!timeAndPriceValidator(value) && value.length > 0) {
                setShowPriceError(true);
            } else {
                setShowPriceError(false);

            }
        }

        if (name === 'time') {
            if (!timeAndPriceValidator(value) && value.length > 0) {
                setShowTimeError(true);
            } else {
                setShowTimeError(false);

            }
        }
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'category') {
            setInputData(prevValues => {
                return {
                    ...prevValues,
                    category: value,
                }
            });
        } else if (name === 'newCategory') {
            setNewCategory(value);
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
                                <OneLineReqAutoFocusInput onChange={handleChange} value={inputData.name} label="Név" nameVal="name"/>
                            </Col>
                            <Col lg={3}>
                                {inputData.category === 'Új kategória hozzáadása' 
                                    ? <OneLineReqAutoFocusInput label="Kategória" nameVal="newCategory" onChange={handleCategoryChange}/>
                                    : <TextField
                                            margin="normal"
                                            required
                                            select
                                            fullWidth
                                            value={inputData.category}
                                            onChange={handleCategoryChange}
                                            label="Kategória"
                                            name="category"
                                            >
                                            {categories.map((category, index) => (
                                                <MenuItem key={index} value={category.name}>
                                                    {category.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    
                                }
                            </Col>
                            <Col lg={3}>
                                <OneLineReqAutoFocusInput onChange={handleChange} value={inputData.price === 0 ? "" : inputData.price} label="Ár (Ft)" nameVal="price"/>
                                <Collapse in={showPriceError}>
                                    <p className="input-error-text">Kizárólag számot tartalmazhat!</p>
                                </Collapse>
                            </Col>
                            <Col lg={3}>
                                <OneLineReqAutoFocusInput onChange={handleChange} value={inputData.time === 0 ? "" : inputData.time} label="Időtartam (perc)" nameVal="time"/>
                                <Collapse in={showTimeError}>
                                    <p className="input-error-text">Kizárólag számot tartalmazhat!</p>
                                </Collapse>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <MultilineNonReqInput onChange={handleChange} value={inputData.description} label="Leírás" nameVal="description"/>
                            </Col>
                        </Row>
                        <Row className="options-buttons">
                            <Col >
                                <AddIconOptionButton onClick={() => setShowSteps(!showSteps)} text="Lépések"/>
                            </Col>
                        </Row>
                        <div className="options-fields">
                            <Collapse in={showSteps}>
                                <MultilineNonReqInput onChange={handleChange} value={inputData.steps} label="Lépések" nameVal="steps"/>
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