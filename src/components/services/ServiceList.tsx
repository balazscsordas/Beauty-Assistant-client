import { ServiceListInterface } from "../../interfaces/ServiceInterfaces";
import { useState } from 'react';
import Link from "next/link";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AddIconPrimaryButton } from "../smallComponents/Buttons";
import { Searchbar } from "../smallComponents/Searchbars";
import ListComponent from "../smallComponents/ListComponent";

interface Props {
    servicesList: ServiceListInterface[]
}

const ServiceList = ({ servicesList }: Props) => {

    const [inputTextValue, setInputTextValue] = useState("");
    const [filteredArray, setFilteredArray] = useState<ServiceListInterface[]>([])

    const changeSearchBarData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTextValue(e.target.value);
        const result = servicesList.filter((service: ServiceListInterface) => {
            if (e.target.value === "") {
                return service
            }
            else {
                return service.name.toLowerCase().includes(e.target.value.toLowerCase());
            }
        })
        setFilteredArray(result);
    }

    return (
            <section className="text-center max-w-3xl m-auto">
                <h1 className="page-title">Szolgáltatások</h1>
                <Link href="/admin/add-new-service" passHref>
                    <AddIconPrimaryButton text='szolgáltatás hozzáadása' />
                </Link>
                { servicesList.length !== 0 
                    && <Searchbar onChange={changeSearchBarData} value={inputTextValue}/>
                }
                <div>
                    {filteredArray.length === 0
                        ? inputTextValue !== "" && <p>Nincs a keresésnek megfelelő találat.</p>
                        : inputTextValue !== "" && filteredArray.map((service: ServiceListInterface, index: number) => (
                            <ListComponent
                                key={index}
                                name={service.name}
                                url={`/admin/services/${service._id}`}
                                icon={<AccountCircleIcon/>}
                            />
                        ))}
                    {servicesList.length === 0 
                        ? <p>Még nem adtál hozzá szolgáltatást.</p>
                        : inputTextValue === "" && servicesList.map((service: ServiceListInterface, index: number) => (
                            <ListComponent
                                key={index}
                                name={service.name}
                                url={`/admin/services/${service._id}`}
                                icon={<AccountCircleIcon/>}
                            />
                        ))}
                </div>
            </section>
    )
}

export default ServiceList;