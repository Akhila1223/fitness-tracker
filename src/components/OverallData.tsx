
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import type { HealthRecord } from "../types/health";

type OverallDataProps = {
  records: HealthRecord[];
};

const COLORS = ["#a000f5", "#ff9800"];

export function OverallData({ records }: OverallDataProps) {
  const totalIntake = records.reduce(
    (total, record) => total + record.calorieIntake,
    0
  );

  const totalBurned = records.reduce(
    (total, record) => total + record.calorieBurned,
    0
  );

  const chartData = [
    { name: "Intake", value: totalIntake },
    { name: "Burned", value: totalBurned },
  ];

  const hasData = totalIntake + totalBurned > 0;

  return (
    <section className="overall-data">
      <h2>Overall Data:</h2>

      <div className="pie-chart-container">
        {hasData ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="43%"
                outerRadius={90}
                labelLine={false}
                label={({ percent }) =>
                  `${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index]}
                    stroke="#ffffff"
                    strokeWidth={1}
                  />
                ))}
              </Pie>

              <Tooltip formatter={(value) => `${value} kcal`} />

              <Legend verticalAlign="bottom" />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="pie-empty-state">
            <div className="empty-pie" />
            <p>No calorie data available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
