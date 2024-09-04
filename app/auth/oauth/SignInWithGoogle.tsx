import { useAuthActions } from "@convex-dev/auth/react";
import { Search } from "@tamagui/lucide-icons";
import { useState } from "react";
import { Button } from "tamagui";
import { makeRedirectUri } from "expo-auth-session";
import { openAuthSessionAsync } from "expo-web-browser";
import { Platform } from "react-native";

const redirectTo = makeRedirectUri();

export function SignInWithGoogle() {
  const { signIn } = useAuthActions();
  const [submitting, setSubmitting] = useState(false);
  const handleSignIn = async () => {
    setSubmitting(true);
    const { redirect } = await signIn("github", {
      redirectTo,
    });
    if (Platform.OS === "web") {
      return;
    }
    const result = await openAuthSessionAsync(redirect!.toString(), redirectTo);
    if (result.type === "success") {
      const { url } = result;
      const code = new URL(url).searchParams.get("code")!;
      await signIn("google", { code });
    } else {
      setSubmitting(false);
    }
  };
  return (
    <Button
      icon={Search}
      size="$5"
      themeInverse
      onPress={handleSignIn}
      disabled={submitting}
      disabledStyle={{ opacity: 0.5 }}
    >
      Google
    </Button>
  );
}
