import { BankConfig, BankSlug } from "./types";
import { hdfc } from "./hdfc";
import { jana } from "./jana";
import { hdb } from "./hdb";
import { kotak } from "./kotak";

export const bankRegistry: Record<BankSlug, BankConfig> = {
  hdfc,
  jana,
  hdb,
  kotak,
};

export const bankSlugs: BankSlug[] = ["hdfc", "jana", "hdb", "kotak"];

export function getBankConfig(slug: string): BankConfig | undefined {
  return bankRegistry[slug as BankSlug];
}

export function isValidBankSlug(slug: string): slug is BankSlug {
  return bankSlugs.includes(slug as BankSlug);
}

export type { BankConfig, BankSlug, FieldConfig, FieldType } from "./types";
