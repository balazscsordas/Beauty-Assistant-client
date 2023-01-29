import { Collapse, IconButton } from "@mui/material";
import { useState, useContext } from "react";
import ClientContext from "../../../../context/ClientProvider";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ClientListInterface } from "../../../../interfaces/ClientInterfaces";
import AppointmentContext from "../../../../context/AppointmentProvider";
import { OneLineReqInput } from "../../../smallComponents/InputFields";
import SearchbarResultItem from "../../SearchbarResultItem";

const ClientSearchbar = () => {

    const { clients } = useContext(ClientContext);
    const { setEditAppointmentData, editAppointmentData } = useContext(AppointmentContext);

    const [clientSearchbarValue, setClientSearchbarValue] = useState(editAppointmentData.clientName);
    const [filteredClientList, setFilteredClientList] = useState<ClientListInterface[]>([])
    const [showFilteredClients, setShowFilteredClients] = useState(false);

    const changeSearchBarData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setClientSearchbarValue(value);
        const result = clients.filter((client: ClientListInterface) => {
            if (value === "") {
                setShowFilteredClients(false);
                return client
            }
            else {
                setShowFilteredClients(true);
                return client.name.toLowerCase().includes(value.toLowerCase());
            }
        })
        setFilteredClientList(result);
    }

    const setClient = (_id: string | undefined, name: string) => {
        _id && setEditAppointmentData(prevData => {
            return {
                ...prevData,
                clientId: _id,
            }
        })
        setClientSearchbarValue(name);
        setShowFilteredClients(false);
    }

    return (
        <div className="appointment-searchbar-section">
            <OneLineReqInput 
                onChange={changeSearchBarData} 
                type="search" 
                value={clientSearchbarValue} 
                label="Vendég neve"
            />
            <Collapse in={showFilteredClients}>
                {filteredClientList.length === 0
                    ? clientSearchbarValue !== "" && <p className='no-content-message'>Nincs a keresésnek megfelelő találat!</p>
                    : clientSearchbarValue !== "" && filteredClientList.map((client: ClientListInterface, index: number) => (
                        <SearchbarResultItem 
                            key={index}
                            onClick={() => setClient(client._id, client.name)}
                            name={client.name}
                        />
                ))}
            </Collapse>
        </div>
    )
}

export default ClientSearchbar;