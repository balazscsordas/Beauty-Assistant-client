import { ClientListInterface } from "../../interfaces/ClientInterfaces"; 
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useState } from 'react';
import Link from "next/link";
import { AddIconPrimaryButton } from "../smallComponents/Buttons";
import { Searchbar } from "../smallComponents/Searchbars";
import ListComponent from "../smallComponents/ListComponent";
import SectionWrapper from "../smallComponents/sectionWrappers/SectionWrapper";
import LangContext from "../../context/LanguageProvider";

interface Props {
    clientsList: ClientListInterface[]
}

const ClientList = ({ clientsList }: Props) => {

    const { lang } = useContext(LangContext);
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
        
        <section className="text-center">
            <h1 className="page-title">{ lang === 'hun' ? 'Vendégek' : 'Clients' }</h1>
            <SectionWrapper>
                <Link href="/admin/add-new-client" passHref>
                    <AddIconPrimaryButton text={ lang === 'hun' ? 'vendég hozzáadása' : "add new client" } />
                </Link>
                <Searchbar onChange={changeSearchBarData} value={inputTextValue}/>
                <div>
                    {filteredArray.length === 0
                        ? inputTextValue !== "" && <p>{ lang === 'hun' ? 'Nincs a keresésnek megfelelő találat!' : "There isn't any client matching your search result!" }</p>
                        : inputTextValue !== "" && filteredArray.map((client: ClientListInterface, index: number) => (
                        <ListComponent
                            key={index}
                            name={client.name}
                            url={`/admin/clients/${client._id}`}
                            icon={<AccountCircleIcon/>}
                        />
                    ))}
                    {clientsList.length === 0 
                        ? <p>{ lang === 'hun' ? 'Még nem adtál hozzá vendéget!' : "You haven't added any client yet!" }</p>
                        : inputTextValue === "" && clientsList.map((client: ClientListInterface, index: number) => (
                        <ListComponent
                            key={index}
                            name={client.name}
                            url={`/admin/clients/${client._id}`}
                            icon={<AccountCircleIcon/>}
                        />
                    ))}
                </div>
            </SectionWrapper>
        </section>
    )
}

export default ClientList;