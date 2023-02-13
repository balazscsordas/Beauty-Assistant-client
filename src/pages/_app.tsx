import '../../styles/index.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthProvider'
import NextNProgress from 'nextjs-progressbar';
import { AppointmentProvider } from '../context/AppointmentProvider';
import { ClientProvider } from '../context/ClientProvider';
import { ServiceProvider } from '../context/ServiceProvider';
import { LangProvider } from '../context/LanguageProvider';
import { BookAppointmentProvider } from '../context/BookAppointmentProvider';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <LangProvider>
      <BookAppointmentProvider>
        <AuthProvider>
          <ClientProvider>
              <ServiceProvider>
              <AppointmentProvider>
                <NextNProgress options={{ showSpinner: false }}/>
                <Component {...pageProps} />
              </AppointmentProvider>
              </ServiceProvider> 
          </ClientProvider>
        </AuthProvider>
      </BookAppointmentProvider>
    </LangProvider>
  )
}

export default App;