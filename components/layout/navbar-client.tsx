"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, User, Menu, X, Heart, Monitor, Home, Store, Tag, Headset, Laptop, Cpu, MousePointer2, FileCode, Server as ServerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { CartDrawer } from "@/components/shop/cart-drawer";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { type Category } from "@/types";
import { type User as SupabaseUser } from "@supabase/supabase-js";

interface NavbarClientProps {
  categories: Category[];
}

export function NavbarClient({ categories }: NavbarClientProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [user, setUser] = React.useState<SupabaseUser | null>(null);
  const [role, setRole] = React.useState<string | null>(null);
  
  const getCategoryIcon = (name: string) => {
    switch (name) {
      case "Laptops": return Laptop;
      case "Desktops":
      case "Desktop PCs":
      case "Desktop PC's":
      case "Monitors": return Monitor;
      case "Components": return Cpu;
      case "Software": return FileCode;
      case "Accessories": return MousePointer2;
      case "Networking": return ServerIcon;
      default: return Tag;
    }
  };

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Shop", href: "/shop", icon: Store },
    ...categories.slice(0, 4).map((cat) => ({
      name: cat.name,
      href: `/shop/${cat.slug}`,
      icon: getCategoryIcon(cat.name),
    })),
    { name: "Support", href: "/contact", icon: Headset },
  ];
  const { items, totalItems } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const supabase = createClient();

  React.useEffect(() => {
    // Defer mounting to satisfy React 19/Next 16 linting rules
    const mountTimeout = setTimeout(() => setMounted(true), 0);
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
      clearTimeout(mountTimeout);
      window.removeEventListener("scroll", handleScroll);
      authPromise.then(sub => sub.unsubscribe());
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  React.useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

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
                  className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Expanding Search */}
              <div className="hidden sm:flex items-center">
                {isSearchOpen ? (
                  <form
                    onSubmit={handleSearch}
                    className="flex items-center gap-1 bg-muted/40 border border-border rounded-full px-3 py-1 animate-in fade-in slide-in-from-right-2 duration-200"
                  >
                    <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={() => {
                        if (!searchQuery.trim()) setIsSearchOpen(false);
                      }}
                      className="w-48 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          setSearchQuery("");
                          searchInputRef.current?.focus();
                        }}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </form>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSearchOpen(true)}
                    aria-label="Open search"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                )}
              </div>
              <Link href="/account/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {mounted && wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>
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
                  className="flex items-center gap-3 text-base font-medium text-foreground/80 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 text-muted-foreground" />
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
