import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { store } from '../src/store/store';


export default function App({ Component, pageProps }: AppProps) {
  // return <Component {...pageProps} />
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
