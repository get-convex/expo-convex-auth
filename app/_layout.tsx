import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import * as SecureStore from "expo-secure-store";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { TamaguiProvider, createTamagui } from "tamagui";
import { config } from "@tamagui/config/v3";
import { Toasts } from "./Toasts";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const secureStorage = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
};

const tamaguiConfig = createTamagui(config);

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Toasts>
        <ConvexAuthProvider
          client={convex}
          storage={window.localStorage ?? secureStorage}
        >
          <Stack>
            <Stack.Screen name="index" />
          </Stack>
        </ConvexAuthProvider>
      </Toasts>
    </TamaguiProvider>
  );
}
