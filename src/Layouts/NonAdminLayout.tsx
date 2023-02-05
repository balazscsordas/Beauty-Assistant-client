import { ReactNode } from "react";
import NonAdminFooter from "../components/homepage/NonAdminFooter";
import NonAdminHeader from "../components/homepage/NonAdminHeader";

type Props = {
    children: ReactNode
}

const NonAdminLayout = ({ children }: Props) => {

    return (
        <section className="min-h-screen flex flex-col">
            <NonAdminHeader/>
            {children}
            <NonAdminFooter/>
        </section>
    )
}

export default NonAdminLayout