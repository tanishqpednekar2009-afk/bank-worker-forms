import { BankConfig } from "./types";

export const hdb: BankConfig = {
  slug: "hdb",
  displayName: "HDB Bank",
  fields: [
    { key: "branch_name", label: "Branch Name", type: "text", required: true },
    { key: "branch_id", label: "Branch ID", type: "text", required: true },
    { key: "disb_date", label: "DISB DATE", type: "date", required: true },
    { key: "customer_name", label: "Customer Name", type: "text", required: true },
    { key: "loan_amount", label: "Loan Amount", type: "number", required: true },
    { key: "valuer_name", label: "Valuer Name", type: "text", required: true },
    { key: "in_time", label: "In Time", type: "time", required: true },
    { key: "out_time", label: "Out Time", type: "time", required: true },
  ],
};
