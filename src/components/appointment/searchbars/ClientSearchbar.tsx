import { Collapse, IconButton, TextField } from "@mui/material";
import { useState, useContext } from "react";
import ClientContext from "../../../context/ClientProvider";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ClientListInterface } from "../../../interfaces/ClientInterfaces";
import AppointmentContext from "../../../context/AppointmentProvider";

const ClientSearchbar = () => {

    const { clients } = useContext(ClientContext);
    const { setNewAppointmentData } = useContext(AppointmentContext);

    const [clientSearchbarValue, setClientSearchbarValue] = useState("");
    const [filteredClientList, setFilteredClientList] = useState<ClientListInterface[]>([])
    const [showFilteredClients, setShowFilteredClients] = useState(false);

    const changeSearchBarData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientSearchbarValue(e.target.value);
        const result = clients.filter((client: ClientListInterface) => {
            if (e.target.value === "") {
                setShowFilteredClients(false);
                return client
            }
            else {
                setShowFilteredClients(true);
                return client.name.toLowerCase().includes(e.target.value.toLowerCase());
            }
        })
        setFilteredClientList(result);
    }

    const setClient = (_id: string | undefined, name: string) => {
        _id && setNewAppointmentData(prevData => {
            return {
                ...prevData,
                clientId: _id,
            }
        })
        setClientSearchbarValue(name);
        setShowFilteredClients(false);
    }


    return (
        <div className="searchbar-section">
            <TextField
                onChange={changeSearchBarData}
                type="search"
                variant="outlined"
                value={clientSearchbarValue}
                fullWidth
                label="Vendég neve"
            />
            <Collapse in={showFilteredClients}>
                {filteredClientList.length === 0
                    ? clientSearchbarValue !== "" && <p>Nincs a keresésnek megfelelő találat!</p>
                    : clientSearchbarValue !== "" && filteredClientList.map((client: ClientListInterface, index: number) => (
                        <section id="client-card-section" key={index}>
                            <div className="head-block">
                                <h4 className="name-title">{client.name}</h4>
                                <IconButton onClick={() => setClient(client._id, client.name)} className="hamburger-icon" aria-label="add">
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </div>
                        </section>
                ))}
            </Collapse>
        </div>
    )
}

export default ClientSearchbar;