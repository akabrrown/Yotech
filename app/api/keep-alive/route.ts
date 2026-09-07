import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  // Check for an optional auth header to prevent abuse if needed,
  // but this is mostly a harmless read operation.
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET || 'keepalive'}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = await createClient();
    
    // Perform a lightweight query to wake up / keep the DB alive
    const { error } = await supabase
      .from('products')
      .select('id')
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Keep-alive error:", error);
      return NextResponse.json({ status: "error", message: "Failed to ping database" }, { status: 500 });
    }

    return NextResponse.json({ status: "ok", message: "Database is alive" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ status: "error", message: "Internal Server Error" }, { status: 500 });
  }
}
