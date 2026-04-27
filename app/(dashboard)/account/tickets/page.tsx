import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LifeBuoy, Plus, MessageSquare, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";

import { getUserTickets } from "@/lib/actions/tickets";

export default async function TicketsPage() {
  const tickets = await getUserTickets();

  const stats = {
    open: tickets.filter(t => t.status === 'open').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    total: tickets.length
  };

  return (
    <div className="p-6 sm:p-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground">Need help? Raise a ticket and our experts will assist you.</p>
        </div>
        <Button className="rounded-xl gap-2 shadow-lg shadow-primary/10">
          <Plus className="h-4 w-4" />
          New Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-primary/5 rounded-3xl border border-primary/10 space-y-2 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-primary opacity-80">Open Tickets</p>
          <p className="text-4xl font-extrabold text-primary">{stats.open}</p>
        </div>
        <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 space-y-2 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 opacity-80">Resolved</p>
          <p className="text-4xl font-extrabold text-emerald-600">{stats.resolved}</p>
        </div>
        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-2 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 opacity-80">Total Raised</p>
          <p className="text-4xl font-extrabold text-slate-900">{stats.total}</p>
        </div>
      </div>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div 
            key={ticket.id} 
            className="p-6 rounded-3xl border border-muted/50 hover:border-primary/30 transition-all duration-300 group bg-white shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-sm text-slate-400 font-bold">#{ticket.id.slice(0, 8)}</span>
                  <Badge 
                    variant={ticket.status === 'open' ? 'secondary' : 'success'}
                    className="capitalize px-3 py-0.5 rounded-lg text-[10px] font-bold"
                  >
                    {ticket.status}
                  </Badge>
                  <Badge 
                    variant={ticket.priority === 'high' ? 'destructive' : 'outline'}
                    className="capitalize px-3 py-0.5 rounded-lg text-[10px] font-bold"
                  >
                    {ticket.priority} Priority
                  </Badge>
                </div>
                <h3 className="font-bold text-xl group-hover:text-primary transition-colors text-slate-900">{ticket.subject}</h3>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Raised {new Date(ticket.created_at).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="h-3.5 w-3.5" />
                    Ticket Support System
                  </span>
                </div>
              </div>

              <Link href={`/account/tickets/${ticket.id}`}>
                <Button variant="outline" className="rounded-xl px-6 border-slate-200">View Conversation</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {tickets.length === 0 && (
        <div className="text-center py-20 space-y-4 border-2 border-dashed rounded-3xl bg-slate-50/50">
          <div className="p-6 bg-white rounded-full inline-block shadow-sm">
            <LifeBuoy className="h-12 w-12 text-slate-300" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No support tickets</h3>
          <p className="text-slate-500">Everything looks good! If you have any issues, we&apos;re here to help.</p>
        </div>
      )}
    </div>
  );
}
