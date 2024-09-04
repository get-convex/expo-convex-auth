import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Form, H2, View, Input, Button, Label, Text } from "tamagui";
import { useToastController } from "@tamagui/toast";

export function SignInFormEmailLink() {
  const [step, setStep] = useState<"signIn" | "linkSent">("signIn");
  console.log("step", step);

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
  console.log("email", email);
  console.log("submitting", submitting);
  const handleSubmit = () => {
    console.log("submitting");
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
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={setEmail}
        autoComplete="email"
      />
      <Form.Trigger asChild>
        <Button
          themeInverse
          size="$5"
          disabled={submitting}
          disabledStyle={{ opacity: 0.5 }}
        >
          Send sign-in link
        </Button>
      </Form.Trigger>
    </Form>
  );
}
