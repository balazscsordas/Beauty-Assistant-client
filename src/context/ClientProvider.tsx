import React, { createContext, ReactNode, useState } from "react";
import { ClientListInterface } from "../interfaces/ClientInterfaces";

type Props = {
    children: ReactNode
}

interface ClientListContextInterface {
    clients: ClientListInterface[];
    setClients: React.Dispatch<React.SetStateAction<ClientListInterface[]>>;
}
const ClientContext = createContext<ClientListContextInterface>({} as ClientListContextInterface);

export const ClientProvider = ({ children }: Props) => {

    const [clients, setClients] = useState<ClientListInterface[]>([]);

    return (
        <ClientContext.Provider value={{ clients, setClients, }}>
            {children}
        </ClientContext.Provider>
    )
}

export default ClientContext;