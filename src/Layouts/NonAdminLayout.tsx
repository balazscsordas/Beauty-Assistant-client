import { ReactNode } from "react";
import NonAdminFooter from "../components/homepage/NonAdminFooter";
import NonAdminHeader from "../components/homepage/NonAdminHeader";

type Props = {
    children: ReactNode
}

const NonAdminLayout = ({ children }: Props) => {

    return (
        <>
            {children}
            <NonAdminFooter/>
        </>
    )
}

export default NonAdminLayout