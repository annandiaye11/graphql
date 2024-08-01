"use client";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { useAuth } from "../utils/AuthProvider";

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
  totalUp: {
    label: "totalUp",
    color: "#3b82f6",
  },
  totalDown: {
    label: "totalDown",
    color: "#1e293b",
  },
};

export function AuditGraph() {
  const { datas, errorFetchData } = useAuth();
  let chartData = [];
  let totalVisitors;
  if (errorFetchData) {
    return;
  }
  if (datas && datas.user && datas.user.length > 0) {
    chartData = datas.user; // Sélectionne le premier utilisateur par exemple
    totalVisitors = parseFloat(chartData[0].auditRatio).toFixed(1);

    // Round totalUp and totalDown values and add "MB"
    chartData = chartData.map((data) => ({
      ...data,
      totalUp: `${(data.totalUp / 1000000).toFixed(2)}`,
      totalDown: `${(data.totalDown / 1000000).toFixed(2)}`,
    }));
  }

  return (
    <Card className=" border-0 flex flex-col h-full bg-[#020817] text-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Audit Ratio</CardTitle>
        <CardDescription>Done-Received</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center pb-0 w-full">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full pt-6 h-72"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={110}
            outerRadius={180}
            className="mt-4"
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 36}
                          className="fill-white text-sm font-bold"
                        >
                          {totalVisitors}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 14}
                          className="fill-white"
                        >
                        Your Audit Ratio
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="totalUp"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-totalUp)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="totalDown"
              fill="var(--color-totalDown)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
