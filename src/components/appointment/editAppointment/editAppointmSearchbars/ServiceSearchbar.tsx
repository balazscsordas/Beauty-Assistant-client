import { Collapse, IconButton, TextField } from "@mui/material";
import { useState, useContext } from "react";
import ServiceContext from "../../../../context/ServiceProvider";
import { ServiceListInterface } from "../../../../interfaces/ServiceInterfaces";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AppointmentContext from "../../../../context/AppointmentProvider";
import { OneLineReqInput } from "../../../smallComponents/InputFields";

const ServiceSearchbar = () => {

    const { services } = useContext(ServiceContext);
    const { setEditAppointmentData, editAppointmentData, emptyRowsForServiceLength } = useContext(AppointmentContext);

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
                type="search" value={serviceSearchbarValue} 
                label="Kezelés neve"
            />
            <Collapse in={showFilteredServices}>
                {filteredServiceList.length === 0
                    ? serviceSearchbarValue !== "" && <p className='no-content-message'>Nincs a keresésnek megfelelő találat!</p>
                    : serviceSearchbarValue !== "" && filteredServiceList.map((service: ServiceListInterface, index: number) => (
                        <section id="card-section" key={index}>
                            <div className="head-block">
                                <h5 className="name-title">{service.name}</h5>
                                <IconButton onClick={() => setService(service._id, service.name)} className="hamburger-icon" aria-label="add">
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </div>
                        </section>
                ))}
            </Collapse>
        </div>
    )
}

export default ServiceSearchbar;