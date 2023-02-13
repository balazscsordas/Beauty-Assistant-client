import Head from 'next/head';
import BookAppointmentButton from '../components/appointment-booking/BookAppointmentButton';
import AuthenticationSection from '../components/homepage/AuthenticationSection';
import FeatureList from '../components/homepage/features/FeatureList';
import MainBanner from '../components/homepage/MainBanner';
import NonAdminLayout from '../Layouts/NonAdminLayout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Beauty Assistant</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NonAdminLayout>
        <BookAppointmentButton/>
        <MainBanner/>
        <FeatureList />
        <AuthenticationSection />
      </NonAdminLayout>
    </>
  )
}
