import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata = {
  title: "Terms & Conditions | YoTech IT Solutions",
  description: "Terms and conditions for using YoTech IT Solutions services and website.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        <div className="bg-card p-8 sm:p-12 rounded-2xl shadow-sm border">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Terms and Conditions</h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold mt-8 text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website&apos;s particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold mt-8 text-foreground">2. Products and Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                YoTech IT Solutions reserves the right to modify or discontinue any product or service without notice. We shall not be liable to you or to any third party for any modification, price change, suspension or discontinuance of the service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold mt-8 text-foreground">3. Pricing and Payments</h2>
              <p className="text-muted-foreground leading-relaxed">
                All prices are subject to change without notice. We reserve the right to refuse or cancel any order placed for a product listed at the incorrect price. Payment is required in full before the dispatch of any products or commencement of any services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold mt-8 text-foreground">4. Returns and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                Please review our Return Policy posted on the website. Hardware returns are accepted within 14 days of purchase, provided the item is in its original, unopened packaging. Software licenses and digital products are non-refundable once delivered.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold mt-8 text-foreground">5. Warranties and Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                All hardware products come with the manufacturer&apos;s warranty. YoTech IT Solutions makes no additional warranties, express or implied. In no event shall YoTech IT Solutions be liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or inability to use our products or services.
              </p>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold mt-8 text-foreground">6. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of Nigeria and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
