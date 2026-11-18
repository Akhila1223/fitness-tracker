import { useEffect, useState } from "react";
import "./App.css";

import { Header } from "./components/Header";
import { TodayData } from "./components/TodayData";
import { HealthDataForm } from "./components/HealthDataForm";
import { RecentStatistics } from "./components/RecentStatistics";
import type { HealthRecord } from "./types/health";
import { OverallData } from "./components/OverallData";
import { WeeklyTrends } from "./components/WeeklyTrends";

const STORAGE_KEY = "healthAndFitness";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [editingRecord, setEditingRecord] = useState<HealthRecord | null>(null);

  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>(() => {
    try {
      const savedRecords = localStorage.getItem(STORAGE_KEY);
      return savedRecords ? JSON.parse(savedRecords) : [];
    } catch (error) {
      console.error("Failed to load records:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(healthRecords));
    } catch (error) {
      console.error("Failed to save records:", error);
    }
  }, [healthRecords]);

  const handleOpenAdd = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (record: HealthRecord) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
  };

  const handleSaveRecord = (record: HealthRecord) => {
    if (editingRecord) {
      setHealthRecords((previousRecords) =>
        previousRecords.map((existingRecord) =>
          existingRecord.id === record.id ? record : existingRecord,
        ),
      );
    } else {
      setHealthRecords((previousRecords) => [...previousRecords, record]);
    }

    handleCloseModal();
  };

  const handleDeleteRecord = (id: string) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this record?",
    );

    if (!shouldDelete) return;

    setHealthRecords((previousRecords) =>
      previousRecords.filter((record) => record.id !== id),
    );
  };

  return (
    <div className="app">
      <Header />

      <main>
        <section className="dashboard">
          <TodayData onAddClick={handleOpenAdd} />
          <WeeklyTrends records={healthRecords} />
        </section>

        <section className="statistics">
          <RecentStatistics
            records={healthRecords}
            onEdit={handleEditClick}
            onDelete={handleDeleteRecord}
          />

          <OverallData records={healthRecords} />
        </section>
      </main>

      {isModalOpen && (
        <HealthDataForm
          onClose={handleCloseModal}
          onSubmit={handleSaveRecord}
          editingRecord={editingRecord}
        />
      )}
    </div>
  );
}

export default App;
