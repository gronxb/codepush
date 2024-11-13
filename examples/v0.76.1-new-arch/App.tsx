/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { HotUpdater } from "@hot-updater/react-native";
import type React from "react";
import { useEffect, useState } from "react";
import { Button, Image, SafeAreaView, Text } from "react-native";

HotUpdater.init({
  source: "https://gronxb.s3.ap-northeast-2.amazonaws.com/update.json",
});

function extractTimestampFromUUIDv7(uuid: string) {
  const timestampHex = uuid.split("-").join("").slice(0, 12);

  const timestamp = Number.parseInt(timestampHex, 16);

  return timestamp;
}

function App(): React.JSX.Element {
  const [version, setVersion] = useState<number | null>(null);

  useEffect(() => {
    HotUpdater.getBundleTimestamp().then((version) => {
      setVersion(version);
    });
  }, []);

  return (
    <SafeAreaView>
      <Text>Babel {process.env.HOT_UPDATER_BUNDLE_ID}</Text>
      <Text>
        Babel{" "}
        {Date.now() - extractTimestampFromUUIDv7(env.HOT_UPDATER_BUNDLE_ID)}
      </Text>
      <Text
        style={{
          marginVertical: 20,
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Hot Updater 0
      </Text>

      <Text
        style={{
          marginVertical: 20,
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        BundleTimestamp: {version}
      </Text>

      <Image
        style={{
          width: 100,
          height: 100,
        }}
        source={require("./src/test/_image.png")}
      />

      <Button title="Reload" onPress={() => HotUpdater.reload()} />
    </SafeAreaView>
  );
}

export default App;
