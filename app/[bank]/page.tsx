import { notFound } from "next/navigation";
import { BankForm } from "@/components/BankForm";
import { getBankConfig, bankSlugs } from "@/lib/banks";

export function generateStaticParams() {
  return bankSlugs.map((bank) => ({ bank }));
}

export default function BankFormPage({
  params,
}: {
  params: { bank: string };
}) {
  const bankConfig = getBankConfig(params.bank);

  if (!bankConfig) {
    notFound();
  }

  return <BankForm bank={bankConfig} />;
}
