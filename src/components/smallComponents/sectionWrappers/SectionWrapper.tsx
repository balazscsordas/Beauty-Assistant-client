import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    title?: string;
}

const SectionWrapper = ({ children, title }: Props) => {
    return (
        <section className="bg-white p-4 rounded-xl my-4 shadow-md max-w-4xl m-auto">
            {title && <h3 className="text-center mb-12 font-medium">{title}</h3>}
            {children}
        </section>
    )
}

export default SectionWrapper;