import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Compass,
  BookOpen,
  ChevronRight,
  History,
  User as UserIcon,
  Globe,
  ShieldCheck,
  Plane,
} from "lucide-react";
import AnalyticsChart from "@/components/admin/AnalyticsChart";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import * as motion from "framer-motion/client";

export const dynamic = "force-dynamic";

async function getStats(timeframe: "week" | "month" | "all" = "week") {
  const safeCount = async (model: any, where?: any) => {
    try {
      if (!model) return 0;
      return await model.count({ where });
    } catch (e) {
      return 0;
    }
  };

  const [
    totalServices,
    publishedServices,
    draftServices,
    totalPosts,
    publishedPosts,
    totalVisitors,
    totalUsers,
    totalLogs,
    totalForeignVisitors,
  ] = await Promise.all([
    prisma.activity.count(),
    prisma.activity.count({ where: { status: "PUBLISHED" } }),
    prisma.activity.count({ where: { status: "DRAFT" } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.visitorLog.count(),
    prisma.user.count(),
    prisma.auditLog.count(),
    prisma.visitorLog.count({ where: { countryCode: { not: "ID" } } }),
  ]);

  const recentServices = await prisma.activity.findMany({
    orderBy: { updatedAt: "desc" },
    take: 5,
    select: {
      id: true,
      name: true,
      slug: true,
      status: true,
      price: true,
      updatedAt: true,
    },
  });

  const recentLogs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50, // Increase for pagination
  }).catch(() => []);

  // Fetch Top 6 Visitor Logs safely
  const topVisitors = await prisma.visitorLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
  }).catch(() => []);

  // ... existing chart data logic ...
  let startDate = new Date();
  const chartDataMap: Record<string, number> = {};
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Makassar",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  if (timeframe === "week") {
    startDate.setDate(startDate.getDate() - 7);
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const [_, month, day] = formatter.format(d).split("-");
      chartDataMap[`${day}/${month}`] = 0;
    }
  } else if (timeframe === "month") {
    startDate.setDate(startDate.getDate() - 30);
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const [_, month, day] = formatter.format(d).split("-");
      chartDataMap[`${day}/${month}`] = 0;
    }
  } else {
    // "all" - group by month for the last 12 months
    startDate.setFullYear(startDate.getFullYear() - 1);
    const monthFormatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Makassar",
      month: "short",
      year: "2-digit",
    });
    for (let i = 11; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      chartDataMap[monthFormatter.format(d)] = 0;
    }
  }

  const rawVisitors = await prisma.visitorLog.findMany({
    where: {
      createdAt: {
        gte: startDate,
      },
    },
    select: { createdAt: true },
  }).catch(() => []);

  rawVisitors.forEach((v: any) => {
    let label = "";
    if (timeframe === "all") {
      label = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Makassar",
        month: "short",
        year: "2-digit",
      }).format(v.createdAt);
    } else {
      const [_, month, day] = formatter.format(v.createdAt).split("-");
      label = `${day}/${month}`;
    }

    if (chartDataMap[label] !== undefined) {
      chartDataMap[label]++;
    }
  });

  const chartData = Object.keys(chartDataMap).map((key) => ({
    date: key,
    visits: chartDataMap[key],
  }));

  return {
    totalServices,
    publishedServices,
    draftServices,
    totalPosts,
    publishedPosts,
    totalVisitors,
    totalUsers,
    totalLogs,
    totalForeignVisitors,
    recentServices,
    recentLogs: recentLogs.map(log => ({
      ...log,
      createdAt: log.createdAt.toISOString()
    })),
    topVisitors,
    chartData,
  };
}

