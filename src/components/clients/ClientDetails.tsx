import React, { useContext, useState } from "react";
import { ClientDataInterface } from '../../interfaces/ClientInterfaces';
import { Collapse } from '@mui/material';
import { Container, Row, Col } from "react-bootstrap";
import Router from 'next/router';
import Box from '@mui/material/Box';
import axios from "axios";
import { Alert } from "../smallComponents/Alerts";
import { AddIconOptionButton } from "../smallComponents/Buttons";
import { MultilineNonReqInput, OneLineNonReqInput, OneLineReqAutoFocusInput, OneLineReqInput } from "../smallComponents/InputFields";
import ClientContext from "../../context/ClientProvider";
import DeleteDialog from "../smallComponents/DeleteDialog";

const ClientDetails = (props: ClientDataInterface) => {

    const { clientOptionNames } = useContext(ClientContext);
    const [clientData, setClientData] = useState<ClientDataInterface>({
        _id: props._id,
        name: props.name,
        age: props.age,
        email: props.email,
        mobileNumber: props.mobileNumber,
        option1Content: props.option1Content,
        option2Content: props.option2Content,
        option3Content: props.option3Content,
        option4Content: props.option4Content,
        option5Content: props.option5Content,
    })

    const [showSavingAlert, setShowSavingAlert] = useState(false);
    const [showSavingErrorAlert, setShowSavingErrorAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [showDeleteErrorAlert, setShowDeleteErrorAlert] = useState(false);
    const [showSaveButton, setShowSaveButton] = useState(false);

    // States for show or hide textfields

    const [showOption1Content, setShowOption1Content] = useState(props.option1Content ? true : false)
    const [showOption2Content, setShowOption2Content] = useState(props.option2Content ? true : false)
    const [showOption3Content, setShowOption3Content] = useState(props.option3Content ? true : false)
    const [showOption4Content, setShowOption4Content] = useState(props.option4Content ? true : false)
    const [showOption5Content, setShowOption5Content] = useState(props.option5Content ? true : false)

    const saveClient = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        saveModifiedData(clientData);
        setShowSaveButton(false);
    }

    // Save client in database API
    const saveModifiedData = async (newClientData: ClientDataInterface) => {
        const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/client/save-modified-client-data";
        const params = { newClientData: newClientData};
        const response = await axios.put(url, params, { withCredentials: true });
        if(response.status === 200) {
            setShowSavingAlert(true);
        } 
        else {
            setShowSavingErrorAlert(true);
        }
    }

    // Delete client API

    const deleteClientRequest = async (clientId: string | undefined) => {
        const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/client/delete-client";
        const config = {
            data: { clientId },
            withCredentials: true,
        }
        const response = await axios.delete(url, config);
        if(response.status === 200) {
            setShowDeleteAlert(true);
        } 
        else {
            setShowDeleteErrorAlert(true);
        }
    }

    // DELETE CLIENT
    const deleteClient = () => {
        deleteClientRequest(props._id);
        Router.push('/admin/clients');
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
        <section id="client-details-section data-details-section">
            <Alert 
                open={showSavingAlert}
                onClose={() => setShowSavingAlert(false)}
                text="A változtatások mentése sikeres volt."
                severity="success"
            />
            <Alert 
                open={showSavingErrorAlert}
                onClose={() => setShowSavingErrorAlert(false)}
                text="A változtatásokat sajnos nem sikerült elmenteni, kérjük próbáld újra később."
                severity="error"
            />
            
            <Alert 
                open={showDeleteAlert}
                onClose={() => setShowDeleteAlert(false)}
                text={`${props.name} eltávolítása a kliensek közül sikeres volt`}
                severity="success"
            />
            <Alert 
                open={showDeleteErrorAlert}
                onClose={() => setShowDeleteErrorAlert(false)}
                text="A kliens adatbázisból történő törlése nem sikerült."
                severity="error"
            />
            
            <h1 className="page-title">{props.name}</h1>
            <Box className="form" component="form" onSubmit={saveClient}>
                <Container>
                    <Row>
                        <Col lg={3}>
                            <OneLineReqAutoFocusInput value={clientData.name} onChange={handleInputChange} label="Név" nameVal="name"/>
                        </Col>
                        <Col lg={3}>
                            <OneLineReqInput onChange={handleInputChange} value={clientData.mobileNumber} label="Telefonszám" nameVal="tel"/>
                        </Col>
                        <Col lg={3}>
                            <OneLineNonReqInput onChange={handleInputChange} value={clientData.age} label="Kor" nameVal="age"/>
                        </Col>
                        <Col lg={3}>
                            <OneLineNonReqInput onChange={handleInputChange} value={clientData.email} label="E-mail" nameVal="email"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="section-options-buttons">
                            {clientOptionNames.option1Name && <AddIconOptionButton addIcon={showOption1Content} onClick={() => setShowOption1Content(!showOption1Content)} text={clientOptionNames.option1Name}/> }
                            {clientOptionNames.option2Name && <AddIconOptionButton addIcon={showOption2Content} onClick={() => setShowOption2Content(!showOption2Content)} text={clientOptionNames.option2Name}/> }
                            {clientOptionNames.option3Name && <AddIconOptionButton addIcon={showOption3Content} onClick={() => setShowOption3Content(!showOption3Content)} text={clientOptionNames.option3Name}/> }
                            {clientOptionNames.option4Name && <AddIconOptionButton addIcon={showOption4Content} onClick={() => setShowOption4Content(!showOption4Content)} text={clientOptionNames.option4Name}/> }
                            {clientOptionNames.option5Name && <AddIconOptionButton addIcon={showOption5Content} onClick={() => setShowOption5Content(!showOption5Content)} text={clientOptionNames.option5Name}/> }
                        </Col>
                    </Row>
                    <div className="options-fields">
                        <Collapse in={showOption1Content}>
                            <MultilineNonReqInput onChange={handleInputChange} value={clientData.option1Content} label={clientOptionNames.option1Name} nameVal={clientOptionNames.option1Name}/>
                        </Collapse>
                        <Collapse in={showOption2Content}>
                            <MultilineNonReqInput onChange={handleInputChange} value={clientData.option2Content} label={clientOptionNames.option2Name} nameVal={clientOptionNames.option2Name}/>
                        </Collapse>
                        <Collapse in={showOption3Content}>
                            <MultilineNonReqInput onChange={handleInputChange} value={clientData.option3Content} label={clientOptionNames.option3Name} nameVal={clientOptionNames.option3Name}/>
                        </Collapse>
                        <Collapse in={showOption4Content}>
                            <MultilineNonReqInput onChange={handleInputChange} value={clientData.option4Content} label={clientOptionNames.option4Name} nameVal={clientOptionNames.option4Name}/>
                        </Collapse>
                        <Collapse in={showOption5Content}>
                            <MultilineNonReqInput onChange={handleInputChange} value={clientData.option5Content} label={clientOptionNames.option5Name}  nameVal={clientOptionNames.option5Name}/>
                        </Collapse>
                    </div>
                </Container>
                <DeleteDialog 
                    deleteLabel={`Biztosan el szeretnéd távolítani ${props.name}-t a klienseid közül?`}
                    deleteFunction={deleteClient}
                />
            </Box>
        </section>
    )
}

export default ClientDetails;