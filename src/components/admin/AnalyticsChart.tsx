"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useState, useEffect } from "react";

type AnalyticsChartProps = {
  data: { date: string; visits: number }[];
};

export default function AnalyticsChart({ data }: AnalyticsChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !data || data.length === 0) {
    return <div className="h-[350px] w-full bg-zinc-50/50 animate-pulse rounded-xl" />;
  }

  return (
    <div className="relative h-[350px] w-full min-w-0 overflow-hidden">
      <ResponsiveContainer width="100%" height="100%" minHeight={350} minWidth={0}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#a1a1aa" }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "#a1a1aa" }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              fontSize: "12px",
              fontWeight: 500,
            }}
          />
          <Area
            type="monotone"
            dataKey="visits"
            stroke="#10b981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorVisits)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
