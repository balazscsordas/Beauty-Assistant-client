import Collapse from "@mui/material/Collapse";
import { useContext, useEffect } from "react";
import ClientContext from "../../../context/ClientProvider";
import LangContext from "../../../context/LanguageProvider";
import { ClientDataInterface } from "../../../interfaces/ClientInterfaces";
import { BasicPrimaryButton } from "../../smallComponents/Buttons";
import { MultilineNonReqInput, OneLineNonReqInput, OneLineReqInput } from "../../smallComponents/InputFields";
import { fetchClientOptionNames } from "../Utils";

interface Props {
    inputData: ClientDataInterface;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showNameError: boolean;
    showMobileNumberError: boolean;
    showAgeError: boolean;
}

const FixFields = ({ inputData, handleChange, showNameError, showMobileNumberError, showAgeError }: Props) => {

    const { lang } = useContext(LangContext);
    const { setOpenClientOptionDialog, clientOptionNames, setClientOptionNames } = useContext(ClientContext);

    useEffect(() => {
        if(
            clientOptionNames.option1Name === "" &&
            clientOptionNames.option2Name === "" &&
            clientOptionNames.option3Name === "" &&
            clientOptionNames.option4Name === "" &&
            clientOptionNames.option5Name === "") {
            fetchClientOptionNames(setClientOptionNames);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <>
            <section className="flex flex-col lg:flex-row">
                <div className="flex-1 mx-2">
                    <OneLineReqInput 
                        value={inputData.name} 
                        onChange={handleChange} 
                        label={ lang === 'hun' ? 'Név' : 'Name' } 
                        nameVal="name" showError={showNameError} 
                        errorText={ lang === 'hun' ? 'Nem tartalmazhat számot!' : 'Numbers are not allowed!' }
                    />
                </div>
                <div className="flex-1 mx-2">
                    <OneLineReqInput 
                        value={inputData.mobileNumber} 
                        onChange={handleChange} 
                        label={ lang === 'hun' ? 'Telefonszám' : 'Mobile number' } 
                        nameVal="mobileNumber" showError={showMobileNumberError} 
                        errorText={ lang === 'hun' ? 'Helyes formátum: +3677777777' : 'Correct format: +3677777777' }
                    />
                </div>
                <div className="flex-1 mx-2">
                    <OneLineNonReqInput 
                        onChange={handleChange}
                        value={inputData.age} 
                        label={ lang === 'hun' ? 'Kor' : 'Age' } 
                        nameVal="age" showError={showAgeError} 
                        errorText={ lang === 'hun' ? 'Kizárólag nullánál nagyobb szám lehet!' : 'Only numbers greater than zero are allowed' }
                    />
                </div>
                <div className="flex-1 mx-2">
                    <OneLineNonReqInput 
                        value={inputData.email} 
                        onChange={handleChange} 
                        label="E-mail" 
                        nameVal="email"
                    />
                </div>
            </section>
            <div>
                <Collapse in={clientOptionNames.option1Name ? true : false} className="mx-2">
                    <MultilineNonReqInput value={inputData.option1Content} onChange={handleChange} nameVal="option1Content" label={clientOptionNames.option1Name}/>
                </Collapse>
                <Collapse in={clientOptionNames.option2Name ? true : false} className="mx-2">
                    <MultilineNonReqInput value={inputData.option2Content} onChange={handleChange} nameVal="option2Content" label={clientOptionNames.option2Name}/>
                </Collapse>
                <Collapse in={clientOptionNames.option3Name ? true : false} className="mx-2">
                    <MultilineNonReqInput value={inputData.option3Content} onChange={handleChange} nameVal="option3Content" label={clientOptionNames.option3Name}/>
                </Collapse>
                <Collapse in={clientOptionNames.option4Name ? true : false} className="mx-2">
                    <MultilineNonReqInput value={inputData.option4Content} onChange={handleChange} nameVal="option4Content" label={clientOptionNames.option4Name}/>
                </Collapse>
                <Collapse in={clientOptionNames.option5Name ? true : false} className="mx-2">
                    <MultilineNonReqInput value={inputData.option5Content} onChange={handleChange} nameVal="option5Content" label={clientOptionNames.option5Name}/>
                </Collapse>
            </div>
            <div className="text-center my-4">
                <BasicPrimaryButton onClick={() => setOpenClientOptionDialog(true)} text={ lang === 'hun' ? 'mezők átnevezése' : 'Rename fields' }/>
            </div>
        </>
    )
}

export default FixFields;