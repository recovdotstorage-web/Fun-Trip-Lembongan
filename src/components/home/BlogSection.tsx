import Image from "next/image";
import Link from "next/link";

const articles = [
  {
    id: 1,
    title: "A Complete Guide to Snorkeling with Manta Rays in Nusa Penida",
    excerpt:
      "Everything you need to know about swimming with these gentle giants, the best times to go, and what to expect during your trip.",
    category: "Snorkeling Guide",
    date: "May 10, 2026",
    image: "/images/snorkeling.png",
  },
  {
    id: 2,
    title: "Top 5 Hidden Beaches in Nusa Lembongan You Must Visit",
    excerpt:
      "Escape the crowds and discover pristine white sands and crystal clear waters at these secret spots only locals know about.",
    category: "Island Exploration",
    date: "April 28, 2026",
    image: "/images/hero.png",
  },
  {
    id: 3,
    title: "How to Get to Nusa Lembongan from Bali: Fast Boat Guide",
    excerpt:
      "Planning your trip? Here is the ultimate transportation guide from Sanur harbor to Nusa Lembongan, including tips and schedules.",
    category: "Travel Tips",
    date: "April 15, 2026",
    image: "/images/island-tour.png",
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[#005b96] font-bold tracking-widest uppercase text-sm mb-2">
            Lembongan Guide
          </h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Latest Travel Articles
          </h3>
          <p className="text-lg text-slate-600">
            Discover local tips, itinerary ideas, and everything you need to know
            before visiting our beautiful island.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white overflow-hidden shadow-lg border border-slate-100 transition-transform duration-300 hover:-translate-y-2 flex flex-col cursor-pointer group"
            >
              <div className="h-56 overflow-hidden relative">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#005b96] text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                  {article.category}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                  {article.date}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#005b96] transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-slate-600 mb-6 flex-grow text-sm leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="mt-auto border-t border-slate-100 pt-4 flex items-center text-[#005b96] font-bold text-sm uppercase tracking-wider group-hover:text-amber-500 transition-colors">
                  Read Article <span className="ml-2">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-[#005b96] text-[#005b96] hover:bg-[#005b96] hover:text-white px-8 py-4 font-bold text-lg transition-all mx-auto"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
