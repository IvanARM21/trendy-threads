import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export function Provider({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />;
    </SessionProvider>
  );
}
