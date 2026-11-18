
type TodayDataProps = {
  onAddClick: () => void;
};

export function TodayData({ onAddClick }: TodayDataProps) {
  return (
    <div className="today-data">
      <h2>Update Today's Data</h2>

      <button type="button" onClick={onAddClick}>
        + Add data
      </button>
    </div>
  );
}
