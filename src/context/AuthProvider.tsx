import { createContext, ReactNode, useState } from "react";
import { AuthInterface } from "../interfaces/AuthInterfaces";

type Props = {
    children: ReactNode
}

interface AuthContextInterface {
    auth: AuthInterface | null;
    setAuth: React.Dispatch<React.SetStateAction<AuthInterface | null>>;
}


const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthProvider = ({children}: Props) => {

    const [auth, setAuth] = useState<AuthInterface | null>(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;