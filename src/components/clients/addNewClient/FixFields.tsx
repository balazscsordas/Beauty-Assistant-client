import { useContext } from "react";
import LangContext from "../../../context/LanguageProvider";
import { ClientDataInterface } from "../../../interfaces/ClientInterfaces";
import { OneLineNonReqInput, OneLineReqInput } from "../../smallComponents/InputFields";

interface Props {
    inputData: ClientDataInterface;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showNameError: boolean;
    showMobileNumberError: boolean;
    showAgeError: boolean;
}

const FixFields = ({ inputData, handleChange, showNameError, showMobileNumberError, showAgeError }: Props) => {

    const { lang } = useContext(LangContext);
    
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
        </>
    )
}

export default FixFields;