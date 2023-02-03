import { ReactNode } from "react";

type Props = {
    children: ReactNode;
}

const StatWrapper = ({ children }: Props) => {

    return (
        <section className="bg-white p-6 rounded-xl my-4 shadow-md m-auto flex-1 xl:mx-6">
            {children}
        </section>
    )
}

export default StatWrapper;