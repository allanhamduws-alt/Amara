"use server";

import { compare } from "bcryptjs";
import prisma from "@/lib/prisma";
import { cookies, headers } from "next/headers";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "fallback-secret"
);

export async function authenticateWithFormData(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  console.log("[Action] authenticate called with:", { email, hasPassword: !!password });
  
  try {
    if (!email || !password) {
      return { success: false, error: "E-Mail und Passwort erforderlich" };
    }

    // Find user
    const user = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("[Action] User not found");
      return { success: false, error: "Ungültige Anmeldedaten" };
    }

    // Check password
    const isValidPassword = await compare(password, user.passwordHash);

    if (!isValidPassword) {
      console.log("[Action] Invalid password");
      return { success: false, error: "Ungültige Anmeldedaten" };
    }

    // Create session token
    const token = await new SignJWT({
      id: user.id,
      email: user.email,
      name: user.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    // Check if request came via HTTPS (check forwarded proto header from reverse proxy)
    const headersList = await headers();
    const forwardedProto = headersList.get("x-forwarded-proto");
    const isSecure = forwardedProto === "https" || process.env.NODE_ENV === "production";

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("admin-session", token, {
      httpOnly: true,
      secure: isSecure,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    console.log("[Action] Login successful for:", user.email, "secure:", isSecure);
    return { success: true };
  } catch (error) {
    console.log("[Action] Error:", error);
    return { success: false, error: "Ein Fehler ist aufgetreten" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-session");
}

