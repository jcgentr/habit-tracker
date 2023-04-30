import { useState, useEffect } from "react";
import { HabitRow } from "./components/HabitRow";
import { AddHabit } from "./components/AddHabit";
import React from "react";

interface CompletedDays {
  [key: number]: boolean;
}

export interface Habit {
  id: number;
  name: string;
  completedDays: CompletedDays;
}

const defaultCompletedDays: CompletedDays = {};
for (let i = 1; i <= 31; i++) {
  defaultCompletedDays[i] = false;
}

const generateId = (habitIds: number[]) => {
  if (habitIds.length === 0) return 0;
  return Math.max(...habitIds) + 1;
};

export default function App() {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const storedHabits = localStorage.getItem("habits");
    return storedHabits ? JSON.parse(storedHabits) : [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const handleAddHabit = (text: string) => {
    const newHabit: Habit = {
      id: generateId(habits.map((h) => h.id)),
      name: text,
      completedDays: { ...defaultCompletedDays },
    };
    setHabits(habits.concat(newHabit));
  };

  const completeDay = (habitId: number, habitDayNum: number) => {
    console.log("completing day", habitId, habitDayNum);
    const newHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        const isCompleted = !habit.completedDays[habitDayNum];
        const newCompletedDays: CompletedDays = {
          ...habit.completedDays,
          [habitDayNum]: isCompleted,
        };
        return { ...habit, completedDays: newCompletedDays };
      } else {
        return habit;
      }
    });
    setHabits(newHabits);
  };

  const handleClearAll = () => {
    localStorage.setItem(
      `habits-${new Date().toISOString()}`,
      JSON.stringify(habits)
    );
    setHabits(
      habits.map((habit) => {
        return { ...habit, completedDays: defaultCompletedDays };
      })
    );
  };

  return (
    <div>
      <h1>Your 30 Day Habit Tracker</h1>
      <div>
        <AddHabit handleAddHabit={handleAddHabit} />
      </div>
      <h3>
        {new Date().toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h3>
      {habits.length > 0 && (
        <div id="habitTable">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
                <th>9</th>
                <th>10</th>
                <th>11</th>
                <th>12</th>
                <th>13</th>
                <th>14</th>
                <th>15</th>
                <th>16</th>
                <th>17</th>
                <th>18</th>
                <th>19</th>
                <th>20</th>
                <th>21</th>
                <th>22</th>
                <th>23</th>
                <th>24</th>
                <th>25</th>
                <th>26</th>
                <th>27</th>
                <th>28</th>
                <th>29</th>
                <th>30</th>
                <th>31</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <HabitRow
                  key={habit.id}
                  habit={habit}
                  completeDay={completeDay}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleClearAll}>Clear All</button>
        <h3>Still Todo:</h3>
        <ul>
          <li>
            <s>add habit feature</s>
          </li>
          <li>
            <s>add current month and day numbers at top of list</s>
          </li>
          <li>
            <s>save data to localStorage and fetch on page load</s>
            <ul>
              <li>
                Note: localStorage has max size of 5MB per app per browser
              </li>
            </ul>
          </li>
          <li>
            <s>transition from codesandbox to vite app</s>
          </li>
          <li>
            <s>push to github and netlify</s>
          </li>
          <li>
            <s>clear all button</s>
          </li>
          <li>add delete habit functionality</li>
          <li>adjust days based on current month</li>
          <li>improve styling</li>
          <li>be able to view past months' data</li>
          <li>load current month and highlight today when page loads</li>
          <li>improve performance (completion re-renders whole list)</li>
          <li>display statistics to habits</li>
          <li>be able to reorder rows</li>
          <li>different color mode switcher</li>
          <li>on hover to see where your cursor is lined up with</li>
          <li>add ability to rearrange habit rows</li>
        </ul>
      </div>
    </div>
  );
}
