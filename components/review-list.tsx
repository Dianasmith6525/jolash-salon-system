'use client';

import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewListProps {
  productId: string;
  reviews: Review[];
}

export function ReviewList({ productId, reviews }: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          No reviews yet. Be the first to review this product!
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold">{review.user}</h4>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{review.date}</span>
            </div>
            <p className="text-gray-600 leading-relaxed">{review.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
