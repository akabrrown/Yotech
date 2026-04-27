"use client";

import * as React from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { submitReview } from "@/lib/actions/reviews";
import { cn } from "@/lib/utils";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export function ReviewForm({ productId }: { productId: string }) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [hoverRating, setHoverRating] = React.useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  const rating = useWatch({
    control,
    name: "rating",
  }) || 5;

  const onSubmit = async (data: ReviewFormValues) => {
    setIsSubmitting(true);
    try {
      await submitReview({
        product_id: productId,
        rating: data.rating,
        comment: data.comment,
      });
      toast.success("Review submitted successfully!");
      reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to submit review";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
      <div className="space-y-3">
        <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Your Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setValue("rating", i)}
              onMouseEnter={() => setHoverRating(i)}
              onMouseLeave={() => setHoverRating(0)}
              className="transition-transform active:scale-90"
            >
              <Star
                className={cn(
                  "h-8 w-8 transition-colors",
                  (hoverRating || rating) >= i 
                    ? "fill-amber-400 text-amber-400" 
                    : "text-slate-300"
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">Your Review</label>
        <textarea
          {...register("comment")}
          className="w-full min-h-[120px] bg-white border border-slate-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
          placeholder="Share your experience with this product..."
        />
        {errors.comment && <p className="text-xs text-rose-500 font-medium">{errors.comment.message}</p>}
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/10" 
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Submit Review"}
      </Button>
    </form>
  );
}
