import { Button } from "@/components/ui/button";
import { Plus, MapPin, MoreVertical, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AddressesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: addresses } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", user.id)
    .order("is_default", { ascending: false });

  return (
    <div className="p-6 sm:p-10 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">Address Book</h1>
          <p className="text-muted-foreground">Manage your shipping and billing addresses.</p>
        </div>
        <Button className="rounded-xl shadow-lg shadow-primary/10 gap-2">
          <Plus className="h-4 w-4" /> Add New Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses && addresses.length > 0 ? (
          addresses.map((address) => (
            <div 
              key={address.id} 
              className={`p-6 rounded-3xl border relative group transition-all duration-300 ${
                address.is_default ? "border-primary bg-primary/5 shadow-md shadow-primary/5" : "border-muted-foreground/20 hover:border-primary/50"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl ${address.is_default ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="font-bold">{address.label || "Home"}</span>
                  {address.is_default && (
                    <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-md flex items-center gap-1">
                      <Check className="h-3 w-3" /> Default
                    </span>
                  )}
                </div>
                <Button variant="ghost" size="icon" className="rounded-xl h-8 w-8">
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="text-foreground font-medium">{address.street}</p>
                <p>{address.city}, {address.state}</p>
                <p>{address.country} {address.postal_code}</p>
              </div>

              <div className="mt-6 flex gap-2">
                <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs font-bold text-primary">Edit</Button>
                {!address.is_default && (
                  <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs font-bold">Set as Default</Button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-4 bg-muted/10 rounded-3xl border border-dashed border-muted-foreground/20">
            <div className="mx-auto h-16 w-16 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
              <MapPin className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <p className="font-bold">No addresses found</p>
              <p className="text-sm text-muted-foreground">You haven't added any shipping addresses yet.</p>
            </div>
            <Button variant="outline" className="rounded-xl">Add Your First Address</Button>
          </div>
        )}
      </div>
    </div>
  );
}
