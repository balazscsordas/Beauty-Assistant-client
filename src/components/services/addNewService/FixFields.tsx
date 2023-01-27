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
                    <OneLineReqInput 
                            onChange={handleChange} 
                            value={inputData.name} 
                            label="Név" 
                            nameVal="name"
                        />
                </div>
                <div className="flex-1 mx-2">
                    {inputData.category === 'Új kategória hozzáadása' || categoryList.length === 1
                        ? <OneLineReqInput label="Kategória" nameVal="newCategory" value={newCategory} onChange={handleSelectChange}/>
                        : <BasicSelectInputField 
                                label="Kategória" 
                                value={inputData.category}
                                array={categoryList}
                                onChange={handleSelectChange}
                                nameVal="category"
                            />
                    }
                </div>
                <div className="flex-1 mx-2">
                    <OneLineReqInput 
                        onChange={handleChange} 
                        value={inputData.price === 0 ? "" : inputData.price} 
                        label="Ár (Ft)" 
                        nameVal="price"
                        showError={showPriceError}
                        errorText="Kizárólag számot tartalmazhat!"
                    />
                </div>
                <div className="flex-1 mx-2">
                    <BasicSelectInputField 
                        label="Időtartam (perc)" 
                        value={inputData.time === 0 ? "" : inputData.time}
                        array={timeOptions}
                        onChange={handleSelectChange}
                        nameVal="time"
                    />
                </div>
            </section>
            <div>
                <MultilineNonReqInput onChange={handleChange} value={inputData.description} label="Leírás" nameVal="description"/>
            </div>
        </>
    )
}

export default FixFields;