import { useState } from "react";
import { Habit } from "../App";

interface HabitRowProps {
  habit: Habit;
  completeDay: (habitId: number, habitDayNum: number) => void;
  handleDeleteHabit: (habitId: number) => void;
}

export const HabitRow = (props: HabitRowProps) => {
  const [showPopup, setShowPopup] = useState(false);

  const popupClasses = showPopup ? "popuptext show" : "popuptext";

  return (
    <tr>
      <td className="habitName">
        <div className="popup" onClick={() => setShowPopup(!showPopup)}>
          {props.habit.name}
          <span className={popupClasses}>
            <button onClick={() => props.handleDeleteHabit(props.habit.id)}>
              Delete
            </button>
          </span>
        </div>
      </td>
      {Object.entries(props.habit.completedDays).map((day) => {
        const dayNum = day[0];
        const completed = day[1];

        return (
          <td key={dayNum}>
            <input
              style={{ cursor: "pointer" }}
              key={dayNum}
              type="radio"
              checked={completed}
              onChange={() =>
                props.completeDay(props.habit.id, parseInt(dayNum, 10))
              }
              onClick={() =>
                props.completeDay(props.habit.id, parseInt(dayNum, 10))
              }
            />
          </td>
        );
      })}
    </tr>
  );
};
