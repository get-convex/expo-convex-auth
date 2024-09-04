import { useAuthActions } from "@convex-dev/auth/react";
import { useToastController } from "@tamagui/toast";
import { useState } from "react";
import { Form, Label, Input, Button, View } from "tamagui";

export function SignInWithPassword({
  provider,
  handleSent,
  handlePasswordReset,
}: {
  provider?: string;
  handleSent?: (email: string) => void;
  handlePasswordReset?: () => void;
}) {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const toast = useToastController();
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    setSubmitting(true);
    signIn(provider ?? "password", { email, password, flow })
      .then(() => {
        handleSent?.(email);
      })
      .catch((error) => {
        console.error(error);
        const title =
          flow === "signIn"
            ? "Could not sign in, did you mean to sign up?"
            : "Could not sign up, did you mean to sign in?";
        toast.show(title);
        setSubmitting(false);
      });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        autoComplete="email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <View>
        <Label htmlFor="password">Password</Label>
        {handlePasswordReset && flow === "signIn" ? (
          <Button onPress={handlePasswordReset}>Forgot your password?</Button>
        ) : null}
      </View>
      <Input
        id="password"
        autoComplete={flow === "signIn" ? "current-password" : "new-password"}
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Form.Trigger asChild>
        <Button themeInverse disabled={submitting}>
          {flow === "signIn" ? "Sign in" : "Sign up"}
        </Button>
      </Form.Trigger>
      <Button
        onPress={() => {
          setFlow(flow === "signIn" ? "signUp" : "signIn");
        }}
      >
        {flow === "signIn"
          ? "Don't have an account? Sign up"
          : "Already have an account? Sign in"}
      </Button>
    </Form>
  );
}
