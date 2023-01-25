import React, { createContext, ReactNode, useEffect, useState } from "react";
import { AuthInterface } from "../interfaces/AuthInterfaces";

type Props = {
    children: ReactNode
}

interface AuthContextInterface {
    auth: AuthInterface | null;
    setAuth: React.Dispatch<React.SetStateAction<AuthInterface | null>>;
    firstName: string | null;
    setFirstName: React.Dispatch<React.SetStateAction<string | null>>;
}


const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthProvider = ({children}: Props) => {

    const [auth, setAuth] = useState<AuthInterface | null>(null);
    const [firstName, setFirstName] = useState<string | null>(null);

    useEffect(() => {
        if (!auth) {
            setFirstName(localStorage.getItem('firstName'));
        }
    }, [auth?.firstName])

    return (
        <AuthContext.Provider value={{ auth, setAuth, firstName, setFirstName }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;