import { auth } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function requireUser() {
  const { userId, sessionClaims } = await auth();
  if (!userId) throw new Error("UNAUTHORIZED");
  let user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) {
    const email = (sessionClaims?.email as string) || "contact@majestikmagik.com";
    user = await prisma.user.create({ data: { clerkId: userId, email } });
  }
  return user;
}
