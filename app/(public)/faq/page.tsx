import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HelpCircle } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions | YoTech IT Solutions",
  description: "Find answers to common questions about YoTech IT Solutions products, shipping, returns, and support.",
};

const faqs = [
  {
    question: "Do you offer warranties on your products?",
    answer: "Yes, all our hardware products come with a standard manufacturer's warranty. The duration varies depending on the specific product and manufacturer. If you encounter any issues during the warranty period, our technical support team will assist you with the claim process."
  },
  {
    question: "How long does shipping take?",
    answer: "For orders within Accra, delivery typically takes 1-2 business days. For other regions in Ghana, please allow 3-5 business days. We offer expedited shipping options for corporate clients and bulk orders."
  },
  {
    question: "Can you help with hardware installation or network setup?",
    answer: "Absolutely! We don't just sell hardware; we provide complete IT solutions. Our certified engineers can assist with everything from basic computer setups to complex enterprise networking and server configurations. Please contact us to schedule an on-site visit."
  },
  {
    question: "What is your return policy?",
    answer: "Hardware products can be returned within 14 days of purchase provided they are unopened and in their original packaging. Software licenses and digital products are non-refundable once delivered. Please review our Terms of Service for full details."
  },
  {
    question: "Do you offer corporate discounts or bulk pricing?",
    answer: "Yes, we offer specialized pricing for B2B clients, schools, and bulk purchases. Please reach out to our sales team at yotechsystems@gmail.com with your requirements, and we will provide a customized quote."
  },
  {
    question: "Are your software licenses genuine?",
    answer: "100% genuine. We are authorized partners for major software providers. All licenses we sell are legitimate and come directly from the official vendors."
  }
];

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Find answers to common questions about our products and services.
          </p>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-card p-6 sm:p-8 rounded-2xl shadow-sm border hover:border-primary/50 transition-colors">
              <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center bg-muted/30 p-8 rounded-3xl border border-dashed">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">Our support team is always ready to help you.</p>
          <a href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary h-10 px-8 py-2 bg-primary text-primary-foreground hover:bg-primary-dark shadow-sm">
            Contact Support
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
