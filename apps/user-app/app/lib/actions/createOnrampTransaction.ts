"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createOnRampTransaction(
  provider: string,
  amount: number,
) {
  const session = await getServerSession(authOptions);

  if (!session?.user || !session.user?.id) {
    return {
      message: "Unauthenticated request",
    };
  }
  const token = (Math.random() * 1000).toString();

  await prisma.onRampTransaction.create({
    data: {
      userId: Number(session?.user?.id),
      status: "Processing",
      provider: provider,
      amount: amount * 100,
      startTime: new Date(),
      token: token,
    },
  });
  return {
    message: "Done",
  };
}
