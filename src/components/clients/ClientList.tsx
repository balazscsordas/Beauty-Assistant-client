import { ClientListInterface } from "../../interfaces/ClientInterfaces"; 
import ClientCard from "./ClientCard";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Link from "next/link";
import TextField from '@mui/material/TextField';

interface Props {
    clientsList: ClientListInterface[]
}

const ClientList = ({ clientsList }: Props) => {

    const [inputTextValue, setInputTextValue] = useState("");
    const [filteredArray, setFilteredArray] = useState<ClientListInterface[]>([])

    const changeSearchBarData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTextValue(e.target.value);
        const result = clientsList.filter((client: ClientListInterface) => {
            if (e.target.value === "") {
                return client
            }
            else {
                return client.name.toLowerCase().includes(e.target.value.toLowerCase());
            }
        })
        setFilteredArray(result);
    }

    return (
            <section id="client-list-section">
                <h1 className="page-title">Vendégek</h1>
                <Link href="/admin/add-new-client" passHref>
                    <Button 
                        className="add-new-client-button" 
                        variant="outlined" 
                        startIcon={<AddCircleOutlineIcon />}>
                        Vendég hozzáadása
                    </Button>
                </Link>
                <div className="searchbar-section">
                <TextField
                    onChange={changeSearchBarData}
                    type="search"
                    variant="outlined"
                    name="searchbar"
                    value={inputTextValue}
                    id="searchbar"
                    fullWidth
                    label="Keresés"
                />
                </div>
                <div className="client-list">
                    {filteredArray.length === 0
                        ? inputTextValue !== "" && <p>Nincs a keresésnek megfelelő találat!</p>
                        : inputTextValue !== "" && filteredArray.map((client: ClientListInterface, index: number) => (
                        <ClientCard
                            key={index}
                            _id={client._id}
                            age={client.age}
                            name={client.name}
                        />
                    ))}
                    {clientsList.length === 0 
                        ? <p>Még nem adtál hozzá vendéget!</p>
                        : inputTextValue === "" && clientsList.map((client: ClientListInterface, index: number) => (
                        <ClientCard
                            key={index}
                            _id={client._id}
                            age={client.age}
                            name={client.name}
                        />
                    ))}
                </div>
            </section>
    )
}

export default ClientList;