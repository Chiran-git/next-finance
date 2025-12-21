import Seperator from "@/components/seperator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";

const groupAndSumTransactionsByDate = (transactions) => {
  const grouped = {};

  for (const transaction of transactions) {
    const date = transaction.created_at.split("T")[0];

    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 };
    }

    grouped[date]?.transactions.push(transaction);
    const amount =
      transaction.type === "Expense" ? -transaction.amount : transaction.amount;
    grouped[date].amount += amount;
  }

  return grouped;
};

export default async function TransactionList() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
    next: {
      tags: ['transaction-list']
    }
  });
  const transactions = await response.json();
  const grouped = groupAndSumTransactionsByDate(transactions);

  /*return (
    <section className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id}>
          <TransactionItem {...transaction} />
        </div>
      ))}
    </section>
  );*/

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        {Object.entries(grouped).map(([date, { transactions, amount }]) => (
          <div key={date}>
            <TransactionSummaryItem date={date} amount={amount} />
            <Seperator />
            <div className="space-y-2 mt-2">
              {transactions.map((transaction) => (
                <TransactionItem key={transaction.id} {...transaction} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
