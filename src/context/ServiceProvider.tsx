import React, { createContext, ReactNode, useState } from "react";
import { ServiceListInterface } from "../interfaces/ServiceInterfaces";

type Props = {
    children: ReactNode;
}

interface ServiceListContextInterface {
    services: ServiceListInterface[];
    setServices: React.Dispatch<React.SetStateAction<ServiceListInterface[]>>;
    serviceCategories: string[];
    setServiceCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const ServiceContext = createContext<ServiceListContextInterface>({} as ServiceListContextInterface);

export const ServiceProvider = ({ children }: Props) => {

    const [services, setServices] = useState<ServiceListInterface[]>([]);
    const [serviceCategories, setServiceCategories] = useState<string[]>(["Új kategória hozzáadása"])

    return (
        <ServiceContext.Provider value={{ 
                                    services, 
                                    setServices,
                                    serviceCategories,
                                    setServiceCategories }}>
            {children}
        </ServiceContext.Provider>
    )
}

export default ServiceContext;