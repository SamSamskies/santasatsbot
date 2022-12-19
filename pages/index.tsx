import Head from "next/head";
import { Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Santa Sats Bot</title>
        <meta name="description" content="Bitcoin Lightning DCA bot POC" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Heading as="h1">Santa Sats Bot</Heading>
        <Text>Bitcoin Lightning DCA bot POC</Text>
      </main>
    </>
  );
}
