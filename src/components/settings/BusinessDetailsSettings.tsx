import axios from "axios";
import { useContext, useState } from "react";
import LangContext from "../../context/LanguageProvider";
import { SalonDataInterface } from "../../interfaces/SalonDataInterface";
import { Alert } from "../smallComponents/Alerts";
import { BasicPrimaryButton } from "../smallComponents/Buttons";
import { OneLineReqInput } from "../smallComponents/InputFields";
import SectionWrapper from "../smallComponents/sectionWrappers/SectionWrapper";

interface Props {
    salonData: SalonDataInterface;
}

const BusinessDetailsSettings = ({ salonData }: Props) => {

    const { lang } = useContext(LangContext);
    const [showSavingAlert, setShowSavingAlert] = useState(false);
    const [showSavingErrorAlert, setShowSavingErrorAlert] = useState(false);
    const [inputData, setInputData] = useState<SalonDataInterface>(salonData ? salonData : { // If they haven't added their data about the business
        name: "",
        address: "",
        adminId: "",
        city: "",
        professions: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInputData(prevValue => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    const handleClick = () => {
        salonData 
            ? saveNewData(inputData)
            : addFirstData(inputData);
    }

    const saveNewData = async (newData: SalonDataInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/settings/save-salon-data";
            const params = { newData };
            const response = await axios.put(url, params, { withCredentials: true });
            setShowSavingAlert(true);
        } catch(err) {
            setShowSavingErrorAlert(true);
        }
    }

    const addFirstData = async (firstData: SalonDataInterface) => {
        try {
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/settings/add-first-salon-data";
            const params = { firstData };
            const response = await axios.post(url, params, { withCredentials: true });
            setShowSavingAlert(true);
        } catch(err) {
            setShowSavingErrorAlert(true);
        }
    }
 
    return (
        <>
            <Alert 
                open={showSavingAlert}
                onClose={() => setShowSavingAlert(false)}
                text={ lang === 'hun' ? "V??llalkoz??s adatainak m??dos??t??sa sikeres volt" : "Successfully modified the business data" }
                severity="success"
            />
            <Alert 
                open={showSavingErrorAlert}
                onClose={() => setShowSavingErrorAlert(false)}
                text={ lang === 'hun' ? "V??llalkoz??s adatainak m??dos??t??sa nem siker??lt" : "Something went wrong, please try again" }
                severity="error"
            />
        
            <SectionWrapper title={ lang === 'hun' ? 'V??llalkoz??s adatai' : 'Business details' }>
                <OneLineReqInput onChange={handleChange} nameVal="name" value={inputData.name} label={ lang === 'hun' ? 'Szalon neve' : 'Name of your salon' }/>
                <OneLineReqInput onChange={handleChange} nameVal="professions" value={inputData.professions} label={ lang === 'hun' ? 'Tev??kenys??g(ek)' : 'Service(s)' }/>
                <OneLineReqInput onChange={handleChange} nameVal="city" value={inputData.city} label={ lang === 'hun' ? 'v??ros' : 'City' }/>
                <OneLineReqInput onChange={handleChange} nameVal="address" value={inputData.address} label={ lang === 'hun' ? 'C??m' : 'Address' }/>
                <div className="mt-6 text-center">
                    <BasicPrimaryButton text={ lang === 'hun' ? 'Ment??s' : 'Save' } onClick={handleClick}/>
                </div>
            </SectionWrapper>
        </>
    )
}

export default BusinessDetailsSettings;