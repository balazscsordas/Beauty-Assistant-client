import '../../styles/index.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthProvider'
import NextNProgress from 'nextjs-progressbar';
import { AppointmentProvider } from '../context/AppointmentProvider';
import { ClientProvider } from '../context/ClientProvider';
import { ServiceProvider } from '../context/ServiceProvider';
import { LangProvider } from '../context/LanguageProvider';


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <LangProvider>
      <AuthProvider>
        <ClientProvider>
            <ServiceProvider>
             <AppointmentProvider>
               <NextNProgress/>
               <Component {...pageProps} />
             </AppointmentProvider>
            </ServiceProvider> 
        </ClientProvider>
      </AuthProvider>
    </LangProvider>
  )
}

export default App;