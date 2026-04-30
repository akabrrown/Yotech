import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CheckoutClient } from "@/components/shop/checkout-client";

export const metadata = {
  title: "Checkout | YoTech IT Solutions",
  description: "Complete your purchase securely at YoTech IT Solutions.",
};

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/30">
      <Navbar />
      <CheckoutClient />
      <Footer />
    </div>
  );
}
