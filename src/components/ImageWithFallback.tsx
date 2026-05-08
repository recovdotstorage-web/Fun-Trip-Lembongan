"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { Compass } from "lucide-react";

interface ImageWithFallbackProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string | null;
  alt?: string;
  fallback?: React.ReactNode;
}

export default function ImageWithFallback({
  src,
  alt,
  className,
  fallback,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(!src);

  if (error || !src) {
    return (
      <div className={`flex items-center justify-center bg-linear-to-br from-emerald-200 to-teal-300 ${className}`}>
        {fallback || <Compass className="w-16 h-16 text-emerald-600/30" />}
      </div>
    );
  }

  return (
    <div className={`relative ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt || "Image"}
        fill={props.fill ?? true}
        sizes={props.sizes ?? "100vw"}
        className="object-cover"
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
}
