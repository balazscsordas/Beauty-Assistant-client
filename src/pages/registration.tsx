import RegistrationForm from '../components/authentication/RegistrationForm';
import NonAdminLayout from '../Layouts/NonAdminLayout';

const RegistrationPage = () => {
    return (
        <NonAdminLayout>
            <section className="max-w-xl min-h-screen min-w-full flex justify-center items-center">
                <RegistrationForm />
            </section>
        </NonAdminLayout>
    )
}

export default RegistrationPage;