import { Collapse } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { ClientDataInterface } from "../../../interfaces/ClientInterfaces";
import { OneLineNonReqInput, OneLineReqAutoFocusInput, OneLineReqInput } from "../../smallComponents/InputFields";

interface Props {
    inputData: ClientDataInterface;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showNameError: boolean;
    showMobileNumberError: boolean;
    showAgeError: boolean;
}

const FixFields = ({ inputData, handleChange, showNameError, showMobileNumberError, showAgeError }: Props) => {
    
    return (
        <>
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
        </>
    )
}

export default FixFields;