export default function ScheduleItem() {
  return (
    <div
      role="button"
      className="px-4 py-2 text-sm flex flex-col justify-between h-32 border border-accent/70 rounded-md hover:border-white duration-700"
    >
      <div>
        <span className="text-white">5:05 PM</span> <span>- 7:50 PM</span>
      </div>

      <div className="text-white">FROM $4.99</div>
    </div>
  );
}
