import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CheckoutClient } from "@/components/shop/checkout-client";
import { getStoreSettings } from "@/lib/actions/settings";

export const metadata = {
  title: "Checkout | YoTech IT Solutions",
  description: "Complete your purchase securely at YoTech IT Solutions.",
};

export default async function CheckoutPage() {
  const settings = await getStoreSettings();
  
  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Navbar />
      <CheckoutClient settings={settings} />
      <Footer />
    </div>
  );
}
