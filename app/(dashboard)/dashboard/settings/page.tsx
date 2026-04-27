import { getStoreSettings } from "@/lib/actions/settings";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
  const initialSettings = await getStoreSettings();

  return <SettingsForm initialSettings={initialSettings} />;
}
