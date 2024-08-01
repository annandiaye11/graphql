"use client";

import { useAuth } from "@/utils/AuthProvider";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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
  amount: {
    label: "amount",
    color: "#3b82f6",
  },
};

export function Best_skils() {
  const { datas, errorFetchData } = useAuth();
  if (errorFetchData) {
    return;
  }
  const chartData = datas.transaction_skills || [];
  const slicedChartData = chartData.map((item) => ({
    ...item,
    type: item.type ? item.type.slice(6) : "",
  }));
  return (
    <Card className = " border-0 bg-[#020817] ">
      <CardHeader className="items-center">
        <CardTitle className = "text-white">Radar Chart - Best skills</CardTitle>
        <CardDescription>
          skills with the highest completion rate.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={slicedChartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="type" />
            <PolarGrid />
            <Radar
              dataKey="amount"
              fill="var(--color-amount)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
