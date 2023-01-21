import { ClientListInterface } from "../../interfaces/ClientInterfaces"; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import Link from "next/link";
import { AddIconPrimaryButton } from "../smallComponents/Buttons";
import { Searchbar } from "../smallComponents/Searchbars";
import ListComponent from "../smallComponents/ListComponent";

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
                <AddIconPrimaryButton text='vendég hozzáadása' />
            </Link>
            { clientsList.length !== 0 
                && <Searchbar onChange={changeSearchBarData} value={inputTextValue}/>
            }
            <div className="client-list">
                {filteredArray.length === 0
                    ? inputTextValue !== "" && <p>Nincs a keresésnek megfelelő találat!</p>
                    : inputTextValue !== "" && filteredArray.map((client: ClientListInterface, index: number) => (
                    <ListComponent
                        key={index}
                        name={client.name}
                        url={`/admin/clients/${client._id}`}
                        icon={<AccountCircleIcon/>}
                    />
                ))}
                {clientsList.length === 0 
                    ? <p>Még nem adtál hozzá vendéget!</p>
                    : inputTextValue === "" && clientsList.map((client: ClientListInterface, index: number) => (
                    <ListComponent
                        key={index}
                        name={client.name}
                        url={`/admin/clients/${client._id}`}
                        icon={<AccountCircleIcon/>}
                    />
                ))}
            </div>
        </section>
    )
}

export default ClientList;