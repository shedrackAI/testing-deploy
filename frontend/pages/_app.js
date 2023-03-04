import Layout from '../components/Layout'
import { AppProvider } from '../contexts/AppContext'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <ToastContainer limit={1}/>
        <Component {...pageProps} />
      </Layout>
    </AppProvider>
  ) 
}

export default MyApp
