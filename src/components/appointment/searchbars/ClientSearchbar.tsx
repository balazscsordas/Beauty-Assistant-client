import { Collapse, TextField } from "@mui/material";
import { useState, useContext } from "react";
import ClientContext from "../../../context/ClientProvider";
import { ClientListInterface } from "../../../interfaces/ClientInterfaces";
import ClientCard from "../../clients/ClientCard";

const ClientSearchbar = () => {

    const { clients } = useContext(ClientContext);

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


    return (
        <div className="searchbar-section">
            <TextField
                onChange={changeSearchBarData}
                type="search"
                variant="outlined"
                name="client-searchbar"
                value={clientSearchbarValue}
                fullWidth
                label="Írd be a vendég nevét"
            />
            <Collapse in={showFilteredClients}>
                {filteredClientList.length === 0
                    ? clientSearchbarValue !== "" && <p>Nincs a keresésnek megfelelő találat!</p>
                    : clientSearchbarValue !== "" && filteredClientList.map((client: ClientListInterface, index: number) => (
                    <ClientCard
                        key={index}
                        _id={client._id}
                        age={client.age}
                        name={client.name}
                    />
                ))}
            </Collapse>
        </div>
    )
}

export default ClientSearchbar;