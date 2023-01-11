import { ServiceListInterface } from "../../interfaces/ServiceInterfaces";
import ServiceCard from "./ServiceCard";
import { useState } from 'react';
import Link from "next/link";
import TextField from '@mui/material/TextField';
import { AddIconPrimaryButton } from "../smallComponents/Buttons";

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
            <section id="service-list-section">
                <h1 className="page-title">Szolgáltatások</h1>
                <Link href="/admin/add-new-service" passHref>
                    <AddIconPrimaryButton text='szolgáltatás hozzáadása' />
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
                <div>
                    {filteredArray.length === 0
                        ? inputTextValue !== "" && <p>Nincs a keresésnek megfelelő találat.</p>
                        : inputTextValue !== "" && filteredArray.map((service: ServiceListInterface, index: number) => (
                            <ServiceCard
                                key={index}
                                category={service.category}
                                _id={service._id}
                                name={service.name}
                            />
                        ))}
                    {servicesList.length === 0 
                        ? <p>Még nem adtál hozzá szolgáltatást.</p>
                        : inputTextValue === "" && servicesList.map((service: ServiceListInterface, index: number) => (
                            <ServiceCard
                                key={index}
                                _id={service._id}
                                category={service.category}
                                name={service.name}
                            />
                        ))}
                </div>
            </section>
    )
}

export default ServiceList;