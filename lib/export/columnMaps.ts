import { BankConfig } from "../banks/types";
import { bankRegistry } from "../banks";

export interface ExcelColumn {
  /** Key into submissions.data (or "serial_no" for the auto-generated column). */
  key: string;
  /** Exact header label as supplied by the client. */
  header: string;
}

/**
 * Builds the Excel column order/labels for a bank directly from its
 * FieldConfig list (lib/banks/*.ts) — this is the single source of truth
 * for field names, so there is no separate place that could drift out of
 * sync with the form. Order matches the order fields were supplied in.
 */
export function getColumnsForBank(bank: BankConfig): ExcelColumn[] {
  return bank.fields.map((field) => ({
    key: field.key,
    header: field.label,
  }));
}

export function getColumnsForBankSlug(slug: string): ExcelColumn[] | null {
  const bank = bankRegistry[slug as keyof typeof bankRegistry];
  if (!bank) return null;
  return getColumnsForBank(bank);
}
