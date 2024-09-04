import { SizableText, Tabs, View } from "tamagui";
import { SignInFormEmailCode } from "./email/SignInFormEmailCode";
import { SignInFormPhoneCode } from "./sms/SignInFormPhoneCode";

export function Otp() {
  return (
    <Tabs defaultValue="email" orientation="horizontal" flexDirection="column">
      <Tabs.List>
        <Tabs.Tab value="email">
          <SizableText>Email</SizableText>
        </Tabs.Tab>
        <Tabs.Tab value="sms">
          <SizableText>SMS</SizableText>
        </Tabs.Tab>
      </Tabs.List>

      <View padding="$4">
        <Tabs.Content value="email">
          <SignInFormEmailCode />
        </Tabs.Content>
        <Tabs.Content value="sms">
          <SignInFormPhoneCode />
        </Tabs.Content>
      </View>
    </Tabs>
  );
}
