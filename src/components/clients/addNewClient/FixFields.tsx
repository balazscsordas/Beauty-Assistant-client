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
    
    return (
        <>
            <section className="flex flex-col lg:flex-row">
                <div className="flex-1 mx-2">
                    <OneLineReqInput value={inputData.name} onChange={handleChange} label="Név" nameVal="name" showError={showNameError} errorText="Nem tartalmazhat számot!"/>
                </div>
                <div className="flex-1 mx-2">
                    <OneLineReqInput value={inputData.mobileNumber} onChange={handleChange} label="Telefonszám" nameVal="mobileNumber" showError={showMobileNumberError} errorText="Helyes formátum: +3677777777"/>
                </div>
                <div className="flex-1 mx-2">
                    <OneLineNonReqInput onChange={handleChange} value={inputData.age} label="Kor" nameVal="age" showError={showAgeError} errorText="Kizárólag nullánál nagyobb szám lehet!"/>
                </div>
                <div className="flex-1 mx-2">
                    <OneLineNonReqInput value={inputData.email} onChange={handleChange} label="E-mail" nameVal="email"/>
                </div>
            </section>
        </>
    )
}

export default FixFields;