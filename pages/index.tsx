import Head from "next/head";
import {
  Heading,
  Text,
  Container,
  Input,
  Switch,
  VStack,
  HStack,
} from "@chakra-ui/react";

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
        <Container>
          <Heading as="h1" mt={10} mb={4}>
            Santa Sats Bot
          </Heading>
          <VStack mb={4} spacing={4} align="flex-start">
            <Text>
              This is a POC for a bot that uses the Strike API to send sats to a
              specified Lightning Address every min. Your API key must have the
              partner.payment-quote.lightning.create scope in order for this app
              to work. This currently only works with testnet Lightning
              Addresses.
            </Text>
            <Text>Enter your Lightning Address and toggle switch on to start stacking.</Text>
          </VStack>
          <HStack>
            <Input
              placeholder="Lightning Address e.g. sam_test2@next.strike.army"
              variant="filled"
              size="lg"
              autoFocus
            />
            <Switch size="lg" />
          </HStack>
        </Container>
      </main>
    </>
  );
}
