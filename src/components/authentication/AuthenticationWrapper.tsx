interface Props {
    children: React.ReactNode;
    title: string;
}

const AuthenticationWrapper = ({ children, title }: Props) => {
    return (
        <section className="max-w-xl w-full px-6 p-12 text-center bg-white rounded-xl shadow-md m-auto">
            <h2 className="font-bold mb-6 sm:mb-8">{title}</h2>
            {children}
        </section>
    )
}

export default AuthenticationWrapper