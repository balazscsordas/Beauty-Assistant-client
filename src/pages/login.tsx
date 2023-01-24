import LoginForm from '../components/authentication/LoginForm';
import NonAdminLayout from '../Layouts/NonAdminLayout';

const LoginPage = () => {
    return (
      <NonAdminLayout>
        <section className="max-w-xl min-h-screen min-w-full flex justify-center items-center">
            <LoginForm />
        </section>
      </NonAdminLayout>
    )
}

export default LoginPage;