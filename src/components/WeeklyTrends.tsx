import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import type { HealthRecord } from "../types/health";

type WeeklyTrendsProps = {
  records: HealthRecord[];
};

export function WeeklyTrends({ records }: WeeklyTrendsProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 6);

  const toLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const start = toLocalDate(startDate);
  const end = toLocalDate(today);

  const recentRecords = records.filter(
    (record) => record.date >= start && record.date <= end,
  );

  const groupedData = recentRecords.reduce(
    (acc, record) => {
      if (!acc[record.date]) {
        acc[record.date] = {
          date: record.date,
          calorieIntake: 0,
          calorieBurned: 0,
        };
      }

      acc[record.date].calorieIntake += record.calorieIntake;
      acc[record.date].calorieBurned += record.calorieBurned;

      return acc;
    },
    {} as Record<
      string,
      {
        date: string;
        calorieIntake: number;
        calorieBurned: number;
      }
    >,
  );

  const chartData = Object.values(groupedData).sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  if (chartData.length === 0) {
    return null;
  }

  return (
    <section className="weekly-trends">
      <h2>Weekly Health Trends:</h2>

      <div className="weekly-chart-container">
        {chartData.length === 0 ? (
          <p className="weekly-empty">No records in the last 7 days.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 10,
              }}
              barGap={2}
            >
              <CartesianGrid stroke="#aaaaaa" strokeDasharray="3 3" vertical />

              <XAxis dataKey="date" tick={{ fill: "#111111", fontSize: 13 }} />

              <YAxis tick={{ fill: "#111111", fontSize: 13 }} />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="calorieIntake"
                name="calorieIntake"
                fill="#8580d8"
                barSize={50}
              />

              <Bar
                dataKey="calorieBurned"
                name="calorieBurned"
                fill="#82c99e"
                barSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
