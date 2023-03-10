import axios from "axios";
import { useState, useContext } from "react";
import LangContext from "../../../context/LanguageProvider";
import { SalonDataInterface } from "../../../interfaces/SalonDataInterface";
import { Alert } from "../../smallComponents/Alerts";
import { BasicPrimaryButton } from "../../smallComponents/Buttons";
import { OneLineReqInput } from "../../smallComponents/InputFields";

interface Props {
    setSalonList: React.Dispatch<React.SetStateAction<null | SalonDataInterface[]>>;
}

const SalonSearchbar = ({ setSalonList }: Props) => {

    const { lang } = useContext(LangContext);
    const [inputData, setInputData] = useState("");
    const [loading, setLoading] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showNoResultMessage, setShowNoResultMessage] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInputData(value);
    }

    const handleClick = async () => {
        inputData !== "" && getSalonList(inputData);
        setInputData("");
    }

    const getSalonList = async (data: string) => {
        try {
            setLoading(true);
            const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/book-appointment/get-salon-list/";
            const options = {
                params: {
                    data
                }
            }
            const response = await axios.get(url, options);
            const foundSalons = response.data.foundSalons;
            setSalonList(foundSalons);
            foundSalons.length === 0 ? setShowNoResultMessage(true) : setShowNoResultMessage(false);
            setLoading(false);
        } catch(err) {
            setShowErrorAlert(true);
            setLoading(false);
            err instanceof Error && console.log(err.message)
        }
    }

    return (
        <>
        <Alert 
            open={showErrorAlert}
            onClose={() => setShowErrorAlert(false)}
            text={ lang === 'hun' ? "Valami probl??ma t??rt??nt, k??rlek pr??b??ld ??jra" : "Something went wrong, please try again" }
            severity="error"
        />
        <div className="max-w-3xl m-auto text-center mb-10">
            <div className="my-6">
                <OneLineReqInput label={ lang === 'hun' ? "Szalon neve" : "Name of the salon" } value={inputData} onChange={handleChange} 
                errorText={ lang === 'hun' ? "Nincs a keres??snek megfelel?? tal??lat!" : "There isn't any salon name matching your input data!"}
                showError={showNoResultMessage}
            />
            </div>
            <BasicPrimaryButton text={ lang === 'hun' ? "Keres??s" : "Search" } onClick={handleClick} disabled={loading}/>
        </div>
        </>
    )
}

export default SalonSearchbar;