import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { formatCurrency, formatUSD } from "@/lib/utils";

interface ActivityCardProps {
  name: string;
  slug: string;
  shortDescription: string;
  price: number;
  duration: string;
  imageUrl?: string;
  categoryName: string;
  exchangeRate?: number;
}

export function ActivityCard({
  name,
  slug,
  shortDescription,
  price,
  duration,
  imageUrl,
  categoryName,
  exchangeRate,
}: ActivityCardProps) {
  return (
    <Link
      href={`/services/${slug}`}
      className="group block bg-white rounded-none overflow-hidden border border-zinc-200 hover:border-zinc-900 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 border-b border-zinc-200">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[0.2] group-hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-zinc-50 flex items-center justify-center">
            <span className="text-zinc-400 font-medium text-lg uppercase tracking-tighter">
              {name.charAt(0)}
            </span>
          </div>
        )}
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 text-[10px] font-medium bg-zinc-900 text-white rounded-none uppercase tracking-[0.2em]">
            {categoryName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-xl font-medium text-zinc-900 group-hover:text-zinc-900 transition-colors line-clamp-1 font-[family-name:var(--font-outfit)] leading-tight mb-3">
            {name}
          </h3>
          <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed font-light mb-6">
            {shortDescription}
          </p>
        </div>

        {/* Meta */}
        <div className="mt-auto">
          <div className="flex items-center justify-between border-t border-zinc-100 pt-6 mb-6">
            <div className="flex flex-col">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1">
                From
              </span>
              <span className="text-lg font-medium text-zinc-900">
                {formatCurrency(price)}
              </span>
              <span className="text-[11px] text-zinc-400 font-light">
                ≈ {formatUSD(price, exchangeRate)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[11px] uppercase tracking-wider">{duration}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between text-zinc-900 group-hover:translate-x-1 transition-transform">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
              View Details
            </span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
