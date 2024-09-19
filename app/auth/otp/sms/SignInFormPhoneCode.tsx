import { useAuthActions } from "@convex-dev/auth/dist/react";
import { useState } from "react";
import { Button, Form, H2, Input, Text, View } from "tamagui";
import { useToastController } from "@tamagui/toast";

export function SignInFormPhoneCode() {
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signIn" | { phone: string }>("signIn");
  const [code, setCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const toast = useToastController();

  const handleSubmit = () => {
    setSubmitting(true);
    if (step === "signIn") {
      toast.show("Unexpected code submission before submitting phone number.");
      setSubmitting(false);
      return;
    }
    signIn("twilio", { phone: step.phone, code }).catch((error) => {
      console.error(error);
      toast.show("Code could not be verified. Please try again.");
      setSubmitting(false);
    });
  };

  return step === "signIn" ? (
    <View>
      <H2>Sign in with phone code</H2>
      <SignInWithPhoneCode handleCodeSent={(phone) => setStep({ phone })} />
    </View>
  ) : (
    <View>
      <H2>Check your phone</H2>
      <Text>Enter the 6-digit code we sent to your phone number.</Text>
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

function SignInWithPhoneCode({
  handleCodeSent,
}: {
  handleCodeSent: (phone: string) => void;
}) {
  const { signIn } = useAuthActions();
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const toast = useToastController();
  const handleSubmit = () => {
    setSubmitting(true);
    signIn("twilio-otp", { phone })
      .then(() => {
        handleCodeSent(phone);
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
        placeholder="Phone number"
        value={phone}
        autoCapitalize="none"
        autoComplete="tel"
        enterKeyHint="next"
        onChangeText={setPhone}
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
