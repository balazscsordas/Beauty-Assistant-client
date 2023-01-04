import { createContext, ReactNode, useState } from "react";
import { ServiceListInterface } from "../interfaces/ServiceInterfaces";

type Props = {
    children: ReactNode;
}

interface ServiceListContextInterface {
    services: ServiceListInterface[];
    setServices: React.Dispatch<React.SetStateAction<ServiceListInterface[]>>;
}

const ServiceContext = createContext<ServiceListContextInterface>({} as ServiceListContextInterface);

export const ServiceProvider = ({ children }: Props) => {

    const [services, setServices] = useState<ServiceListInterface[]>([]);

    return (
        <ServiceContext.Provider value={{ services, setServices }}>
            {children}
        </ServiceContext.Provider>
    )
}

export default ServiceContext;