import Seperator from "@/components/seperator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import { createClient } from "@/lib/supabase/server";
import {groupAndSumTransactionsByDate} from "@/lib/utils";



export default async function TransactionList() {
  const supabase = await createClient();
  const { data: transactions, error } = await supabase
    .from("transactions")
    .select('*')
    .order('created_at',  {ascending: true});

  const grouped = groupAndSumTransactionsByDate(transactions);

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
