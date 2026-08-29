import ExcelJS from "exceljs";
import { ExcelColumn } from "./columnMaps";

export interface SubmissionRow {
  serial_no: number | null;
  submitted_at: string;
  data: Record<string, string>;
}

/**
 * Builds an .xlsx workbook for one bank, using the exact column order and
 * header labels from getColumnsForBank. Returns a Buffer suitable for
 * streaming as a file download.
 */
export async function generateExcelForBank(
  bankDisplayName: string,
  columns: ExcelColumn[],
  rows: SubmissionRow[]
): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(bankDisplayName);

  sheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.key,
    width: Math.max(col.header.length + 4, 14),
  }));

  sheet.getRow(1).font = { bold: true };

  for (const row of rows) {
    const rowValues: Record<string, string | number> = {};
    for (const col of columns) {
      if (col.key === "sr_no") {
        rowValues[col.key] = row.serial_no ?? "";
      } else {
        rowValues[col.key] = row.data[col.key] ?? "";
      }
    }
    sheet.addRow(rowValues);
  }

  const arrayBuffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(arrayBuffer);
}
