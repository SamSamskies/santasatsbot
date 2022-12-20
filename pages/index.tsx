import Head from "next/head";
import {
  Heading,
  Text,
  Container,
  Input,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [lightningAddress, setLightningAddress] = useState(
    "sam_test2@next.strike.army"
  );
  const [isStacking, setIsStacking] = useState(false);
  const [willDisplaySuccess, setWillDisplaySuccess] = useState(false);
  const normalizedLightningAddress = lightningAddress.toLowerCase().trim();

  // only supporting next.strike.army Lightning Address for now
  const isValidLightningAddressFormat =
    normalizedLightningAddress.endsWith("@next.strike.army");

  const handleStackClick = async () => {
    setIsStacking(true);

    try {
      await axios({
        method: "post",
        url: `/api/pay?lightningAddress=${lightningAddress}`,
        data: { lightningAddress },
      });
      setWillDisplaySuccess(true);
      setTimeout(() => setWillDisplaySuccess(false), 5000);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }

    setIsStacking(false);
  };

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
              This is a POC for a bot that uses the Strike API to send 1k sats
              to a specified Lightning Address. This currently only works with
              next.strike.army Lightning Addresses.
            </Text>
            <Text>
              In this example, the trigger to send the payment is a button
              click, but the trigger could be anything such as when Peter Schiff
              tweets about Bitcoin, it&apos;s sunny outside, etc.
            </Text>
          </VStack>
          <HStack>
            <Input
              placeholder="Lightning Address e.g. sam_test2@next.strike.army"
              variant="filled"
              size="lg"
              autoFocus
              onChange={(e) => setLightningAddress(e.target.value)}
              value={lightningAddress}
            />
            <Button
              onClick={handleStackClick}
              isLoading={isStacking}
              isDisabled={!isValidLightningAddressFormat || isStacking}
              variant="primary"
            >
              Stack
            </Button>
          </HStack>
          {willDisplaySuccess && (
            <VStack mt={16} spacing={4}>
              <Heading>BOOM 1K SATS SENT 🚀</Heading>
              <iframe src="https://giphy.com/embed/dTxOCCvQOhRXa" width="480" height="480" frameBorder="0"
                      className="giphy-embed" allowFullScreen></iframe>
            </VStack>
          )}

        </Container>
      </main>
    </>
  );
}
