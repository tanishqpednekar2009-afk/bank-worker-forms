"use client";

import { useRouter } from "next/navigation";

interface SubmitConfirmationProps {
  bankDisplayName: string;
  serialNo?: number | null;
}

export function SubmitConfirmation({
  bankDisplayName,
  serialNo,
}: SubmitConfirmationProps) {
  const router = useRouter();

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-6 p-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <span className="text-4xl text-green-600">✓</span>
      </div>
      <h1 className="text-2xl font-semibold text-slate-900">
        Submitted successfully.
      </h1>
      <p className="text-lg text-slate-600">{bankDisplayName}</p>
      {typeof serialNo === "number" && (
        <p className="text-lg text-slate-600">Sr. No.: {serialNo}</p>
      )}
      <button
        type="button"
        onClick={() => router.push("/")}
        className="mt-4 w-full rounded-2xl bg-blue-600 py-5 text-lg font-semibold text-white active:bg-blue-700"
      >
        Submit Another
      </button>
    </div>
  );
}
