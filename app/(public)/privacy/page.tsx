import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Privacy Policy | YoTech IT Solutions",
  description: "Privacy Policy and data protection guidelines for YoTech IT Solutions.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        <div className="bg-card p-8 sm:p-12 rounded-2xl shadow-sm border">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold mt-8 text-foreground">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect information that you provide directly to us when you create an account, make a purchase, or contact our support team. This may include your name, email address, phone number, shipping and billing address, and payment information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold mt-8 text-foreground">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Process your transactions and fulfill your orders</li>
                <li>Communicate with you about your orders, products, and services</li>
                <li>Provide technical support and customer service</li>
                <li>Improve our website, products, and services</li>
                <li>Protect against fraudulent transactions and unauthorized access</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold mt-8 text-foreground">3. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties except to trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold mt-8 text-foreground">4. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Payment gateway providers database.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold mt-8 text-foreground">5. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions regarding this privacy policy, you may contact us using the information on our Contact page or email us at support@yotech.com.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
