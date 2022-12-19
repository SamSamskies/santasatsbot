import type { AppProps } from "next/app";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Montserrat } from "@next/font/google";
import theme from "styles/theme";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Box className={montserrat.className}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
}
