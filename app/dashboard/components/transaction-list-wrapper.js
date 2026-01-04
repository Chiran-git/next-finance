import fetchTransactions from "@/lib/actions";
import TransactionList from "@/app/dashboard/components/transaction-list";

export default async function TransactionListWrapper({range}) {
    const transactions = await fetchTransactions(range);
    return <TransactionList initialTransactions={transactions} key={range} range={range} />
}