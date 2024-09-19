import { convexAuth } from "@convex-dev/auth/server";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import { ResendOTP } from "./otp/ResendOTP";
import Resend from "@auth/core/providers/resend";
import { Password } from "@convex-dev/auth/providers/Password";
import { ResendOTPPasswordReset } from "./passwordReset/ResendOTPPasswordReset";
import { TwilioOTP } from "./otp/TwilioOTP";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    // Docs: https://labs.convex.dev/auth/config/oauth
    // Requires `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` ()
    GitHub,
    // Docs: https://labs.convex.dev/auth/config/oauth
    // Requires `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`
    Google,
    // Docs: https://labs.convex.dev/auth/config/email
    // Requires `AUTH_RESEND_KEY`
    Resend({
      from: process.env.AUTH_EMAIL ?? "My App <onboarding@resend.dev>",
    }),
    // Docs: https://labs.convex.dev/auth/config/otps
    // Requires `AUTH_RESEND_KEY`
    ResendOTP,
    // Docs: https://labs.convex.dev/auth/config/otps#phone-providers
    // Requires `AUTH_TWILIO_ACCOUNT_SID`, `AUTH_TWILIO_AUTH_TOKEN`, `AUTH_TWILIO_FROM_NUMBER` and `AUTH_TWILIO_SERVICE_SID`
    TwilioOTP,
    Password,
    Password({ id: "password-with-reset", reset: ResendOTPPasswordReset }),
  ],
  callbacks: {
    async redirect({ redirectTo }) {
      // Allow redirects to the mobile Expo URL or to the web URL.
      // Without this, only redirects to `SITE_URL` are allowed.
      if (
        redirectTo !== process.env.EXPO_URL! &&
        redirectTo !== process.env.SITE_URL!
      ) {
        throw new Error(`Invalid redirectTo URI ${redirectTo}`);
      }
      return redirectTo;
    },
  },
});
