import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { P2pTransactions } from "../../../components/P2PTransactions";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const tx = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return tx.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

async function getP2pTransactions() {
  const session = await getServerSession(authOptions);
  const tx = await prisma.p2pTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });
  console.log("session: ", session);
  
  console.log("t : ",tx);
  
  return tx.map((t) => ({
    timestamp: t.timestamp,
    toUserId: t.toUserId,
    amount: t.amount,
  }));
}

export default async function () {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
  const p2pTransactions = await getP2pTransactions();
  console.log("p2p: ", p2pTransactions);
  
  return (
    <div className="">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <OnRampTransactions transactions={transactions} />
          </div>
          <div className="pt-4">
            <P2pTransactions p2pTransactions={p2pTransactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
