import { BankConfig } from "./types";

export const hdbNotDone: BankConfig = {
  slug: "hdb_not_done",
  displayName: "HDB Not Done",
  fields: [
    {
      key: "branch_name",
      label: "Branch Name",
      type: "text",
      required: true,
    },
    {
      key: "branch_id",
      label: "Branch ID",
      type: "text",
      required: true,
    },
    {
      key: "disb_date",
      label: "DISB DATE",
      type: "date",
      required: true,
    },
    {
      key: "customer_name",
      label: "Customer Name",
      type: "text",
      required: true,
    },
    {
      key: "loan_amount",
      label: "Loan Amount",
      type: "number",
      required: true,
    },
    {
      key: "valuer_name",
      label: "Valuer Name",
      type: "text",
      required: true,
    },
    {
      key: "not_done",
      label: "Not Done",
      type: "text",
      required: true,
    },
  ],
};
