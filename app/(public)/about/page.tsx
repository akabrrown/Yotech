import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Shield, Target, Users, Zap } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "About Us | YoTech IT Solutions",
  description: "Learn more about YoTech IT Solutions, our mission, vision, and the team behind our premium IT services.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary py-24 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
            <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[150%] bg-white/20 rotate-12 blur-3xl rounded-full" />
            <div className="absolute top-[60%] -left-[10%] w-[40%] h-[100%] bg-white/10 -rotate-12 blur-2xl rounded-full" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                Empowering Your Digital World
              </h1>
              <p className="text-lg md:text-xl text-primary-light leading-relaxed">
                YoTech IT Solutions is Ghana&apos;s premier destination for high-quality IT hardware, software licenses, and professional technical support services. We bridge the gap between complex technology and seamless user experiences.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded with a passion for technological excellence, YoTech Systems started with a simple mission: to provide reliable, high-performance IT equipment to businesses and individuals in Accra and beyond.
                  </p>
                  <p>
                    Over the years, we have grown from a small hardware retailer into a comprehensive IT solutions provider. We realized that our clients didn&apos;t just need computers; they needed a trusted partner who could design, implement, and maintain their entire IT infrastructure.
                  </p>
                  <p>
                    Today, situated behind UPS, Legon, we serve hundreds of satisfied customers, ranging from students needing reliable laptops to enterprise corporations requiring complex networking and server deployments.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-video rounded-3xl overflow-hidden bg-muted relative shadow-xl">
                  {/* Using a placeholder from Unsplash for the office/tech vibe */}
                  <Image 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" 
                    alt="YoTech Office Environment" 
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-lg border">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                      10+
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Years of Experience</p>
                      <p className="text-xs text-muted-foreground">In IT Solutions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground">
                These principles guide everything we do, from selecting the products we sell to how we support our customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-card p-8 rounded-2xl shadow-sm border text-center hover:border-primary/50 transition-colors">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Integrity</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We only source 100% genuine products. Honesty and transparency are at the heart of our business relationships.
                </p>
              </div>
              
              <div className="bg-card p-8 rounded-2xl shadow-sm border text-center hover:border-primary/50 transition-colors">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Excellence</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We strive for superior performance in our hardware selection and the technical services we deliver.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-sm border text-center hover:border-primary/50 transition-colors">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We stay ahead of the technology curve to bring our clients the most efficient and modern IT solutions available.
                </p>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-sm border text-center hover:border-primary/50 transition-colors">
                <div className="mx-auto h-14 w-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Customer First</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Your success is our success. We prioritize exceptional customer service and long-term partnerships.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
