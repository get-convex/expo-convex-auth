import { Button, Form, H1, H5, H6, Input, View, YStack } from "tamagui";
import { SizableText, Tabs } from "tamagui";
import { SignInWithGitHub } from "./auth/oauth/SignInWithGithub";
import { SignInWithGoogle } from "./auth/oauth/SignInWithGoogle";
import { SignInFormEmailCode } from "./auth/otp/email/SignInFormEmailCode";
import { Otp } from "./auth/otp/Otp";
import { SignInFormEmailLink } from "./auth/SignInFormEmailLink";
import { Password } from "./auth/password/Password";

export function SignIn() {
  return (
    <Tabs
      defaultValue="oauth"
      width="100vw"
      orientation="horizontal"
      flexDirection="column"
    >
      <Tabs.List>
        <Tabs.Tab value="oauth">
          <SizableText>OAuth</SizableText>
        </Tabs.Tab>
        <Tabs.Tab value="otp">
          <SizableText>OTP</SizableText>
        </Tabs.Tab>
        <Tabs.Tab value="magic-link">
          <SizableText>Magic Link</SizableText>
        </Tabs.Tab>
        <Tabs.Tab value="password">
          <SizableText>Password</SizableText>
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Content value="oauth">
        <YStack gap="$4" padding="$4">
          <SignInWithGitHub />
          <SignInWithGoogle />
        </YStack>
      </Tabs.Content>
      <Tabs.Content value="otp">
        <Otp />
      </Tabs.Content>
      <Tabs.Content value="magic-link">
        <SignInFormEmailLink />
      </Tabs.Content>
      <Tabs.Content value="password">
        <Password />
      </Tabs.Content>
    </Tabs>
  );
}
