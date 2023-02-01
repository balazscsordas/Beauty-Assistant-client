import { Collapse } from "@mui/material";
import { useState, useContext } from "react";
import ServiceContext from "../../../../context/ServiceProvider";
import { ServiceListInterface } from "../../../../interfaces/ServiceInterfaces";
import AppointmentContext from "../../../../context/AppointmentProvider";
import { OneLineReqInput } from "../../../smallComponents/InputFields";
import SearchbarResultItem from "../../SearchbarResultItem";
import LangContext from "../../../../context/LanguageProvider";

const ServiceSearchbar = () => {

    const { lang } = useContext(LangContext);
    const { services } = useContext(ServiceContext);

    const { setEditAppointmentData, editAppointmentData, emptyRowsForServiceLength } = useContext(AppointmentContext);
    console.log(emptyRowsForServiceLength);

    const [serviceSearchbarValue, setServiceSearchbarValue] = useState(editAppointmentData.serviceName);
    const [filteredServiceList, setFilteredServiceList] = useState<ServiceListInterface[]>([]);
    const [showFilteredServices, setShowFilteredServices] = useState(false);

    const changeSearchBarData = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setServiceSearchbarValue(value);
        const result = services.filter((service: ServiceListInterface) => {
            if (value === "") {
                setShowFilteredServices(false);
                return service
            }
            else {
                setShowFilteredServices(true);
                if (emptyRowsForServiceLength) {
                    return checkServiceLengthAndName(service, value, emptyRowsForServiceLength);
                }
            }
        })
        setFilteredServiceList(result);
    }

    function checkServiceLengthAndName (service: ServiceListInterface, value: string, numberOfEmptyRows: number) {
        if (service.time) {
            if (service.name.toLowerCase().includes(value.toLowerCase()) && service.time <= (numberOfEmptyRows * 15)) {
                return true;
            }
        } else {
            return false;
        }
    }

    const setService = (_id: string | undefined, name: string) => {
        _id && setEditAppointmentData(prevData => {
            return {
                ...prevData,
                serviceId: _id,
            }
        })
        setServiceSearchbarValue(name);
        setShowFilteredServices(false);
    }

    return (
        <div className="appointment-searchbar-section">
            <OneLineReqInput 
                onChange={changeSearchBarData} 
                type="search" 
                value={serviceSearchbarValue} 
                label={ lang === 'hun' ? 'Kezelés neve' : 'Service name' }
            />
            <Collapse in={showFilteredServices}>
                {filteredServiceList.length === 0
                    ? serviceSearchbarValue !== "" && <p>{ lang === 'hun' ? 'Nincs a keresésnek megfelelő találat!' : "There isn't any service matching your search result!" }</p>
                    : serviceSearchbarValue !== "" && filteredServiceList.map((service: ServiceListInterface, index: number) => (
                        <SearchbarResultItem 
                            key={index}
                            onClick={() => setService(service._id, service.name)}
                            name={service.name}
                        />
                ))}
            </Collapse>
        </div>
    )
}

export default ServiceSearchbar;