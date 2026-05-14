"use client";

import Link from "next/link";
import { ArrowLeft, MapPinOff } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000); // 5 seconds delay before automatic redirect

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-white p-4 rounded-full shadow-lg">
              <MapPinOff className="w-12 h-12 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900 tracking-tighter">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800">Oops! Page Not Found</h2>
          <p className="text-gray-600">
            It looks like you are lost. The page or destination you are looking for could not be found in our system.
          </p>
          <p className="text-sm text-blue-600 font-medium">
            You will be automatically redirected to the Homepage in 5 seconds...
          </p>
        </div>

        <div className="pt-4">
          <Link 
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-medium transition-all hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
