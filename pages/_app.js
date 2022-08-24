import '../styles/globals.css'
import ContextProvider from '../store/CartProvider'
import {SessionProvider, useSession} from 'next-auth/react'
import { useRouter } from 'next/router'
function MyApp({ Component, pageProps:{session, ...pageProps} }) {
  return <SessionProvider session={session}>
        <ContextProvider>
          {
            Component.auth? (
              <Auth>
                 <Component {...pageProps} />
              </Auth>
            )
            :
          <Component {...pageProps} />
          }
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