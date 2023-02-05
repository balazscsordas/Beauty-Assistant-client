import React, { createContext, ReactNode, useContext, useState } from "react";
import { ServiceListInterface } from "../interfaces/ServiceInterfaces";
import LangContext from "./LanguageProvider";

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

    const { lang } = useContext(LangContext);

    const [services, setServices] = useState<ServiceListInterface[]>([]);
    const [serviceCategories, setServiceCategories] = useState<string[]>(lang === 'hun' ? ["Új kategória hozzáadása"] : ["Add new category"])

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