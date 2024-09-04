import { useAuthActions } from "@convex-dev/auth/dist/react";
import { useToastController } from "@tamagui/toast";
import { useState } from "react";
import { Button, Form, Input } from "tamagui";

export function SignInWithEmailCode({
  handleCodeSent,
  provider,
  providerOptions,
}: {
  handleCodeSent: (email: string) => void;
  provider?: string;
  providerOptions?: any;
}) {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const toast = useToastController();
  const handleSubmit = () => {
    setSubmitting(true);
    signIn(provider ?? "resend-otp", { ...(providerOptions ?? {}), email })
      .then(() => {
        handleCodeSent(email);
      })
      .catch((error) => {
        console.error(error);
        toast.show("Could not send code. Please try again.");
        setSubmitting(false);
      });
  };
  return (
    <Form gap="$2" onSubmit={handleSubmit}>
      <Input
        size="$5"
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        autoComplete="email"
        enterKeyHint="next"
        onChangeText={setEmail}
        blurOnSubmit={false}
      />
      <Form.Trigger asChild>
        <Button
          size="$5"
          themeInverse
          disabled={submitting}
          disabledStyle={{ opacity: 0.5 }}
        >
          {"Send code"}
        </Button>
      </Form.Trigger>
    </Form>
  );
}
