import Layout from '../components/Layout'
import '../styles/globals.css'

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
