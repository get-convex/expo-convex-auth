import { H2, SizableText, Tabs, View } from "tamagui";
import { SignInFormEmailCode } from "./email/SignInFormEmailCode";
import { SignInFormPhoneCode } from "./sms/SignInFormPhoneCode";
import { SignInWithPassword } from "./SignInWithPassword";
import { SignInWithReset } from "./SignInWithReset";

export function Password() {
  return (
    <Tabs defaultValue="basic" orientation="horizontal" flexDirection="column">
      <Tabs.List>
        <Tabs.Tab value="basic">
          <SizableText>Basic</SizableText>
        </Tabs.Tab>
        <Tabs.Tab value="reset">
          <SizableText>Password Reset</SizableText>
        </Tabs.Tab>
        <Tabs.Tab value="verification">
          <SizableText>OAuth + Email Verification</SizableText>
        </Tabs.Tab>
      </Tabs.List>

      <View padding="$4">
        <Tabs.Content value="basic">
          <H2>Sign in or create an account</H2>
          <SignInWithPassword />
        </Tabs.Content>
        <Tabs.Content value="reset">
          <SignInWithReset />
        </Tabs.Content>
      </View>
    </Tabs>
  );
}
