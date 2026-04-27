import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LifeBuoy, Search, Filter, MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTickets } from "@/lib/actions/tickets";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default async function TicketsPage() {
  const tickets = await getTickets();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Support Queue</h1>
          <p className="text-slate-500 font-medium">Respond to customer support requests and tickets.</p>
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
        <CardHeader className="border-b bg-slate-50/50 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                placeholder="Search tickets..." 
                className="pl-10 rounded-xl border-slate-200 bg-white"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-xl gap-2 border-slate-200 bg-white font-bold text-xs uppercase tracking-widest">
                <Filter className="h-4 w-4" />
                Priority: All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {tickets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Subject</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Priority</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                           <div className="p-2 rounded-lg bg-primary/10 text-primary">
                             <MessageCircle className="h-4 w-4" />
                           </div>
                           <div className="flex flex-col">
                             <span className="font-bold text-slate-900 group-hover:text-primary transition-colors">
                               {ticket.subject}
                             </span>
                             <span className="text-[10px] text-slate-400 font-mono">#{ticket.id.slice(0, 8)}</span>
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {ticket.profiles?.full_name || "Unknown"}
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                          ticket.status === 'open' ? "bg-amber-100 text-amber-700 hover:bg-amber-100" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                        )}>
                          {ticket.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={cn(
                          "rounded-lg font-bold text-[10px] uppercase tracking-widest",
                          ticket.priority === 'high' ? "border-rose-200 text-rose-500 bg-rose-50" : "border-slate-200 text-slate-500 bg-slate-50"
                        )}>
                          {ticket.priority}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="rounded-xl">
                          <ExternalLink className="h-4 w-4 text-slate-400" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-center p-12">
              <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-4">
                <LifeBuoy className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No open tickets</h3>
              <p className="text-slate-500 max-w-xs mt-1">
                Great job! Your support queue is currently clear.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
