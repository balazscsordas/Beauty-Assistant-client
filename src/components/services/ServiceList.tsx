import { ServiceListInterface } from "../../interfaces/ServiceInterfaces";
import { useContext, useState } from 'react';
import Link from "next/link";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AddIconPrimaryButton } from "../smallComponents/Buttons";
import { Searchbar } from "../smallComponents/Searchbars";
import ListComponent from "../smallComponents/ListComponent";
import SectionWrapper from "../smallComponents/sectionWrappers/SectionWrapper";
import LangContext from "../../context/LanguageProvider";

interface Props {
    servicesList: ServiceListInterface[]
}

const ServiceList = ({ servicesList }: Props) => {

    const { lang } = useContext(LangContext)

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
            <section className="text-center">
                <h1 className="page-title">{ lang === 'hun' ? 'Szolgáltatások' : 'Services' }</h1>
                <SectionWrapper>
                    <Link href="/admin/add-new-service" passHref>
                        <AddIconPrimaryButton text={ lang === 'hun' ? 'Szolgáltatás hozzáadása' : 'add new service' } />
                    </Link>
                    <Searchbar onChange={changeSearchBarData} value={inputTextValue}/>
                    <div>
                        {filteredArray.length === 0
                            ? inputTextValue !== "" && <p>{ lang === 'hun' ? 'Nincs a keresésnek megfelelő találat!' : "There isn't any client matching your search result!" }</p>
                            : inputTextValue !== "" && filteredArray.map((service: ServiceListInterface, index: number) => (
                                <ListComponent
                                    key={index}
                                    name={service.name}
                                    url={`/admin/services/${service._id}`}
                                    icon={<AccountCircleIcon/>}
                                />
                            ))}
                        {servicesList.length === 0 
                            ? <p>{ lang === 'hun' ? 'Még nem adtál hozzá szolgáltatást!' : "You haven't added any service yet!" }</p>
                            : inputTextValue === "" && servicesList.map((service: ServiceListInterface, index: number) => (
                                <ListComponent
                                    key={index}
                                    name={service.name}
                                    url={`/admin/services/${service._id}`}
                                    icon={<AccountCircleIcon/>}
                                />
                            ))}
                    </div>
                </SectionWrapper>
            </section>
    )
}

export default ServiceList;