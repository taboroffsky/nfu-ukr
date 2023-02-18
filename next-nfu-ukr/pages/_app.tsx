import '../styles/globals.scss'
import type { AppProps } from 'next/app'

import Layout from '../components/Layout/Layout'
import { MoralisProvider } from 'react-moralis'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider initializeOnMount={false}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </MoralisProvider>
  )
}
