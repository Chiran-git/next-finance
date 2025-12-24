import { Suspense } from "react";
import TransactionList from "./components/transaction-list";
import TransactionListFallback from "./components/transaction-list-fallback";
import Trend from "./components/trend";
import TrendFallback from "./components/trend-fallback";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { variants, sizes } from "@/lib/variants";
import { ErrorBoundary } from "react-error-boundary";

export default async function Dashboard() {
    return (
        <>
            <section className="mb-8">
                <h1 className="text-4xl font-semibold">Summary</h1>
            </section>
            <section className="mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
                <ErrorBoundary fallback={<div className="text-red-500">Cannot fetch data</div>}>
                    <Suspense fallback={<div className="text-red-500">Cannot fetch data</div>}>
                        <Trend type="Income" />
                    </Suspense>
                </ErrorBoundary>

                <ErrorBoundary fallback={<div className="text-red-500">Cannot fetch data</div>}>
                    <Suspense fallback={<TrendFallback />}>
                        <Trend type="Expense" />
                    </Suspense>
                </ErrorBoundary>

                <ErrorBoundary fallback={<div className="text-red-500">Cannot fetch data</div>}>
                    <Suspense fallback={<TrendFallback />}>
                        <Trend type="Saving" />
                    </Suspense>
                </ErrorBoundary>

                <ErrorBoundary fallback={<div className="text-red-500">Cannot fetch data</div>}>
                    <Suspense fallback={<TrendFallback />}>
                        <Trend type="Investment" />
                    </Suspense>
                </ErrorBoundary>
            </section>

            <section className="flex justify-between items-center mb-8">
                <h2 className="text-2xl">Transactions</h2>
                <Link
                    href="/dashboard/transaction/add"
                    className={`flex items-center space-x-1 ${variants["outline"]} ${sizes["sm"]}`}
                >
                    <PlusCircle className="w-4 h-4" />
                    <div>Add</div>
                </Link>
            </section>
            <Suspense fallback={<TransactionListFallback />}>
                <TransactionList />
            </Suspense>
        </>
    );
}
