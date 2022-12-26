import { createContext, ReactNode, useState } from "react";

type Props = {
    children: ReactNode
}

interface AuthContextInterface {
    auth: {
        firstName?: string;
        email?: string;
        accessToken?: string;
    }
    setAuth: React.Dispatch<React.SetStateAction<object>>;
}

type AuthType = {
    firstName?: string;
    email?: string;
    accessToken?: string;
  }

const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthProvider = ({children}: Props) => {
    const [auth, setAuth] = useState<AuthType>({});

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;