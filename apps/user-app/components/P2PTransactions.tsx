import { Card } from "@repo/ui/card";

export const P2pTransactions = ({
  p2pTransactions,
}: {
  p2pTransactions: {
    timestamp: Date;
    toUserId: Number;
    amount: Number;
  }[];
}) => {
  if (!p2pTransactions.length) {
    return (
      <Card title="Recent P2P Transactions">
        <div className="text-center pb-8 pt-8">No Recent P2P Transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent P2P Transactions">
      <div className="pt-2">
        {p2pTransactions.map((t: any) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {t.timestamp.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {t.amount / 100}
            </div>
            <div className="flex flex-col justify-center">To {t.toUserId}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};
