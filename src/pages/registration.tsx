import Head from 'next/head';
import RegistrationForm from '../components/authentication/RegistrationForm';
import NonAdminLayout from '../Layouts/NonAdminLayout';

const RegistrationPage = () => {
    return (
        <>
            <Head>
            <title>Beauty Asszisztens | Regisztráció</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <NonAdminLayout>
                <section className="max-w-xl min-h-screen min-w-full flex justify-center items-center">
                    <RegistrationForm />
                </section>
            </NonAdminLayout>
        </>
    )
}

export default RegistrationPage;