"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, User, Menu, X, Heart, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { CartDrawer } from "@/components/shop/cart-drawer";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { type Category, type User as SupabaseUser } from "@/types";

interface NavbarClientProps {
  categories: Category[];
}

export function NavbarClient({ categories }: NavbarClientProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [user, setUser] = React.useState<any | null>(null);
  const [role, setRole] = React.useState<string | null>(null);
  
  const navItems = [
    { name: "Shop", href: "/shop" },
    ...categories.slice(0, 4).map((cat) => ({
      name: cat.name,
      href: `/shop/${cat.slug}`,
    })),
    { name: "Support", href: "/contact" },
  ];
  const { items, totalItems } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const supabase = createClient();

  React.useEffect(() => {
    setMounted(true);
    const initializeAuth = async () => {
      // Get initial session safely
      const { data: { session } } = await supabase.auth.getSession();
      const initialUser = session?.user ?? null;
      setUser(initialUser);
      
      if (initialUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", initialUser.id)
          .single();
        setRole(profile?.role || null);
      }

      // Listen for changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        const newUser = session?.user ?? null;
        setUser(newUser);
        if (newUser) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", newUser.id)
            .single();
          setRole(profile?.role || null);
        } else {
          setRole(null);
        }
      });

      return subscription;
    };

    const authPromise = initializeAuth();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      authPromise.then(sub => sub.unsubscribe());
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm py-2"
            : "bg-white py-4"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo height={38} />

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {totalItems}
                  </span>
                )}
              </Button>
              
              {user ? (
                <div className="flex items-center gap-2 sm:gap-4">
                  {role === "admin" && (
                    <Link href="/dashboard" className="hidden lg:flex">
                      <Button variant="ghost" className="text-primary font-bold gap-2">
                        <Monitor className="h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  <Link href="/account">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="sm" className="hidden sm:flex" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/login">
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    Login
                  </Button>
                </Link>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-4 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <>
                  {role === "admin" && (
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full text-primary font-bold gap-2 justify-start">
                        <Monitor className="h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  <Link href="/account" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Account</Button>
                  </Link>
                  <Button className="w-full" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
                    Logout
                  </Button>
                </>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Login / Register</Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
