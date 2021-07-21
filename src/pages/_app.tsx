import { Header } from '../components/header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

	return(
    <div>
      <Header />
      <main>
        <div className="container">
          <Component {...pageProps} />
        </div>
      </main>

    </div>
	)
}

export default MyApp