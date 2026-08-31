import { BankConfig, BankSlug } from "./types";
import { hdfc } from "./hdfc";
import { jana } from "./jana";
import { hdb } from "./hdb";
import { kotak } from "./kotak";
import { hdfcFix } from "./hdfc-fix";
import { janaFix } from "./jana-fix";

export const bankRegistry: Record<BankSlug, BankConfig> = {
  hdfc,
  jana,
  hdb,
  kotak,
  hdfc_fix: hdfcFix,
  jana_fix: janaFix,
};

export const bankSlugs: BankSlug[] = [
  "hdfc",
  "jana",
  "hdb",
  "kotak",
  "hdfc_fix",
  "jana_fix",
];

export function getBankConfig(slug: string): BankConfig | undefined {
  return bankRegistry[slug as BankSlug];
}

export function isValidBankSlug(slug: string): slug is BankSlug {
  return bankSlugs.includes(slug as BankSlug);
}

export type { BankConfig, BankSlug, FieldConfig, FieldType } from "./types";
