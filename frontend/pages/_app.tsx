import "@portaljs/components/styles.css";
import "@/styles/globals.scss";
import "@/styles/tabs.scss";

import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import SEO from "../next-seo.config";

import Loader from "../components/_shared/Loader";

import { Fira_Sans } from 'next/font/google'

const FiraSans = Fira_Sans({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] })

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <main className={`${FiraSans.className}`}>
        <DefaultSeo {...SEO} />
        <Loader />
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  );
}

export default MyApp;
