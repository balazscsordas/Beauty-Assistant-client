import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

const AppointmentWrapper = ({ children }: Props) => {
    return (
        <section className="bg-white py-4 px-2 rounded-xl my-4 shadow-md max-w-6xl m-auto">
            {children}
        </section>
    )
}

export default AppointmentWrapper;