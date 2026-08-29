import { BankSelector } from "@/components/BankSelector";
import { bankRegistry, bankSlugs } from "@/lib/banks";

export default function HomePage() {
  const banks = bankSlugs.map((slug) => bankRegistry[slug]);
  return <BankSelector banks={banks} />;
}
