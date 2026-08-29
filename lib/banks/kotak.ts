import { BankConfig } from "./types";

export const kotak: BankConfig = {
  slug: "kotak",
  displayName: "Kotak Bank",
  fields: [
    { key: "date", label: "Date", type: "date", required: true },
    { key: "apac_no", label: "APAC No.", type: "text", required: true },
    { key: "disb_amount", label: "Disb Amount", type: "number", required: true },
    { key: "in_time", label: "In Time", type: "time", required: true },
    { key: "out_time", label: "Out Time", type: "time", required: true },
    { key: "branch", label: "Branch", type: "text", required: true },
    { key: "valuer_name", label: "Valuer Name", type: "text", required: true },
  ],
};
