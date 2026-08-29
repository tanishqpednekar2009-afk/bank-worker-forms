"use client";

import { useRouter } from "next/navigation";
import { BankConfig } from "@/lib/banks/types";

interface BankSelectorProps {
  banks: BankConfig[];
}

export function BankSelector({ banks }: BankSelectorProps) {
  const router = useRouter();

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 p-6">
      <h1 className="mb-2 text-center text-2xl font-semibold text-slate-900">
        Select Bank
      </h1>
      {banks.map((bank) => (
        <button
          key={bank.slug}
          type="button"
          onClick={() => router.push(`/${bank.slug}`)}
          className="w-full rounded-2xl bg-blue-600 py-6 text-xl font-semibold text-white shadow-sm active:bg-blue-700"
        >
          {bank.displayName}
        </button>
      ))}
    </div>
  );
}
