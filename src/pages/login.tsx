import Head from 'next/head';
import LoginForm from '../components/authentication/LoginForm';
import NonAdminLayout from '../Layouts/NonAdminLayout';

const LoginPage = () => {
    return (
      <>
        <Head>
          <title>Beauty Asszisztens | Bejelentkezés</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NonAdminLayout>
          <section className="max-w-xl min-h-screen min-w-full flex justify-center items-center">
              <LoginForm />
          </section>
        </NonAdminLayout>
      </>
    )
}

export default LoginPage;