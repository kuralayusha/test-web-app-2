import Layout from '../components/Layout'
import '../styles/globals.css'
import '../styles/test.css'
import '../styles/home.css'
import '../styles/filters.css'
import '../styles/mediaQueries.css'

type AppProps = {
  Component: React.ComponentType
  pageProps: any
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
