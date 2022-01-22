import { AppProps } from "next/dist/shared/lib/router/router";
import "../styles/globals.css";

export default ({ Component, pageProps }: AppProps) => {
    return <Component {...pageProps} />;
};
