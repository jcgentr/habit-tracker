import React from "react";
import { Habit } from "../App";

interface HabitRowProps {
  habit: Habit;
  completeDay: (habitId: number, habitDayNum: number) => void;
}

export const HabitRow = (props: HabitRowProps) => {
  return (
    <tr>
      <td>{props.habit.id}</td>
      <td>{props.habit.name}</td>
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
