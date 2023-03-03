import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { globalStyles } from "styles";

const cache = createCache({ key: "next" });

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={cache}>
      {globalStyles}
      {getLayout(<Component {...pageProps} />)}
    </CacheProvider>
  );
}
