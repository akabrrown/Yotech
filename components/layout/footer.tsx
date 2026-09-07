import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Mail, Phone, MapPin, Truck, ShieldCheck, Headphones, CreditCard, ShoppingBag, Info, MessageCircle, HelpCircle, Laptop, Monitor, MousePointer, FileCode } from "lucide-react";

const footerFeatures = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Prompt delivery across Ghana",
  },
  {
    icon: ShieldCheck,
    title: "100% Authentic",
    description: "Genuine hardware & software",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Professional tech assistance",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "100% safe & secure checkout",
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted pt-16 pb-8 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 pb-12 border-b">
          {footerFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 group">
              <div className="p-3 rounded-2xl bg-white shadow-sm text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h5 className="font-bold text-sm uppercase tracking-wider">{feature.title}</h5>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Logo height={42} />
            <p className="text-muted-foreground text-sm leading-relaxed">
              YoTech IT Solutions is your premier destination for high-quality IT hardware, software licenses, and professional technical support services.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/yotechsystems/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="social-btn social-instagram"
              >
                <svg className="social-svgIcon" viewBox="0 0 448 512" height="1.4em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
                <span className="social-text">Instagram</span>
              </a>

              <a
                href="https://www.facebook.com/yotechsystems/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="social-btn social-facebook"
              >
                <svg className="social-svgIcon" viewBox="0 0 320 512" height="1.4em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                </svg>
                <span className="social-text">Facebook</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 text-primary" />
                  Shop All Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg">Categories</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/shop/laptops" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Laptop className="h-4 w-4 text-primary" />
                  Laptops
                </Link>
              </li>
              <li>
                <Link href="/shop/desktops" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-primary" />
                  Desktop PCs
                </Link>
              </li>
              <li>
                <Link href="/shop/accessories" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <MousePointer className="h-4 w-4 text-primary" />
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop/software" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <FileCode className="h-4 w-4 text-primary" />
                  Software Licenses
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">Behind UPS, Legon. Adjacent Green Hostel / Lister school, Accra, Ghana</span>
              </li>
              <li className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary shrink-0" />
                  <a href="tel:0243710299" className="text-muted-foreground hover:text-primary transition-colors">024 371 0299</a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-5 shrink-0" /> {/* Spacer for icon alignment */}
                  <a href="https://wa.me/233243710299" target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-medium hover:text-emerald-500 transition-colors">
                    WhatsApp: +233 24 371 0299
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground">yotechsystems@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} YoTech IT Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
