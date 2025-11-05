"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";

export async function SignInEmailAction(formData: FormData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Please enter your email" };

  const password = String(formData.get("password"));
  if (!password) return { error: "Please enter your password." };

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
      asResponse: true,
    });

    // old way - without better-auth plugins: nextCookies
    /* const setCookieHeader = res.headers.get("set-cookie");
    if (setCookieHeader) {
        const cookie = parseSetCookieHeader(setCookieHeader);
        const cookieStore = await cookies();
        const [key, cookieAttributes] = [...cookie.entries()][0]
        const value = cookieAttributes.value;
        const maxAge = cookieAttributes["max-age"];
        const path = cookieAttributes.path;
        const httpOnly = cookieAttributes.httponly;
        const sameSite = cookieAttributes.samesite;

        cookieStore.set(key, decodeURIComponent(value), {
            maxAge,
            path,
            httpOnly,
            sameSite,
        })
    } */

    return { error: null };
  } catch (error) {
    if (error instanceof APIError) {
      return { error: "Oup's something went wrong while Login-In" };
    }
    return { error: "Internal server error !" };
  }
}
