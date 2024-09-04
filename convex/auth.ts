import { convexAuth } from "@convex-dev/auth/server";
import GitHub from "@auth/core/providers/github";
import { ResendOTP } from "./otp/ResendOTP";
import Resend from "@auth/core/providers/resend";
import { Password } from "@convex-dev/auth/providers/Password";
import { ResendOTPPasswordReset } from "./passwordReset/ResendOTPPasswordReset";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    GitHub,
    // Google,
    // Apple
    Resend({
      from: process.env.AUTH_EMAIL ?? "My App <onboarding@resend.dev>",
    }),
    ResendOTP,
    // Twilio,
    Password,
    Password({ id: "password-with-reset", reset: ResendOTPPasswordReset }),
  ],
  callbacks: {
    async redirect({ redirectTo }) {
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
