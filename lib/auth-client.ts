import { createAuthClient } from "better-auth/react";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";
import { ac, roles } from "@/lib/permissions"


export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [inferAdditionalFields<typeof auth>(), adminClient({ac, roles})],
});

export const {
    signUp,
    signOut,
    signIn,
    useSession,
    admin,
    sendVerificationEmail,
    forgetPassword,
    resetPassword,
} = authClient;