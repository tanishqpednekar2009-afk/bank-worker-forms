import { NextRequest, NextResponse } from "next/server";
import { isValidBankSlug, bankRegistry } from "@/lib/banks";
import { getColumnsForBank } from "@/lib/export/columnMaps";
import { generateExcelForBank, SubmissionRow } from "@/lib/export/generateExcel";
import { supabaseServer } from "@/lib/supabaseServer";

// This route runs server-side only. It may use SUPABASE_SERVICE_ROLE_KEY
// (via lib/supabaseServer.ts) which is never sent to the browser.
export async function GET(
  _req: NextRequest,
  { params }: { params: { bank: string } }
) {
  const { bank: bankSlug } = params;

  if (!isValidBankSlug(bankSlug)) {
    return NextResponse.json({ error: "Unknown bank." }, { status: 404 });
  }

  const bankConfig = bankRegistry[bankSlug];
  const columns = getColumnsForBank(bankConfig);

  const { data, error } = await supabaseServer
    .from("submissions")
    .select("serial_no, submitted_at, data")
    .eq("bank", bankSlug)
    .order("submitted_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (data ?? []) as SubmissionRow[];
  const buffer = await generateExcelForBank(bankConfig.displayName, columns, rows);

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${bankSlug}-submissions.xlsx"`,
    },
  });
}
