import React, { useState } from "react";

interface AddHabitProps {
  handleAddHabit: (text: string) => void;
}

export const AddHabit = (props: AddHabitProps) => {
  const [text, setText] = useState("");

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (text) {
      console.log("New habit submitted: ", text);
      props.handleAddHabit(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} id="addNewHabit">
      <label htmlFor="input-box">Enter new habit: </label>
      <input type="text" id="input-box" value={text} onChange={handleChange} />
      <button style={{ cursor: "pointer" }} type="submit">
        Add
      </button>
    </form>
  );
};
