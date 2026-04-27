import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Headset } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="relative bg-primary text-white py-24 overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-primary-light max-w-2xl mx-auto">
              Have a question about our products or need technical support? Our team is here to help you find the perfect IT solution.
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="py-16 -mt-12 relative z-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="border-none shadow-lg rounded-2xl text-center hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="mx-auto h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg">Call or WhatsApp</h3>
                  <p className="text-muted-foreground text-sm">Mon - Sat, 8am - 6pm</p>
                  <a href="tel:0243710299" className="text-primary font-bold text-lg hover:underline block">
                    024 371 0299
                  </a>
                  <a href="https://wa.me/233243710299" target="_blank" rel="noopener noreferrer" className="text-primary font-bold text-sm hover:underline block">
                    WhatsApp: +233 24 371 0299
                  </a>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg rounded-2xl text-center hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="mx-auto h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Mail className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg">Email Us</h3>
                  <p className="text-muted-foreground text-sm">We reply within 24 hours</p>
                  <a href="mailto:yotechsystems@gmail.com" className="text-primary font-bold text-lg hover:underline block">
                    yotechsystems@gmail.com
                  </a>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg rounded-2xl text-center hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8 space-y-4">
                  <div className="mx-auto h-14 w-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg">Visit Us</h3>
                  <p className="text-muted-foreground text-sm">Our physical showroom</p>
                  <p className="text-foreground font-medium text-sm">
                    Behind UPS, Legon. Adjacent Green Hostel / Lister school, Accra, Ghana
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form + Info */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Form */}
              <div>
                <h2 className="text-2xl font-extrabold mb-2">Send us a Message</h2>
                <p className="text-muted-foreground mb-8">Fill out the form below and we&apos;ll get back to you shortly.</p>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-sm font-bold">Full Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full h-11 px-4 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-sm font-bold">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="you@example.com"
                        className="w-full h-11 px-4 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="text-sm font-bold">Subject</label>
                    <select
                      id="contact-subject"
                      className="w-full h-11 px-4 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Select a topic...</option>
                      <option value="sales">Product Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="bulk">Bulk / Corporate Order</option>
                      <option value="warranty">Warranty Claim</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-sm font-bold">Message</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      placeholder="Tell us how we can help..."
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    />
                  </div>

                  <Button size="lg" className="w-full rounded-xl shadow-lg shadow-primary/20 gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Info Side */}
              <div className="space-y-8">
                <div className="bg-muted/30 rounded-3xl p-8 space-y-6 border">
                  <h3 className="text-xl font-extrabold">Why Contact YoTech?</h3>
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                        <Headset className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold">Expert Technical Support</h4>
                        <p className="text-sm text-muted-foreground">Our certified engineers can help with hardware diagnostics, software issues, and network setup.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold">Corporate Solutions</h4>
                        <p className="text-sm text-muted-foreground">We provide custom bulk pricing and IT infrastructure consulting for businesses of all sizes.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 shrink-0">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold">Fast Response Time</h4>
                        <p className="text-sm text-muted-foreground">We respond to all inquiries within 24 hours. Priority support available for corporate clients.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                  <div className="relative z-10 space-y-4">
                    <h3 className="text-xl font-extrabold">Business Hours</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-primary-light">Monday — Friday</span>
                        <span className="font-bold">8:00 AM — 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-light">Saturday</span>
                        <span className="font-bold">9:00 AM — 3:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-primary-light">Sunday</span>
                        <span className="font-bold">Closed</span>
                      </div>
                    </div>
                    <p className="text-xs text-primary-light pt-2 border-t border-white/20">
                      All times are in West Africa Time (WAT)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
