import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    title?: string;
}

const SectionWrapper = ({ children, title }: Props) => {
    return (
        <section className="bg-white p-4 rounded-xl my-6 shadow-md max-w-4xl m-auto">
            {title && <h4 className="text-center mb-12 font-semibold">{title}</h4>}
            {children}
        </section>
    )
}

export default SectionWrapper;