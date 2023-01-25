import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

const AppointmentWrapper = ({ children }: Props) => {
    return (
        <section className="bg-white py-4 px-2 rounded-xl my-4 shadow-md w-[600px] sm:w-[800px] lg:w-[1100px] m-auto">
            {children}
        </section>
    )
}

export default AppointmentWrapper;