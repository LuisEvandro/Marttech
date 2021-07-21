import { Header } from '../components/header'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


import { CartProvider } from '../contexts/cartContext';


function MyApp({ Component, pageProps }) {

  return (
      <div>
        <CartProvider>
          <ToastContainer />
          <Header />
          <main>
            <div className="container">
              <Component {...pageProps} />
            </div>
          </main>
        </CartProvider>

      </div>
  )
}

export default MyApp