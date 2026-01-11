'use client'
import Button from "@/components/button";
import {deleteTransaction} from "@/lib/actions";
import { Loader, X } from "lucide-react";
import { useState } from "react";

export default function TransactionItemRemoveButton({id}) {
  const [loading, setLoading] = useState();
  const [confirmed, setConfirmed] = useState();

  const handleClick = async () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }

    try {
      setLoading(true);
      await deleteTransaction(id);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Button size="xs" variant={confirmed ? 'danger' : 'ghost'} onClick={handleClick} aria-disabled={loading}>
      {loading ? <Loader className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
    </Button>
  )
}