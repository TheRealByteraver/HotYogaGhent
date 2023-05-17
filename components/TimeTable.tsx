/// <reference path="../models/timeTableData.d.ts" />
import { useState, useEffect } from "react";

const TimeTable: React.FC<{ timeTable: TimeTableWeek[] }> = ({ timeTable }) => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [dayIndex, setDayIndex] = useState(-1);

  useEffect(() => {
    let today = new Date().getDay();

    // convert to monday as first day of the week:
    today = today === 0 ? 6 : today - 1;
    setDayIndex(today);
  }, []);

  const thStyle = "p-1 md:p-3 border-b border-emerald-500 ";
  const tdStyle = "p-1 md:p-3 border-b border-emerald-500 ";

  return (
    <div className="border border-emerald-500 w-fit rounded-xl overflow-hidden shadow-lg shadow-teal-900 bg-gradient-to-b from-indigo-500 to-teal-800">
      <table className="text-white text-left font-semibold">
        <thead>
          <tr>
            <th className={thStyle + " bg-emerald-500 rounded-tl-md"}></th>
            {weekDays.map((dayStr, index) => (
              <th
                key={dayStr}
                className={
                  thStyle +
                  (index === dayIndex
                    ? " bg-teal-300 text-gray-600"
                    : " bg-emerald-500") +
                  (index < 6 ? " " : " rounded-tr-md")
                }
              >
                {dayStr}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeTable.map((time: TimeTableWeek, index: number) => {
            const isLastRow = index === timeTable.length - 1;
            const times = [
              time.monday,
              time.tuesday,
              time.wednesday,
              time.thursday,
              time.friday,
              time.saturday,
              time.sunday,
            ];
            return (
              <tr key={time.startTime}>
                <td className={tdStyle + " bg-emerald-500"}>
                  {time.startTime}
                </td>
                {weekDays.map((dayStr, index) => (
                  <td
                    key={dayStr}
                    className={
                      tdStyle +
                      (index === dayIndex
                        ? " bg-teal-300 text-gray-600"
                        : " bg-transparent") +
                      (index < 6 ? "" : " rounded-br-md") +
                      (isLastRow ? " border-b-0" : "")
                    }
                  >
                    {times[index]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TimeTable;
