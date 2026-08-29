import { bankRegistry, bankSlugs } from "@/lib/banks";

export default function ExportPage() {
  const banks = bankSlugs.map((slug) => bankRegistry[slug]);

  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 p-6">
      <h1 className="mb-2 text-center text-2xl font-semibold text-slate-900">
        Export Submissions
      </h1>
      <p className="mb-2 text-center text-base text-slate-600">
        Download the current submissions for a bank as an Excel file.
      </p>
      {banks.map((bank) => (
        <a
          key={bank.slug}
          href={`/api/export/${bank.slug}`}
          className="w-full rounded-2xl bg-slate-800 py-5 text-center text-lg font-semibold text-white shadow-sm active:bg-slate-900"
        >
          Download {bank.displayName} Excel
        </a>
      ))}
    </div>
  );
}
