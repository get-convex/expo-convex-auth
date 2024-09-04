import { useAuthActions } from "@convex-dev/auth/dist/react";
import { useToastController } from "@tamagui/toast";
import { useState } from "react";
import { SignInWithEmailCode } from "../otp/email/SignInWithEmailCode";
import { Button, Form, H2, Input, Label, Text, View } from "tamagui";
import { SignInWithPassword } from "./SignInWithPassword";

export function SignInWithReset() {
  const [step, setStep] = useState<"signIn" | "forgot">("signIn");
  return (
    <View>
      {step === "signIn" ? (
        <>
          <H2>Sign in or create an account</H2>
          <SignInWithPassword
            provider="password-with-reset"
            handlePasswordReset={() => setStep("forgot")}
          />
        </>
      ) : (
        <ResetPasswordWithEmailCode
          provider="password-with-reset"
          handleCancel={() => setStep("signIn")}
        />
      )}
    </View>
  );
}

function ResetPasswordWithEmailCode({
  handleCancel,
  provider,
}: {
  handleCancel: () => void;
  provider: string;
}) {
  const { signIn } = useAuthActions();
  const toast = useToastController();
  const [step, setStep] = useState<"forgot" | { email: string }>("forgot");
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const handleSubmit = () => {
    if (step === "forgot") {
      toast.show("Unexpected new password submission before submitting email.");
      setSubmitting(false);
      return;
    }
    setSubmitting(true);
    signIn(provider, {
      email: step.email,
      flow: "reset-verification",
      newPassword: newPassword,
      code: code,
    }).catch((error) => {
      console.error(error);
      toast.show(
        "Code could not be verified or new password is too short, try again"
      );
      setSubmitting(false);
    });
  };
  return step === "forgot" ? (
    <>
      <H2>Send password reset code</H2>
      <SignInWithEmailCode
        handleCodeSent={(email) => setStep({ email })}
        provider={provider}
        providerOptions={{ flow: "reset" }}
      ></SignInWithEmailCode>
      <Button onPress={handleCancel}>Cancel</Button>
    </>
  ) : (
    <>
      <H2>Check your email</H2>
      <Text>
        Enter the 8-digit code we sent to your email address and choose a new
        password.
      </Text>
      <Form className="flex flex-col" onSubmit={handleSubmit}>
        <Label htmlFor="code">Code</Label>
        <Input id="code" value={code} onChangeText={setCode} />
        <Label htmlFor="newPassword">New Password</Label>
        <Input
          id="newPassword"
          value={newPassword}
          onChangeText={setNewPassword}
          autoComplete="new-password"
          autoCapitalize="none"
          secureTextEntry={true}
        />
        <Form.Trigger asChild>
          <Button themeInverse disabled={submitting}>
            Continue
          </Button>
        </Form.Trigger>
        <Button onPress={() => setStep("forgot")}>Cancel</Button>
      </Form>
    </>
  );
}
