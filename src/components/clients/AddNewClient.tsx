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
    // States + Refs
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const mobileNumberRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [inputData, setInputData] = useState({
        age: "",
    })
    
    const option1ContentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const option3ContentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const option2ContentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const option4ContentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const option5ContentRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    

    // States for show or hide textfields
    const [showOption1Content, setShowOption1Content] = useState(false);
    const [showOption2Content, setshowOption2Content] = useState(false);
    const [showOption3Content, setShowOption3Content] = useState(false);
    const [showOption4Content, setShowOption4Content] = useState(false);
    const [showOption5Content, setShowOption5Content] = useState(false);

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newClient: ClientDataInterface = {
            name: nameRef.current.value,
            age: inputData.age,
            email: emailRef.current.value,
            mobileNumber: mobileNumberRef.current.value,
            option1Content: option1ContentRef.current.value,
            option2Content: option2ContentRef.current.value,
            option3Content: option3ContentRef.current.value,
            option4Content: option4ContentRef.current.value,
            option5Content: option5ContentRef.current.value,
        }
        addNewClientToDatabase(newClient);
        setInputData({
            age: ""
        })
        nameRef.current.value = "";
        option1ContentRef.current.value = "";
        option2ContentRef.current.value = "";
        option3ContentRef.current.value = "";
        option4ContentRef.current.value = "";
        option5ContentRef.current.value = "";
        mobileNumberRef.current.value = "";
    }

    const addNewClientToDatabase = async (clientData: ClientDataInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/client/add-new-client";
            const params = {clientData: clientData};
            const response = await axios.post(url, params, { withCredentials: true });
            console.log(response.data.message);
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
        setShowSuccessAlert(false);
        setShowErrorAlert(false);
      };

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
                                <OneLineReqAutoFocusInput inputRef={nameRef} label="Név" nameVal="name"/>
                            </Col>
                            <Col lg={3}>
                                <OneLineReqInput inputRef={mobileNumberRef} label="Telefonszám" nameVal="tel"/>
                                
                            </Col>
                            <Col lg={3}>
                                <OneLineNonReqInput onChange={changeInputData} value={inputData.age} label="Kor" nameVal="age"/>
                            </Col>
                            <Col lg={3}>
                                <OneLineNonReqInput inputRef={emailRef} label="E-mail" nameVal="email"/>
                            </Col>
                        </Row>
                        <Row className="options-buttons">
                            <Col >
                                {clientOptionNames.option1Name && <AddIconOptionButton addIcon={showOption1Content} onClick={() => setShowOption1Content(!showOption1Content)} text={clientOptionNames.option1Name}/> }
                                {clientOptionNames.option2Name && <AddIconOptionButton addIcon={showOption2Content} onClick={() => setshowOption2Content(!showOption2Content)} text={clientOptionNames.option2Name}/> }
                                {clientOptionNames.option3Name && <AddIconOptionButton addIcon={showOption3Content} onClick={() => setShowOption3Content(!showOption3Content)} text={clientOptionNames.option3Name}/> }
                                {clientOptionNames.option4Name && <AddIconOptionButton addIcon={showOption4Content} onClick={() => setShowOption4Content(!showOption4Content)} text={clientOptionNames.option4Name}/> }
                                {clientOptionNames.option5Name && <AddIconOptionButton addIcon={showOption5Content} onClick={() => setShowOption5Content(!showOption5Content)} text={clientOptionNames.option5Name}/> }
                            </Col>
                        </Row>
                        <Row className="options-buttons">
                            <Col >
                                <AddIconPrimaryButton onClick={() => setOpenAddClientOptionDialog(true)} text="új mező"/>
                            </Col>
                        </Row>
                        <div className="options-fields">
                            <Collapse in={showOption1Content}>
                                <MultilineNonReqInput inputRef={option1ContentRef} label={clientOptionNames.option1Name} nameVal={clientOptionNames.option1Name}/>
                            </Collapse>
                            <Collapse in={showOption2Content}>
                                <MultilineNonReqInput inputRef={option2ContentRef} label={clientOptionNames.option2Name} nameVal={clientOptionNames.option2Name}/>
                            </Collapse>
                            <Collapse in={showOption3Content}>
                                <MultilineNonReqInput inputRef={option3ContentRef} label={clientOptionNames.option3Name} nameVal={clientOptionNames.option3Name}/>
                            </Collapse>
                            <Collapse in={showOption4Content}>
                                <MultilineNonReqInput inputRef={option4ContentRef} label={clientOptionNames.option4Name} nameVal={clientOptionNames.option4Name}/>
                            </Collapse>
                            <Collapse in={showOption5Content}>
                                <MultilineNonReqInput inputRef={option5ContentRef} label={clientOptionNames.option5Name}  nameVal={clientOptionNames.option5Name}/>
                            </Collapse>
                        </div>
                    </Container>
                        <div className="button-block">
                            <AddIconPrimaryButton text='vendég hozzáadása' type="submit"/>
                        </div>
                </Box>
            </>
            <AddNewClientOptionDialog />
        </section>
    )
}

export default AddClients;