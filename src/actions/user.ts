"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";

// sync user with clerk

export async function getOrCreateUser() {
  const { userId } = await auth();

  console.log(userId);

  if (!userId) throw new Error("User not authenticated");

  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.findUnique({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  // if there is no user create user or update

  // if (!dbUser) {
  //   dbUser = await prisma.user.create({
  //     data: {
  //       clerkUserId: userId,
  //       email: user.emailAddresses[0].emailAddress,
  //       name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
  //     },
  //   });
  // }

  if (dbUser) {
    dbUser = await prisma.user.update({
      where: { id: dbUser.id },
      data: {
        clerkUserId: userId,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      },
    });
  } else {
    dbUser = await prisma.user.create({
      data: {
        clerkUserId: userId,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      },
    });
  }

  console.log(dbUser);

  return dbUser;
}
