import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { HealthRecord } from "../types/health";

type HealthDataFormProps = {
  onClose: () => void;
  onSubmit: (record: HealthRecord) => void;
  editingRecord?: HealthRecord | null;
};

export function HealthDataForm({
  onClose,
  onSubmit,
  editingRecord,
}: HealthDataFormProps) {
  const [formData, setFormData] = useState({
    date: editingRecord?.date ?? "",
    calorieIntake: editingRecord ? String(editingRecord.calorieIntake) : "",
    calorieBurned: editingRecord ? String(editingRecord.calorieBurned) : "",
    description: editingRecord?.description ?? "",
  });

  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !formData.date ||
      formData.calorieIntake.trim() === "" ||
      formData.calorieBurned.trim() === "" ||
      !formData.description.trim()
    ) {
      setError("Please fill in all fields");
      return;
    }

    const calorieIntake = Number(formData.calorieIntake);
    const calorieBurned = Number(formData.calorieBurned);

    if (
      !Number.isFinite(calorieIntake) ||
      !Number.isFinite(calorieBurned) ||
      calorieIntake < 0 ||
      calorieBurned < 0
    ) {
      setError("Calories must be valid non-negative numbers");
      return;
    }

    const record: HealthRecord = {
      id: editingRecord?.id ?? crypto.randomUUID(),
      date: formData.date,
      calorieIntake,
      calorieBurned,
      description: formData.description.trim(),
    };

    onSubmit(record);
  };

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="health-form-title"
      >
        <h2 id="health-form-title">
          {editingRecord
            ? "Let's see what you want to change!"
            : "Update Today's Data"}
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />

          <label htmlFor="calorieIntake">Calories Intake</label>
          <input
            id="calorieIntake"
            name="calorieIntake"
            type="number"
            min="0"
            placeholder="Enter Today's Calorie Intake"
            value={formData.calorieIntake}
            onChange={handleChange}
          />

          <label htmlFor="calorieBurned">Calories Burned</label>
          <input
            id="calorieBurned"
            name="calorieBurned"
            type="number"
            min="0"
            placeholder="Enter Today's Calorie Burned"
            value={formData.calorieBurned}
            onChange={handleChange}
          />

          <label htmlFor="description">Short Description</label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Enter a short description"
            value={formData.description}
            onChange={handleChange}
          />

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>

            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
