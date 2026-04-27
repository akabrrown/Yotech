import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function WishlistPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // In a real app, you would join with the products table
  const { data: wishlistItems } = await supabase
    .from("wishlists")
    .select("*, products(*)")
    .eq("user_id", user.id);

  return (
    <div className="p-6 sm:p-10 space-y-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">My Wishlist</h1>
        <p className="text-muted-foreground">Items you&apos;ve saved for later.</p>
      </div>

      <div className="space-y-6">
        {wishlistItems && wishlistItems.length > 0 ? (
          wishlistItems.map((item: any) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-muted/5 rounded-3xl border border-muted/50 hover:border-primary/50 transition-all duration-300">
              <div className="h-24 w-24 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
                <Image 
                  src={item.products?.images?.[0] || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=200&auto=format&fit=crop"} 
                  alt={item.products?.name} 
                  width={100} 
                  height={100} 
                  className="object-cover h-full w-full"
                />
              </div>
              
              <div className="flex-grow text-center sm:text-left space-y-1">
                <Link href={`/product/${item.products?.slug}`} className="text-lg font-bold hover:text-primary transition-colors">
                  {item.products?.name}
                </Link>
                <p className="text-primary font-extrabold text-xl">{formatPrice(item.products?.price)}</p>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {item.products?.stock_qty > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button className="flex-grow sm:flex-grow-0 rounded-xl gap-2 h-12 px-6">
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </Button>
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-destructive hover:bg-destructive/10">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center space-y-4 bg-muted/10 rounded-3xl border border-dashed border-muted-foreground/20">
            <div className="mx-auto h-16 w-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
              <Heart className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <p className="font-bold">Your wishlist is empty</p>
              <p className="text-sm text-muted-foreground">Save items you like to see them here.</p>
            </div>
            <Link href="/shop">
              <Button variant="outline" className="rounded-xl mt-4">Browse Products</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
