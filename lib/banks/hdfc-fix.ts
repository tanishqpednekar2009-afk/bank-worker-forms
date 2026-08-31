import { BankConfig } from "./types";

export const hdfcFix: BankConfig = {
  slug: "hdfc_fix",
  displayName: "HDFC Fix",
  fields: [
    {
      key: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      key: "in_time",
      label: "In Time",
      type: "time",
      required: true,
    },
    {
      key: "out_time",
      label: "Out Time",
      type: "time",
      required: true,
    },
    {
      key: "branch",
      label: "Branch",
      type: "text",
      required: true,
    },
  ],
};
