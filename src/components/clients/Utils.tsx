import axios from "axios";
import { ClientOptionNamesInterface } from "../../interfaces/ClientInterfaces";

// returns true if format of age is not valid
export const ageValidator = (value: string) => {
    if(!value || ( value[value.length-1].match('[0-9]') && value[0].match('[1-9]'))) {
        return false;
    } else {
        return true;
    }
}

export const mobileNumberValidator = (value: string) => {
    if (value.charAt(0) !== '+' && value.length > 0) {
        return true
    } else {
        return false
    }
}

// returns true if string contains number
export const nameValidator = (value: string) => {
    return /\d/.test(value); 
}

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export const fetchClientOptionNames = async (setClientOptionNames: React.Dispatch<React.SetStateAction<ClientOptionNamesInterface>>) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/client/get-option-names-list";
    const response = await axios.get(url, { withCredentials: true });
    const clientOptionNames: ClientOptionNamesInterface = response.data.clientOptionNamesWithoutId;
    setClientOptionNames(clientOptionNames);
}