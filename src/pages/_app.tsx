import '../../styles/index.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthProvider'
import NextNProgress from 'nextjs-progressbar';


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <NextNProgress />
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App;