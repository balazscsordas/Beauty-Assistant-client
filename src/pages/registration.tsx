import Head from 'next/head';
import { useContext } from 'react';
import RegistrationForm from '../components/authentication/RegistrationForm';
import LangContext from '../context/LanguageProvider';
import NonAdminLayout from '../Layouts/NonAdminLayout';

const RegistrationPage = () => {

    const { lang } = useContext(LangContext);
    
    return (
        <>
            <Head>
            <title>{ lang === 'hun' ? "Beauty Assistant | Regisztráció" : "Beauty Assistant | Registration" }</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <NonAdminLayout>
                <RegistrationForm />
            </NonAdminLayout>
        </>
    )
}

export default RegistrationPage;