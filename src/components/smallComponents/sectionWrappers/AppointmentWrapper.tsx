import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

const AppointmentWrapper = ({ children }: Props) => {
    return (
        <section className="bg-white p-4 rounded-xl my-4 shadow-md max-w-5xl m-auto">
            {children}
        </section>
    )
}

export default AppointmentWrapper;