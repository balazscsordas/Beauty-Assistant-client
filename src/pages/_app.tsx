import '../../styles/index.scss'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthProvider'


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App;