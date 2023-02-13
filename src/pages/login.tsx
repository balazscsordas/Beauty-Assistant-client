import Head from 'next/head';
import { useContext } from 'react';
import LoginForm from '../components/authentication/LoginForm';
import LangContext from '../context/LanguageProvider';
import NonAdminLayout from '../Layouts/NonAdminLayout';

const LoginPage = () => {

  const { lang } = useContext(LangContext);
  
    return (
      <>
        <Head>
          <title>{ lang === 'hun' ? "Beauty Assistant | Bejelentkezés" : "Beauty Assistant | Login" }</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NonAdminLayout>
            <LoginForm />
        </NonAdminLayout>
      </>
    )
}

export default LoginPage;