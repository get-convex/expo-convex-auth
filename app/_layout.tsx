import { Stack } from "expo-router";
import { ConvexReactClient } from "convex/react";
import * as SecureStore from "expo-secure-store";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { TamaguiProvider, createTamagui } from "tamagui";
import { config } from "@tamagui/config/v3";
import { Toasts } from "./Toasts";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const secureStorage = {
  getItem: async (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: any) => {
    await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
};

const tamaguiConfig = createTamagui(config);

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Toasts>
        <ConvexAuthProvider
          client={convex}
          storage={
            window.localStorage === undefined
              ? secureStorage
              : window.localStorage
          }
        >
          <Stack>
            <Stack.Screen name="index" />
          </Stack>
        </ConvexAuthProvider>
      </Toasts>
    </TamaguiProvider>
  );
}
