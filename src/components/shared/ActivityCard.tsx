import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ActivityCardProps {
  name: string;
  slug: string;
  shortDescription: string;
  price: number;
  duration: string;
  imageUrl?: string;
  categoryName: string;
}

export function ActivityCard({
  name,
  slug,
  shortDescription,
  price,
  duration,
  imageUrl,
  categoryName,
}: ActivityCardProps) {
  return (
    <Link
      href={`/activities/${slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-gray-100"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-emerald-200 to-teal-300 flex items-center justify-center">
            <span className="text-emerald-700 font-medium text-lg">
              {name.charAt(0)}
            </span>
          </div>
        )}
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-semibold bg-white/90 backdrop-blur-sm text-emerald-700 rounded-full">
            {categoryName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
          {name}
        </h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {shortDescription}
        </p>

        {/* Meta */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Starts from
            </p>
            <p className="text-lg font-bold text-emerald-600">
              {formatCurrency(price)}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{duration}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
            View Details
          </span>
          <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
