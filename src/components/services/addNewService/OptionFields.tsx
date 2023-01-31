import { Collapse } from "@mui/material";
import { useContext, useState } from "react";
import LangContext from "../../../context/LanguageProvider";
import { ServiceDataInterface } from "../../../interfaces/ServiceInterfaces";
import { AddIconOptionButton, AddIconPrimaryButton } from "../../smallComponents/Buttons";
import { MultilineNonReqInput } from "../../smallComponents/InputFields";

interface Props {
    inputData: ServiceDataInterface;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OptionFields = ({ inputData, handleChange }: Props) => {

    const { lang } = useContext(LangContext)

    const [showSteps, setShowSteps] = useState(inputData.steps ? true : false);
    const [showDescription, setShowDescription] = useState(inputData.description ? true : false);

    return (
        <>
            <div className="text-center mx-2">
                <Collapse in={showDescription}>
                    <MultilineNonReqInput onChange={handleChange} value={inputData.description} label={ lang === 'hun' ? 'Leírás' : 'Description' } nameVal="description"/>
                </Collapse>
                <Collapse in={showSteps}>
                    <MultilineNonReqInput onChange={handleChange} value={inputData.steps} label={ lang === 'hun' ? 'Lépések' : 'Steps' } nameVal="steps"/>
                </Collapse>
            </div>
            <div className="text-center my-4">
                <AddIconOptionButton onClick={() => setShowDescription(!showDescription)} text={ lang === 'hun' ? 'Leírás' : 'Description' }/>
                <AddIconOptionButton onClick={() => setShowSteps(!showSteps)} text={ lang === 'hun' ? 'Lépések' : 'Steps' }/>
            </div>
        </>
    )
}

export default OptionFields;