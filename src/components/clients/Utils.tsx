import axios from "axios";
import { ClientOptionNamesInterface } from "../../interfaces/ClientInterfaces";

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

export const fetchClientOptionNames = async (setClientOptionNames: React.Dispatch<React.SetStateAction<ClientOptionNamesInterface>>) => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_AUTH_SERVER + "/client/get-option-names-list";
    const response = await axios.get(url, { withCredentials: true });
    const clientOptionNames: ClientOptionNamesInterface = response.data.clientOptionNamesWithoutId;
    setClientOptionNames(clientOptionNames);
}