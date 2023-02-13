import { useContext } from "react";
import LangContext from "../../../context/LanguageProvider";
import { ServiceDataInterface } from "../../../interfaces/ServiceInterfaces";
import { BasicSelectInputField, MultilineNonReqInput, OneLineReqInput } from "../../smallComponents/InputFields";

interface Props {
    inputData: ServiceDataInterface;
    setInputData: React.Dispatch<React.SetStateAction<ServiceDataInterface>>;
    categoryList: string[];
    newCategory: string;
    setNewCategory: React.Dispatch<React.SetStateAction<string>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    showPriceError: boolean;
}

const FixFields = ({ inputData, handleChange, showPriceError, categoryList, newCategory, setNewCategory, setInputData }: Props) => {

    const { lang } = useContext(LangContext)

    const timeOptions = ['15', '30', '45', '60', '75', '90', '105', '120', '135', '150', '165', '180'];

    const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'category' || name === 'time') {
            setInputData(prevValues => {
                return {
                    ...prevValues,
                    [name]: value,
                }
            });
        } else if (name === 'newCategory') {
            setNewCategory(value);
        }
    }

    return (
        <>
            <section className="flex flex-col lg:flex-row">
                <div className="flex-1 mx-2">
                    <OneLineReqInput onChange={handleChange} value={inputData.name} label={ lang === 'hun' ? 'Név' : 'Name' } nameVal="name"/>
                </div>
                <div className="flex-1 mx-2">
                    {inputData.category === 'Új kategória hozzáadása' || inputData.category === 'Add new category' || categoryList.length === 1
                        ? <OneLineReqInput label={ lang === 'hun' ? 'Kategória' : 'Category' } nameVal="newCategory" value={newCategory} onChange={handleSelectChange}/>
                        : <BasicSelectInputField label={ lang === 'hun' ? 'Kategória' : 'Category' } value={inputData.category} array={categoryList} onChange={handleSelectChange} nameVal="category"/>
                    }
                </div>
                <div className="flex-1 mx-2">
                    <OneLineReqInput 
                        onChange={handleChange} 
                        value={inputData.price === 0 ? "" : inputData.price} 
                        label={ lang === 'hun' ? 'Ár (Ft)' : 'Price (Eur)' } 
                        nameVal="price" showError={showPriceError} 
                        errorText={ lang === 'hun' ? 'Kizárólag számot tartalmazhat!' : 'Only numbers are allowed!' }
                    />
                </div>
                <div className="flex-1 mx-2">
                    <BasicSelectInputField 
                        label={ lang === 'hun' ? 'Időtartam (perc)' : 'Time (minutes)' } 
                        value={inputData.time === 0 ? "" : inputData.time} array={timeOptions} 
                        onChange={handleSelectChange} 
                        nameVal="time"
                    />
                </div>
            </section>
            <div className="text-center mx-2">
                <MultilineNonReqInput onChange={handleChange} value={inputData.description} label={ lang === 'hun' ? 'Leírás' : 'Description' } nameVal="description"/>
                <MultilineNonReqInput onChange={handleChange} value={inputData.steps} label={ lang === 'hun' ? 'Lépések' : 'Steps' } nameVal="steps"/>
            </div>
        </>
    )
}

export default FixFields;