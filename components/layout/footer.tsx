import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted pt-16 pb-8 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Logo height={42} />
            <p className="text-muted-foreground text-sm leading-relaxed">
              YoTech IT Solutions is your premier destination for high-quality IT hardware, software licenses, and professional technical support services.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://facebook.com/YotechSystems" target="_blank" rel="noopener noreferrer" aria-label="Facebook Yotech Systems" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Shop All Products</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Support</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-6">
            <h4 className="font-bold text-lg">Categories</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/shop/laptops" className="text-muted-foreground hover:text-primary transition-colors">Laptops</Link></li>
              <li><Link href="/shop/desktops" className="text-muted-foreground hover:text-primary transition-colors">Desktop PCs</Link></li>
              <li><Link href="/shop/accessories" className="text-muted-foreground hover:text-primary transition-colors">Accessories</Link></li>
              <li><Link href="/shop/software" className="text-muted-foreground hover:text-primary transition-colors">Software Licenses</Link></li>
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
