import { SignIn } from "@/app/SignIn";
import { api } from "@/convex/_generated/api";
import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { Keyboard, Pressable, Text } from "react-native";
import { Button, View } from "tamagui";

export default function Index() {
  return (
    <Pressable
      onPress={(event) => {
        if (event.target === event.currentTarget) {
          Keyboard.dismiss();
        }
      }}
      style={{
        flex: 1,
        alignItems: "center",
        cursor: "auto",
      }}
    >
      <Unauthenticated>
        <SignIn />
      </Unauthenticated>
      <Authenticated>
        <Content />
      </Authenticated>
    </Pressable>
  );
}

function Content() {
  const viewer = useQuery(api.users.viewer);
  const { signOut } = useAuthActions();
  return (
    <View marginTop="$4" gap="$4">
      <Text>Viewer: {viewer?.email}</Text>
      <Button themeInverse onPress={() => signOut()}>
        Sign out
      </Button>
    </View>
  );
}
