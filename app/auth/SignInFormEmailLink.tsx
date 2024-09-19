import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Form, H2, View, Input, Button, Label, Text } from "tamagui";
import { useToastController } from "@tamagui/toast";

export function SignInFormEmailLink() {
  const [step, setStep] = useState<"signIn" | "linkSent">("signIn");

  return (
    <View padding="$4">
      {step === "signIn" ? (
        <>
          <H2>Sign in with a link</H2>
          <SignInWithMagicLink handleLinkSent={() => setStep("linkSent")} />
        </>
      ) : (
        <>
          <H2>Check your email</H2>
          <Text>A sign-in link has been sent to your email address.</Text>
          <Button onPress={() => setStep("signIn")}>Cancel</Button>
        </>
      )}
    </View>
  );
}

function SignInWithMagicLink({
  handleLinkSent,
}: {
  handleLinkSent: () => void;
}) {
  const { signIn } = useAuthActions();
  const toast = useToastController();
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = () => {
    setSubmitting(true);
    signIn("resend", { email })
      .then(() => {
        handleLinkSent();
        setSubmitting(false);
      })
      .catch((error) => {
        console.error(error);
        toast.show("Could not send sign-in link");
        setSubmitting(false);
      });
  };
  return (
    <View gap="$4">
      <Text>
        Note: Magic links can't be opened in a mobile app, but can allow logging
        in from a browser. OTPs offer a better log in experience for mobile
        apps.
      </Text>
      <Form onSubmit={handleSubmit}>
        <Label>Email</Label>
        <Input
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={setEmail}
          autoComplete="email"
        />
        <Form.Trigger asChild>
          <Button
            marginTop="$4"
            themeInverse
            size="$5"
            disabled={submitting}
            disabledStyle={{ opacity: 0.5 }}
          >
            Send sign-in link
          </Button>
        </Form.Trigger>
      </Form>
    </View>
  );
}
