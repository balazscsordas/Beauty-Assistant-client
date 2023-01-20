import '../../styles/index.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthProvider'
import NextNProgress from 'nextjs-progressbar';
import { ThemeProvider } from '../context/ThemeProvider';
import { AppointmentProvider } from '../context/AppointmentProvider';
import { ClientProvider } from '../context/ClientProvider';
import { ServiceProvider } from '../context/ServiceProvider';


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ClientProvider>
            <ServiceProvider>
             <AppointmentProvider>
               <NextNProgress />
               <Component {...pageProps} />
             </AppointmentProvider>
            </ServiceProvider> 
        </ClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App;