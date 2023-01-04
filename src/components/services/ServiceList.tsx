import { ServiceListInterface } from "../../interfaces/ServiceInterfaces";
import ServiceCard from "./ServiceCard";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { Container } from 'react-bootstrap';
import Link from "next/link";
import TextField from '@mui/material/TextField';
import ServiceContext from "../../context/ServiceProvider";

interface ServicesListProps {
    services: ServiceListInterface[]
}

const ServiceList = () => {

    const { services } = useContext(ServiceContext);
    const [inputTextValue, setInputTextValue] = useState("");
    const [filteredArray, setFilteredArray] = useState<ServiceListInterface[]>([])

    const changeSearchBarData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTextValue(e.target.value);
        const result = services.filter((service: ServiceListInterface) => {
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
                    <Button
                        className="add-new-client-button" 
                        variant="outlined" 
                        startIcon={<AddCircleOutlineIcon />}>
                        Szolgáltatás hozzáadása
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
                <div>
                    {filteredArray.length === 0
                        ? inputTextValue !== "" && <p>Nincs a keresésnek megfelelő találat!</p>
                        : inputTextValue !== "" && filteredArray.map((service: ServiceListInterface, index: number) => (
                            <ServiceCard
                                key={index}
                                category={service.category}
                                _id={service._id}
                                name={service.name}
                            />
                        ))}
                    {services.length === 0 
                        ? <p>Még nem adtál hozzá szolgáltatást!</p>
                        : inputTextValue === "" && services.map((service: ServiceListInterface, index: number) => (
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