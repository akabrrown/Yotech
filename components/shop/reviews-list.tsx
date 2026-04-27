import { Review } from "@/types";
import { Star, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-16 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
        <p className="text-slate-500 font-medium italic">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {reviews.map((review) => (
        <div key={review.id} className="group pb-8 border-b border-slate-100 last:border-0 last:pb-0">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{review.profiles?.full_name || "Verified Customer"}</h4>
                <p className="text-xs text-slate-400 font-medium">{format(new Date(review.created_at), "MMMM d, yyyy")}</p>
              </div>
            </div>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-4 w-4",
                    review.rating >= star ? "fill-amber-400 text-amber-400" : "text-slate-200"
                  )}
                />
              ))}
            </div>
          </div>
          <p className="text-slate-600 leading-relaxed pl-16">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
}
