import '../styles/globals.css'
import ContextProvider from '../store/CartProvider'
import {SessionProvider, useSession} from 'next-auth/react'
import { useRouter } from 'next/router'
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
function MyApp({ Component, pageProps:{session, ...pageProps} }) {
  return <SessionProvider session={session}>
        <ContextProvider>
          <PayPalScriptProvider deferLoading={true}>
          {
            Component.auth? (
              <Auth>
                 <Component {...pageProps} />
              </Auth>
            )
            :
          <Component {...pageProps} />
          }
          </PayPalScriptProvider>
        </ContextProvider>
   </SessionProvider>  
};
const Auth =({children})=>{
  const router= useRouter();
  const { status}= useSession({
    required:true,
    onUnauthenticated(){
      router.push('/unauthorized?message=login required')
    }
  });
  if (status==='loading'){
    return <div>loading</div>
  }
  return children
}

export default MyApp;