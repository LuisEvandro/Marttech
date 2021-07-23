import { CartProvider } from '../contexts/cartContext';
import { Header } from '../components/header'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../contexts/authContext';

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <CartProvider>
        <div>
            <ToastContainer />
            <Header />
            <main>
              <div className="container">
                <Component {...pageProps} />
              </div>
            </main>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default MyApp