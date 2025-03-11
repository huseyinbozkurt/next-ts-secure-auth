import type { AppProps } from "next/app";
import { StoreProvider } from "../app/storeProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;
