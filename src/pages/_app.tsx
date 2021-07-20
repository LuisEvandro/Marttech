import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

	return(
    <div>
      <main>
        <div className="container">
          <Component {...pageProps} />
        </div>
      </main>

    </div>
	)
}

export default MyApp