"use client"

import Separator from "@/components/separator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import {groupAndSumTransactionsByDate} from "@/lib/utils";



export default function TransactionList({initialTransactions}) {

  const grouped = groupAndSumTransactionsByDate(initialTransactions);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        {Object.entries(grouped).map(([date, { transactions, amount }]) => (
          <div key={date}>
            <TransactionSummaryItem date={date} amount={amount} />
            <Separator />
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
