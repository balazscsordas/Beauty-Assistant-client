import React, { createContext, ReactNode, useState } from "react";
import { ClientListInterface, ClientOptionNamesInterface } from "../interfaces/ClientInterfaces";

type Props = {
    children: ReactNode
}

interface ClientListContextInterface {
    clients: ClientListInterface[];
    clientOptionNames: ClientOptionNamesInterface;
    openAddClientOptionDialog: boolean,
    setClients: React.Dispatch<React.SetStateAction<ClientListInterface[]>>;
    setClientOptionNames: React.Dispatch<React.SetStateAction<ClientOptionNamesInterface>>;
    setOpenAddClientOptionDialog: React.Dispatch<React.SetStateAction<boolean>>;
}
const ClientContext = createContext<ClientListContextInterface>({} as ClientListContextInterface);

export const ClientProvider = ({ children }: Props) => {

    const [clients, setClients] = useState<ClientListInterface[]>([]);
    const [clientOptionNames, setClientOptionNames] = useState<ClientOptionNamesInterface>({
        option1Name: "",
        option2Name: "",
        option3Name: "",
        option4Name: "",
        option5Name: "",
    })
    const [openAddClientOptionDialog, setOpenAddClientOptionDialog] = useState<boolean>(false);

    return (
        <ClientContext.Provider value={{ 
                                    clients,
                                    clientOptionNames,
                                    openAddClientOptionDialog,
                                    setClients,
                                    setClientOptionNames,
                                    setOpenAddClientOptionDialog,
                                }}>
            {children}
        </ClientContext.Provider>
    )
}

export default ClientContext;