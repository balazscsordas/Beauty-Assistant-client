import React, { createContext, ReactNode, useState } from "react";
import { ClientListInterface, ClientOptionNamesInterface } from "../interfaces/ClientInterfaces";

type Props = {
    children: ReactNode
}

interface ClientListContextInterface {
    clients: ClientListInterface[];
    clientOptionNames: ClientOptionNamesInterface;
    openClientOptionDialog: boolean,
    setClients: React.Dispatch<React.SetStateAction<ClientListInterface[]>>;
    setClientOptionNames: React.Dispatch<React.SetStateAction<ClientOptionNamesInterface>>;
    setOpenClientOptionDialog: React.Dispatch<React.SetStateAction<boolean>>;
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
    const [openClientOptionDialog, setOpenClientOptionDialog] = useState<boolean>(false);

    return (
        <ClientContext.Provider value={{ 
                                    clients,
                                    clientOptionNames,
                                    openClientOptionDialog,
                                    setClients,
                                    setClientOptionNames,
                                    setOpenClientOptionDialog,
                                }}>
            {children}
        </ClientContext.Provider>
    )
}

export default ClientContext;