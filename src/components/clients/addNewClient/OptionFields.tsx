import { useContext, useEffect, useState } from "react";
import { Collapse } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import ClientContext from "../../../context/ClientProvider";
import { ClientDataInterface } from "../../../interfaces/ClientInterfaces";
import { AddIconOptionButton, BasicPrimaryButton } from "../../smallComponents/Buttons";
import { MultilineNonReqInput } from "../../smallComponents/InputFields";
import { fetchClientOptionNames } from "../Utils";

interface Props {
    inputData: ClientDataInterface;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OptionFields = ({ inputData, handleChange }: Props) => {

    const { setOpenClientOptionDialog, clientOptionNames, setClientOptionNames } = useContext(ClientContext);

    const [showOption1Content, setShowOption1Content] = useState(inputData.option1Content ? true : false);
    const [showOption2Content, setshowOption2Content] = useState(inputData.option2Content ? true : false);
    const [showOption3Content, setShowOption3Content] = useState(inputData.option3Content ? true : false);
    const [showOption4Content, setShowOption4Content] = useState(inputData.option4Content ? true : false);
    const [showOption5Content, setShowOption5Content] = useState(inputData.option5Content ? true : false);

    useEffect(() => {
        if(
            clientOptionNames.option1Name === "" &&
            clientOptionNames.option2Name === "" &&
            clientOptionNames.option3Name === "" &&
            clientOptionNames.option4Name === "" &&
            clientOptionNames.option5Name === "") {
            fetchClientOptionNames(setClientOptionNames);
        }
    }, [])

    return (
        <>
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
                    <BasicPrimaryButton onClick={() => setOpenClientOptionDialog(true)} text="mezők átnevezése"/>
                </Col>
            </Row>
            <div>
                <Collapse in={showOption1Content}>
                    <MultilineNonReqInput value={inputData.option1Content} onChange={handleChange} nameVal="option1Content" label={clientOptionNames.option1Name}/>
                </Collapse>
                <Collapse in={showOption2Content}>
                    <MultilineNonReqInput value={inputData.option2Content} onChange={handleChange} nameVal="option2Content" label={clientOptionNames.option2Name}/>
                </Collapse>
                <Collapse in={showOption3Content}>
                    <MultilineNonReqInput value={inputData.option3Content} onChange={handleChange} nameVal="option3Content" label={clientOptionNames.option3Name}/>
                </Collapse>
                <Collapse in={showOption4Content}>
                    <MultilineNonReqInput value={inputData.option4Content} onChange={handleChange} nameVal="option4Content" label={clientOptionNames.option4Name}/>
                </Collapse>
                <Collapse in={showOption5Content}>
                    <MultilineNonReqInput value={inputData.option5Content} onChange={handleChange} nameVal="option5Content" label={clientOptionNames.option5Name}/>
                </Collapse>
            </div>
        </>
    )
}

export default OptionFields;