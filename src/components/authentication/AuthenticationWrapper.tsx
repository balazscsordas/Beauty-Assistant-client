interface Props {
    children: React.ReactNode;
    title: string;
}

const AuthenticationWrapper = ({ children, title }: Props) => {
    return (
        <section className="max-w-xl w-full px-6 p-12 text-center m-3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-600 to-indigo-800 rounded-xl shadow-md text-white">
            <h3 className="font-bold mb-8">{title}</h3>
            {children}
        </section>
    )
}

export default AuthenticationWrapper