function formatWITA(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Makassar",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date)) + " WITA";
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ timeframe?: string }>;
}) {
  const { timeframe = "week" } = await searchParams;
  const stats = await getStats(timeframe as any);

  const filters = [
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "All Time", value: "all" },
  ];

  const statCards = [
    {
      title: "Active Services",
      value: stats.totalServices,
      sub: `${stats.publishedServices} live on site`,
      icon: Compass,
      href: "/admin/services",
    },
    {
      title: "Stories & Blogs",
      value: stats.totalPosts,
      sub: `${stats.publishedPosts} published articles`,
      icon: BookOpen,
      href: "/admin/blog",
    },
    {
      title: "Administrators",
      value: stats.totalUsers,
      sub: "Active system accounts",
      icon: UserIcon,
      href: "/admin/users",
    },
    {
      title: "System Logs",
      value: stats.totalLogs,
      sub: "Total recorded events",
      icon: History,
      href: "/admin/logs",
    },
    {
      title: "Total Visitors",
      value: stats.totalVisitors,
      sub: "All-time visits tracked",
      icon: Globe,
      href: "#",
    },
    {
      title: "Foreign Visitors",
      value: stats.totalForeignVisitors,
      sub: "Visits from outside ID",
      icon: Plane,
      href: "#",
    },
  ];

  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto min-h-screen">
      <AdminHeader
        title="Dashboard"
        highlight="Control"
        category="System Overview"
        subtitle="Welcome to the command center. Monitor user activity, track visits, and manage your island operations."
      />
      
      {/* Stat Grid - Vanguard Islands */}
      <motion.div 
        variants={{
          show: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-16"
      >
        {statCards.map((card) => (
          <motion.div
            key={card.title}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 }
            }}
          >
            <Link
              href={card.href}
              className="group relative block bg-white rounded-xl border border-zinc-100 p-2 overflow-hidden hover:shadow-xl hover:shadow-black/5 transition-all duration-500"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-8">
                  <div className="p-[2px] bg-zinc-100 rounded-lg group-hover:bg-zinc-50 transition-all duration-700">
                    <div className="w-12 h-12 bg-zinc-100 rounded-[10px] flex items-center justify-center transition-all duration-700 group-hover:scale-105">
                      <card.icon className="w-6 h-6 text-zinc-900 transition-colors duration-700" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-4 h-4 text-zinc-400" />
                  </div>
                </div>
                <div>
                  <p className="text-4xl font-semibold text-zinc-900 tracking-tight mb-1">{card.value}</p>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{card.title}</p>
                  <p className="text-[10px] text-zinc-400 font-medium">{card.sub}</p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-zinc-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-12 gap-8 mb-16"
      >
        {/* Traffic Chart */}
        <div className="col-span-full lg:col-span-12 bg-white rounded-xl border border-zinc-100 shadow-sm overflow-hidden flex flex-col group p-8 min-h-[450px]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-3">
                <Globe className="w-3.5 h-3.5" />
                Visitor Traffic ({timeframe === "week" ? "7 Days" : timeframe === "month" ? "30 Days" : "12 Months"})
              </h2>
              <p className="text-xs text-zinc-500 mt-1">Real-time visitor telemetry</p>
            </div>
            <div className="flex items-center bg-zinc-50 p-1 rounded-lg border border-zinc-100">
              {filters.map((f) => (
                <Link
                  key={f.value}
                  href={`/admin/dashboard?timeframe=${f.value}`}
                  className={`px-3 py-1.5 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                    timeframe === f.value
                      ? "bg-white text-zinc-900 shadow-sm border border-zinc-100"
                      : "text-zinc-400 hover:text-zinc-600"
                  }`}
                >
                  {f.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <AnalyticsChart data={stats.chartData} />
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-20"
      >
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-3">
            <Globe className="w-3.5 h-3.5" />
            Top 6 Recent Visitors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.topVisitors.length === 0 ? (
            <div className="col-span-full bg-white border border-zinc-100 border-dashed rounded-xl px-8 py-12 text-center text-zinc-400 text-xs italic">
              No visitors recorded yet.
            </div>
          ) : (
            stats.topVisitors.map((visitor: any) => (
              <div key={visitor.id} className="relative group bg-white border border-zinc-100 rounded-xl p-6 transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className={`px-2 py-1 rounded-lg text-[8px] font-bold uppercase tracking-widest ${
                    visitor.countryCode === "ID" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                  }`}>
                    {visitor.countryCode === "ID" ? "INDONESIA" : "FOREIGN"}
                  </div>
                  <span className="text-[9px] text-zinc-300 font-bold tracking-widest">{formatWITA(visitor.createdAt)}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 border border-zinc-100">
                    <UserIcon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[11px] font-bold text-zinc-900 truncate">
                        {visitor.countryCode === "ID" ? "Indonesia" : visitor.country || "Foreign Visitor"}
                      </p>
                      {visitor.countryCode && (
                        <span className="text-[8px] px-1.5 py-0.5 rounded-md font-bold bg-zinc-100 text-zinc-500 uppercase tracking-widest">
                          {visitor.countryCode}
                        </span>
                      )}
                    </div>
                    <p className="text-[9px] text-zinc-400 font-medium truncate max-w-[200px]" title={visitor.userAgent || "Unknown Device"}>
                      {visitor.userAgent?.split(" ")[0] || "Unknown Device"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-zinc-50">
                  <Compass className="w-3 h-3 text-zinc-400" />
                  <span className="text-[10px] font-medium text-zinc-400 truncate italic">
                    {visitor.path}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
