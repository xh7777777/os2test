import '@/styles/globals.css'
import FileDir from '@/components/FileDir'
import ContextProvider from '@/components/ContextProvider'
export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <FileDir>
        <Component {...pageProps} />
      </FileDir>
    </ContextProvider>

  )
}
