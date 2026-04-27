import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSlugs() {
  const { data, error } = await supabase
    .from("products")
    .select("name, slug");

  if (error) {
    console.error("Error:", error);
    return;
  }

  console.log("Products and Slugs:");
  data.forEach((p) => {
    console.log(`- ${p.name}: ${p.slug}`);
  });
}

checkSlugs();
