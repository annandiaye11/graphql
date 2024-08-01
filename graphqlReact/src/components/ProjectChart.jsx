"use client";

import { useAuth } from "@/utils/AuthProvider";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  xp: {
    label: "amount",
    color: "#3b82f6",
  },
};

export function Component() {
  const { datas, errorFetchData } = useAuth();
  if (errorFetchData) {
    return;
  }
  const chartData = datas.xp_view || [];
  const slicedChartData = chartData.map((item) => ({
    ...item,
    path: item.path ? item.path.slice(14) : "",
    amount: formatSize(item.amount), // Check if item.path exists before slicing
  }));

  const maxAmount = Math.max(...slicedChartData.map((item) => item.amount));
  const yAxisMax = maxAmount * 1;

  return (
    <Card className=" border-0 h-[435px] w-[800px] bg-[#020817]">
      <CardHeader>
        <CardTitle className = "text-white">Bar Chart - projects by XP</CardTitle>
        <CardDescription>All your projects</CardDescription>
      </CardHeader>
      <CardContent className="w-[635px]">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={slicedChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="path"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis domain={[0, yAxisMax]} /> {/* Custom Y-axis scale */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="amount" fill="var(--color-xp)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function formatSize(sizeInBytes) {
  if (sizeInBytes < 0) {
    throw new Error("Size must be a non-negative integer.");
  }
  if (sizeInBytes < 1000) {
    return `${sizeInBytes}`;
  } else if (sizeInBytes < 1000000) {
    let sizeInKb = sizeInBytes / 1000;
    return `${sizeInKb.toFixed(0)}`;
  } else {
    let sizeInMb = sizeInBytes / 1000000;
    return `${sizeInMb.toFixed(0)}`;
  }
}
