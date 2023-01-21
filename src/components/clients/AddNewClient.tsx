import React, { useState, useRef, useContext } from "react";
import Container from 'react-bootstrap/Container';
import { Collapse, Box } from '@mui/material';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ClientDataInterface } from '../../interfaces/ClientInterfaces';
import Router from 'next/router';
import { Alert } from "../smallComponents/Alerts";
import { MultilineNonReqInput, OneLineNonReqInput, OneLineReqAutoFocusInput, OneLineReqInput } from "../smallComponents/InputFields";
import { AddIconOptionButton, AddIconPrimaryButton } from "../smallComponents/Buttons";
import ClientContext from "../../context/ClientProvider";
import AddNewClientOptionDialog from "./AddNewClientOptionDialog";

const AddClients = () => {

    const { clientOptionNames, setOpenAddClientOptionDialog } = useContext(ClientContext);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [inputData, setInputData] = useState<ClientDataInterface>({
        name: "",
        age: "",
        email: "",
        mobileNumber: "",
        option1Content: "",
        option2Content: "",
        option3Content: "",
        option4Content: "",
        option5Content: "",
    })

    const [showNameError, setShowNameError] = useState(false);
    const [showAgeError, setShowAgeError] = useState(false);
    const [showMobileNumberError, setShowMobileNumberError] = useState(false);


    // States for show or hide textfields
    const [showOption1Content, setShowOption1Content] = useState(false);
    const [showOption2Content, setshowOption2Content] = useState(false);
    const [showOption3Content, setShowOption3Content] = useState(false);
    const [showOption4Content, setShowOption4Content] = useState(false);
    const [showOption5Content, setShowOption5Content] = useState(false);

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!showNameError && !showAgeError) {
            addNewClientToDatabase(inputData);
            setInputData({
                name: "",
                age: "",
                email: "",
                mobileNumber: "",
                option1Content: "",
                option2Content: "",
                option3Content: "",
                option4Content: "",
                option5Content: "",
            });
        }
    }

    const addNewClientToDatabase = async (clientData: ClientDataInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/client/add-new-client";
            const params = {clientData: clientData};
            const response = await axios.post(url, params, { withCredentials: true });
            if (response.data.message = "Client has been added") {
                setShowSuccessAlert(true);
                Router.push('/admin/clients');
            } else {
                setShowErrorAlert(true);
            }
        }
        catch (err) {
            err instanceof Error && console.log(err.message);
            setShowErrorAlert(true);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        
        setInputData(prevVal => {
            return {
                ...prevVal,
                [name]: value,
            }
        })

        if (name === 'name') {
            nameValidator(value) ? setShowNameError(true): setShowNameError(false);
        }
        
        if (name === 'age') {
            ageValidator(value) ? setShowAgeError(true) : setShowAgeError(false);
        }
        if (name === 'mobileNumber') {
            mobileNumberValidator(value) ? setShowMobileNumberError(true) : setShowMobileNumberError(false);
        }
    }

    const handleCloseAlert = () => {
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
      };

    // returns true if string contains number
    const nameValidator = (value: string) => {
        return /\d/.test(value); 
    }

    // returns true if format of age is not valid
    const ageValidator = (value: string) => {
        if(!value || ( value[value.length-1].match('[0-9]') && value[0].match('[1-9]'))) {
            return false;
        } else {
            return true;
        }
    }

    const mobileNumberValidator = (value: string) => {
        if (value.charAt(0) !== '+' && value.length > 0) {
            return true
        } else {
            return false
        }
    }

    return (
        <section id="add-new-client-section">
            <Alert 
                open={showSuccessAlert}
                onClose={handleCloseAlert}
                text="Vendég hozzáadása sikeres volt."
                severity="success"
            />
            <Alert 
                open={showErrorAlert}
                onClose={handleCloseAlert}
                text="Vendég hozzáadása nem sikerült."
                severity="error"
            />
            
            <>
                <h1 className="page-title">Vendég hozzáadása</h1>
                <Box className="form" component="form" onSubmit={handleSubmit}>
                    <Container>
                        <Row>
                            <Col lg={3}>
                                <OneLineReqAutoFocusInput value={inputData.name} onChange={handleChange} label="Név" nameVal="name"/>
                                <Collapse in={showNameError}>
                                    <p className="input-error-text">Nem tartalmazhat számot!</p>
                                </Collapse>
                            </Col>
                            <Col lg={3}>
                                <OneLineReqInput value={inputData.mobileNumber} onChange={handleChange} label="Telefonszám" nameVal="mobileNumber" />
                                <Collapse in={showMobileNumberError}>
                                    <p className="input-error-text">Helyes formátum: +3677777777</p>
                                </Collapse>
                            </Col>
                            <Col lg={3}>
                                <OneLineNonReqInput onChange={handleChange} value={inputData.age} label="Kor" nameVal="age"/>
                                <Collapse in={showAgeError}>
                                    <p className="input-error-text">Kizárólag nullánál nagyobb szám lehet!</p>
                                </Collapse>
                            </Col>
                            <Col lg={3}>
                                <OneLineNonReqInput value={inputData.email} onChange={handleChange} label="E-mail" nameVal="email"/>
                            </Col>
                        </Row>
                        <Row className="text-center m-4">
                            <Col >
                                {clientOptionNames.option1Name && <AddIconOptionButton addIcon={showOption1Content} onClick={() => setShowOption1Content(!showOption1Content)} text={clientOptionNames.option1Name}/> }
                                {clientOptionNames.option2Name && <AddIconOptionButton addIcon={showOption2Content} onClick={() => setshowOption2Content(!showOption2Content)} text={clientOptionNames.option2Name}/> }
                                {clientOptionNames.option3Name && <AddIconOptionButton addIcon={showOption3Content} onClick={() => setShowOption3Content(!showOption3Content)} text={clientOptionNames.option3Name}/> }
                                {clientOptionNames.option4Name && <AddIconOptionButton addIcon={showOption4Content} onClick={() => setShowOption4Content(!showOption4Content)} text={clientOptionNames.option4Name}/> }
                                {clientOptionNames.option5Name && <AddIconOptionButton addIcon={showOption5Content} onClick={() => setShowOption5Content(!showOption5Content)} text={clientOptionNames.option5Name}/> }
                            </Col>
                        </Row>
                        <Row className="text-center my-4">
                            <Col >
                                <AddIconPrimaryButton onClick={() => setOpenAddClientOptionDialog(true)} text="új mező"/>
                            </Col>
                        </Row>
                        <div>
                            <Collapse in={showOption1Content}>
                                <MultilineNonReqInput value={inputData.option1Content} onChange={handleChange} nameVal={clientOptionNames.option1Name}/>
                            </Collapse>
                            <Collapse in={showOption2Content}>
                                <MultilineNonReqInput value={inputData.option2Content} onChange={handleChange} nameVal={clientOptionNames.option2Name}/>
                            </Collapse>
                            <Collapse in={showOption3Content}>
                                <MultilineNonReqInput value={inputData.option3Content} onChange={handleChange} nameVal={clientOptionNames.option3Name}/>
                            </Collapse>
                            <Collapse in={showOption4Content}>
                                <MultilineNonReqInput value={inputData.option4Content} onChange={handleChange} nameVal={clientOptionNames.option4Name}/>
                            </Collapse>
                            <Collapse in={showOption5Content}>
                                <MultilineNonReqInput value={inputData.option5Content} onChange={handleChange}  nameVal={clientOptionNames.option5Name}/>
                            </Collapse>
                        </div>
                        <div className="text-center m-4">
                            <AddIconPrimaryButton text='vendég hozzáadása' type="submit"/>
                        </div>
                    </Container>
                </Box>
            </>
            <AddNewClientOptionDialog />
        </section>
    )
}

export default AddClients;