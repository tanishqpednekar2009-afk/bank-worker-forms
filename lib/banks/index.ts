import { BankConfig, BankSlug } from "./types";
import { hdfc } from "./hdfc";
import { jana } from "./jana";
import { hdb } from "./hdb";
import { kotak } from "./kotak";
import { hdfcFix } from "./hdfc-fix";
import { janaFix } from "./jana-fix";
import { hdbNotDone } from "./hdb-not-done";

export const bankRegistry: Record<BankSlug, BankConfig> = {
  hdfc,
  jana,
  hdb,
  kotak,
  hdfc_fix: hdfcFix,
  jana_fix: janaFix,
  hdb_not_done: hdbNotDone,
};

export const bankSlugs: BankSlug[] = [
  "hdfc",
  "jana",
  "hdb",
  "kotak",
  "hdfc_fix",
  "jana_fix",
  "hdb_not_done",
];

export function getBankConfig(slug: string): BankConfig | undefined {
  return bankRegistry[slug as BankSlug];
}

export function isValidBankSlug(slug: string): slug is BankSlug {
  return bankSlugs.includes(slug as BankSlug);
}

export type { BankConfig, BankSlug, FieldConfig, FieldType } from "./types";
