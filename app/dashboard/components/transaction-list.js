"use client"

import Separator from "@/components/separator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import {groupAndSumTransactionsByDate} from "@/lib/utils";
import Button from "@/components/button";
import {useState} from "react";
import fetchTransactions from "@/lib/actions";
import {Loader} from "lucide-react";

export default function TransactionList({range, initialTransactions}) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [offset, setOffset] = useState(initialTransactions.length);
  const [buttonHidden, setButtonHidden] = useState(initialTransactions.length === 0);
  const [loading, setLoading] = useState(false);
  const grouped = groupAndSumTransactionsByDate(transactions);

  const handleClick = async (e) => {
    setLoading(true);
    let nextTransactions = null;
    try {
      nextTransactions = await fetchTransactions(range, offset, 10);
    } finally {
      setLoading(false);
    }
    setButtonHidden(!nextTransactions || nextTransactions.length === 0);
    setOffset(prevValue => prevValue + 10);
    setTransactions(prevTransactions => [...prevTransactions, ...nextTransactions]);
  }

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
      {transactions.length === 0 && <div>No transactions found</div>}
      {!buttonHidden && (<div className="flex justify-center">
        <Button variant="ghost" onClick={handleClick} disabled={loading}>
          {loading && <Loader />}
          Load more
        </Button>
      </div>)}
    </div>
  );
}
