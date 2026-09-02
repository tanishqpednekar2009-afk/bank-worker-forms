import { BankConfig } from "./types";

export const janaFix: BankConfig = {
  slug: "jana_fix",
  displayName: "Jana Fix",
  fields: [
    {
      key: "date",
      label: "Date",
      type: "date",
      required: true,
    },
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
    {
      key: "branch_code",
      label: "Branch Code",
      type: "text",
      required: true,
    },
  ],
};
