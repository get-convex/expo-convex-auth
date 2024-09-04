import { useAuthActions } from "@convex-dev/auth/dist/react";
import { useState } from "react";
import { Button, Form, H2, Input, Text, View } from "tamagui";
import { SignInWithEmailCode } from "./SignInWithEmailCode";
import { useToastController } from "@tamagui/toast";

export function SignInFormEmailCode() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const toast = useToastController();

  const handleSubmit = () => {
    setSubmitting(true);
    if (step === "signIn") {
      toast.show("Unexpected code submission before submitting email.");
      setSubmitting(false);
      return;
    }
    signIn("resend-otp", { email: step.email, code }).catch((error) => {
      console.error(error);
      toast.show("Code could not be verified. Please try again.");
      setSubmitting(false);
    });
  };

  return step === "signIn" ? (
    <View>
      <H2>Sign in with email code</H2>
      <SignInWithEmailCode handleCodeSent={(email) => setStep({ email })} />
    </View>
  ) : (
    <View>
      <H2>Check your email</H2>
      <Text>Enter the 8-digit code we sent to your email address.</Text>
      <Form gap="$2" onSubmit={handleSubmit}>
        <Input
          size="$5"
          placeholder="Code"
          autoCapitalize="none"
          enterKeyHint="next"
          onChangeText={setCode}
          blurOnSubmit={false}
        />
        <Form.Trigger asChild>
          <Button
            size="$5"
            themeInverse
            disabled={submitting}
            disabledStyle={{ opacity: 0.5 }}
          >
            {"Continue"}
          </Button>
        </Form.Trigger>
        <Button chromeless onPress={() => setStep("signIn")}>
          {"Cancel"}
        </Button>
      </Form>
    </View>
  );
}
