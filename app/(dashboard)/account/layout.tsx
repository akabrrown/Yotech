import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomerSidebar } from "@/components/layout/customer-sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 shrink-0">
              <CustomerSidebar />
            </div>

            {/* Content Area */}
            <div className="flex-grow bg-white rounded-3xl shadow-sm border border-muted/50 overflow-hidden min-h-[600px]">
              {children}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
