import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../Layout/Loading";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  const [state, setState] = useState({
    isRouteChanging: false,
    loadingKey: 0,
  });

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: true,
        loadingKey: prevState.loadingKey ^ 1,
      }));
    };

    const handleRouteChangeEnd = () => {
      setState((prevState) => ({
        ...prevState,
        isRouteChanging: false,
      }));
    };
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeEnd);
    router.events.on("routeChangeError", handleRouteChangeEnd);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeEnd);
      router.events.off("routeChangeError", handleRouteChangeEnd);
    };
  }, [router.events]);

  return (
    <>
      <Loading isRouteChanging={state.isRouteChanging} key={state.loadingKey} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
