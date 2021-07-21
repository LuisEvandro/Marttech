import { Header } from '../components/header'
import '../styles/globals.css'

import { CartProvider } from '../contexts/cartContext';


function MyApp({ Component, pageProps }) {

  return (
      <div>
        <CartProvider>
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