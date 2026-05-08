import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Compass,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Plus,
  ArrowRight,
  Eye,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

async function getStats() {
  const [
    totalActivities,
    publishedActivities,
    draftActivities,
    totalPosts,
    publishedPosts,
    totalInquiries,
    newInquiries,
  ] = await Promise.all([
    prisma.activity.count(),
    prisma.activity.count({ where: { status: "PUBLISHED" } }),
    prisma.activity.count({ where: { status: "DRAFT" } }),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: "NEW" } }),
  ]);

  const recentActivities = await prisma.activity.findMany({
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

  const recentInquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { activity: { select: { name: true } } },
  });

  return {
    totalActivities,
    publishedActivities,
    draftActivities,
    totalPosts,
    publishedPosts,
    totalInquiries,
    newInquiries,
    recentActivities,
    recentInquiries,
  };
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price / 100);
}

function timeAgo(date: Date) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default async function DashboardPage() {
  const stats = await getStats();

  const statCards = [
    {
      title: "Total Activities",
      value: stats.totalActivities,
      sub: `${stats.publishedActivities} published · ${stats.draftActivities} draft`,
      icon: Compass,
      color: "text-emerald-600 bg-emerald-50",
      href: "/admin/activities",
    },
    {
      title: "Blog Posts",
      value: stats.totalPosts,
      sub: `${stats.publishedPosts} published`,
      icon: BookOpen,
      color: "text-indigo-600 bg-indigo-50",
      href: "/admin/blog",
    },
    {
      title: "Inquiries",
      value: stats.totalInquiries,
      sub: `${stats.newInquiries} new`,
      icon: MessageSquare,
      color: "text-amber-600 bg-amber-50",
      href: "#",
    },
    {
      title: "Published Rate",
      value:
        stats.totalActivities > 0
          ? `${Math.round((stats.publishedActivities / stats.totalActivities) * 100)}%`
          : "—",
      sub: "Activities live",
      icon: TrendingUp,
      color: "text-rose-600 bg-rose-50",
      href: "/admin/activities",
    },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Welcome back! Here&apos;s what&apos;s happening.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/activities/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold rounded-xl transition shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            New Activity
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-11 h-11 rounded-xl ${card.color} flex items-center justify-center`}
              >
                <card.icon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            <p className="text-sm font-medium text-gray-500 mt-1">
              {card.title}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">
              Recent Activities
            </h2>
            <Link
              href="/admin/activities"
              className="text-sm text-emerald-600 hover:text-emerald-500 font-medium transition"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {stats.recentActivities.length === 0 ? (
              <p className="px-6 py-8 text-sm text-gray-400 text-center">
                No activities yet.{" "}
                <Link
                  href="/admin/activities/new"
                  className="text-emerald-600 hover:underline"
                >
                  Create one
                </Link>
              </p>
            ) : (
              stats.recentActivities.map((act) => (
                <div
                  key={act.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {act.name}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {timeAgo(act.updatedAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                        act.status === "PUBLISHED"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {act.status === "PUBLISHED" ? "Live" : "Draft"}
                    </span>
                    <Link
                      href={`/admin/activities/${act.id}/edit`}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                      title="Edit"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">
              Recent Inquiries
            </h2>
            <span className="text-xs text-gray-400">via WhatsApp form</span>
          </div>
          <div className="divide-y divide-gray-50">
            {stats.recentInquiries.length === 0 ? (
              <p className="px-6 py-8 text-sm text-gray-400 text-center">
                No inquiries yet.
              </p>
            ) : (
              stats.recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="flex items-start gap-4 px-6 py-4 hover:bg-gray-50/50 transition"
                >
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0 text-amber-700 text-xs font-bold">
                    {inq.name[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {inq.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {inq.activity?.name ?? "General inquiry"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {timeAgo(inq.createdAt)}
                    </p>
                  </div>
                  {inq.status === "NEW" && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full shrink-0">
                      New
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
