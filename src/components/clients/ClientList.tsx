import { ClientListInterface } from "../../interfaces/ClientInterfaces"; 
import ClientCard from "./ClientCard";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Container, Row } from 'react-bootstrap';
import Link from "next/link";
import TextField from '@mui/material/TextField';

const ClientList = ({ clients }: ClientListInterface[]) => {

    const [inputTextValue, setInputTextValue] = useState("");
    const [filteredArray, setFilteredArray] = useState<ClientListInterface[]>([])

    const changeSearchBarData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTextValue(e.target.value);
        const result = clients.filter((client: ClientListInterface) => {
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
                <>
                    <h1 className="section-title">Vendégek</h1>
                    <div className="button-block">
                        <Link href="/admin/add-new-client" passHref>
                            <Button 
                                className="add-new-client-button" 
                                variant="outlined" 
                                startIcon={<AddCircleOutlineIcon />}>
                                Vendég hozzáadása
                            </Button>
                        </Link>
                    </div>
                    <div className="searchbar-section">
                    <TextField
                        onChange={changeSearchBarData}
                        variant="outlined"
                        name="searchbar"
                        value={inputTextValue}
                        id="searchbar"
                        fullWidth
                        label="Keresés"
                    />
                    </div>
                    <Container className="client-list">
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
                        {clients.length === 0 
                            ? <p>Még nem adtál hozzá vendéget!</p>
                            : inputTextValue === "" && clients.map((client: ClientListInterface, index: number) => (
                            <ClientCard
                                key={index}
                                _id={client._id}
                                age={client.age}
                                name={client.name}
                            />
                        ))}
                    </Container>
                </>
            </section>
    )
}

export default ClientList;