const FALLBACK_RATE = 16000; // fallback IDR per USD

/**
 * Fetch the current IDR to USD exchange rate.
 * Uses fawazahmed0/exchange-api (free, no key, no rate limit).
 * Cached/revalidated every hour via Next.js fetch cache.
 * Returns how many IDR per 1 USD.
 */
export async function getIDRtoUSDRate(): Promise<number> {
  try {
    const res = await fetch(
      "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
      { next: { revalidate: 3600 } } // cache 1 hour
    );

    if (!res.ok) throw new Error(`Exchange rate API returned ${res.status}`);

    const data = await res.json();
    const idrPerUsd = data?.usd?.idr;

    if (!idrPerUsd || typeof idrPerUsd !== "number") {
      throw new Error("Invalid exchange rate data");
    }

    return idrPerUsd;
  } catch (error) {
    console.error("Failed to fetch exchange rate, using fallback:", error);
    return FALLBACK_RATE;
  }
}

/**
 * Convert IDR amount to USD string display.
 */
export function convertToUSD(amountIDR: number, rate: number): string {
  const usd = amountIDR / rate;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(usd);
}
