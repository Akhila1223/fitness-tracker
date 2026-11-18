
import { Pencil, CircleX } from "lucide-react";
import type { HealthRecord } from "../types/health";

type RecentStatisticsProps = {
  records: HealthRecord[];
  onEdit: (record: HealthRecord) => void;
  onDelete: (id: string) => void;
};

export function RecentStatistics({
  records,
  onEdit,
  onDelete,
}: RecentStatisticsProps) {
  const sortedRecords = [...records].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  return (
    <section className="recent-statistics">
      <h2>Recent Health Statistics.</h2>

      <div className="records-list">
        {sortedRecords.length === 0 ? (
          <p>No health records added yet.</p>
        ) : (
          sortedRecords.map((record) => (
            <div className="record-card" key={record.id}>
              <div className="record-details">
                <p className="record-description">
                  {record.description}
                </p>

                <p className="record-calories">
                  Calories Intake = {record.calorieIntake}{" "}
                  Calories Burned = {record.calorieBurned}
                </p>
              </div>

              <div className="record-actions">
                <span className="record-date">
                  {record.date}
                </span>

                <button
                  type="button"
                  className="delete-btn"
                  aria-label="Delete record"
                  onClick={() => onDelete(record.id)}
                >
                  <CircleX size={20} />
                </button>

                <button
                  type="button"
                  className="edit-btn"
                  aria-label="Edit record"
                  onClick={() => onEdit(record)}
                >
                  <Pencil size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
