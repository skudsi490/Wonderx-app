import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ProfileProvider } from "./ProfileContext";
import { UserProvider } from "./UserContext";
import Head from "next/head";
import "../styles/globals.css";
import SWRConfigProvider from "../components/swr-config"; 
import InfoModal from "../components/InfoModal"; 
import useInfoModalStore from "../hooks/useInfoModalStore"; 
import { useRouter } from "next/router"; 
import React, { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { isOpen, closeModal } = useInfoModalStore();
  const router = useRouter();

  useEffect(() => {
    // Handle route changes
    const handleRouteChange = () => {
      closeModal();
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [closeModal, router]);

  return (
    <SessionProvider session={session}>
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <SWRConfigProvider>
        <UserProvider>
          <ProfileProvider>
            <Component key={router.route} {...pageProps} />
            {isOpen && <InfoModal onClose={closeModal} />}
          </ProfileProvider>
        </UserProvider>
      </SWRConfigProvider>
    </SessionProvider>
  );
}
export default MyApp;
